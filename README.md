# AI Lead Capture & Qualification System

An n8n automation that turns a website enquiry form into a sales-intelligence pipeline. Every lead is captured, understood by an AI model, stored, and routed to the right follow-up automatically, with no manual triage.

**Built by:** Richard Agboola  |  **Stack:** n8n, Mistral AI (LLM), Supabase (Postgres), Gmail, Python (test harness)

---

## 1. The problem

Enquiry forms produce a mixed inbox: some people are ready to buy today, some are comparing suppliers, and some are only browsing. Sorting them by hand is slow, and the slowest response usually goes to the lead that mattered most. Leads that are not ready to buy get ignored and are lost.

## 2. The solution

The form sends its data to an n8n webhook. An AI agent reads the **whole** lead (needs, budget, budget approval, timeline, decision stage, message) and classifies it:

| Class | Meaning |
|---|---|
| **HOT** | Strong, near-term purchase readiness |
| **WARM** | Genuine interest, less immediate readiness |
| **COLD** | Mainly enquiry or research |

The AI also returns a 0 to 100 score, reasoning, buying signals, a recommended follow-up and a priority. The result is stored and the lead is routed automatically.

## 3. Architecture

```
Website form (POST)
      |
   Webhook  ->  Clean Lead Data  ->  AI Lead Qualification Agent (Mistral)
                                            |
                                     Normalize AI Result   (validate JSON, class, score)
                                            |
                                     Supabase: leads table
                                            |
                                         Switch
              +-----------------------------+-----------------------------+
             HOT                          WARM                          COLD
   Alert sales (email)           Alert sales (email)         Nurture email to customer
   Confirm to customer           Email the customer          Save nurture status
                                 Save status + 3-day date    + follow-up date (14 days)

Separate workflows:  Lead Follow-up Scheduler (daily 9am, WARM reminders)
                     Lead Capture Error Alerts (runs when any node fails)
```

## 4. How each path behaves

| Path | Sales team | Customer | Saved in Supabase |
|---|---|---|---|
| **HOT** | Immediate alert with score, reasoning and next step | Confirmation that the team will call them. During 8am to 6pm Mon to Fri (Lagos) it says "within the hour", otherwise "first thing" on the next working day | Full lead and AI result |
| **WARM** | Alert to follow up today | Friendly email asking for quantity, delivery date and budget approval | `nurture_stage = WARM_PENDING`, reminder date +3 days |
| **COLD** | No alert | Thank-you email inviting them to reply for a quote (includes a STOP opt-out) | `nurture_stage = NURTURE_1`, next contact +14 days |

**Follow-up Scheduler (daily, 9am Lagos):** finds WARM leads still `WARM_PENDING` whose date has arrived, sends sales one reminder, then marks them `WARM_REMINDED`. Set `nurture_stage = CONTACTED` in Supabase to stop a reminder.

## 5. Data model

**`leads`** (one row per submission)

- Contact and request: `full_name`, `email`, `phone`, `need`, `budget_range`, `budget_custom`, `budget_status`, `timeline`, `timeline_custom`, `decision_stage`, `location`, `message`
- AI result: `lead_classification`, `qualification_score`, `qualification_reason`, `purchase_intent`, `budget_signal`, `timeline_signal`, `specification_signal`, `readiness_signal`, `recommended_follow_up`, `follow_up_priority`
- Follow-up tracking: `nurture_stage`, `nurture_count`, `next_contact_date`, `last_contacted_at`

**`workflow_errors`** (one row per failure)

```sql
create table if not exists workflow_errors (
  id bigint generated always as identity primary key,
  occurred_at timestamptz default now(),
  workflow_name text,
  failed_node text,
  error_message text,
  execution_id text,
  execution_url text,
  resolved_at timestamptz
);
```

## 6. Reliability and error handling

- **Retries:** the AI node and every Gmail and Supabase node retry up to 3 times before failing, which covers temporary API and network problems.
- **Output validation:** the Normalize node extracts the JSON, checks the class is HOT, WARM or COLD, clamps the score to 0 to 100 and defaults invalid priorities. Invalid AI output stops the run with a clear error instead of saving bad data.
- **Save before routing:** every lead is written to Supabase before any email is sent, so a lead is on record even if an email fails.
- **Error workflow:** on any failure, `Lead Capture Error Alerts` emails an alert (failed node, error message, link to the execution) and logs it to `workflow_errors`. The lead's data is visible in that execution, so it can be followed up manually.
- **Recovery time:** set `resolved_at` on the error row when fixed.

```sql
-- Failures in the last 7 days, by node
select failed_node, count(*) as failures
from workflow_errors
where occurred_at > now() - interval '7 days'
group by failed_node order by failures desc;

-- Average time to recover (hours)
select round(avg(extract(epoch from (resolved_at - occurred_at)) / 3600)::numeric, 1) as avg_hours
from workflow_errors where resolved_at is not null;
```

## 7. Security and data compliance

- Credentials (Gmail, Supabase, Mistral) are held in the n8n credential store, not in the workflow.
- Leads contain personal data (name, email, phone). Access to the `leads` table should be limited to the service role, with Row Level Security enabled.
- Every customer email carries or supports an opt-out (reply STOP for nurture emails).
- Customer-supplied text is escaped before it goes into an HTML email.
- **Recommended hardening:** the webhook is currently open. Add rate limiting or a shared secret in front of it, and validate that `email` and `full_name` are present before the AI step.

## 8. Testing and KPIs

`test_leads.py` submits 12 sample leads (4 HOT, 4 WARM, 4 COLD) and reports classification accuracy, seconds from submission to storage, and any lead that failed to appear.

```bash
pip install requests
export N8N_WEBHOOK_URL="https://YOUR-N8N/webhook/lead-capture"
export SUPABASE_URL="https://YOURPROJECT.supabase.co"
export SUPABASE_KEY="your-key"
python test_leads.py --test-email you@gmail.com
```

| KPI | How it is measured |
|---|---|
| Classification accuracy | Test harness, AI label vs the expected label |
| Speed to lead | Harness, seconds from submission to stored |
| Reliability | Successful runs vs entries in `workflow_errors` |
| Recovery time | `resolved_at - occurred_at` |
| Manual work removed | Leads triaged automatically per day |

## 9. Runbook: common failures

| Symptom | Likely cause | Fix |
|---|---|---|
| Error: "AI Agent did not return valid JSON" | Model added text or hit a rate limit | Re-run the execution. If it happens often, tighten the prompt wording |
| Supabase node error about a column | Table is missing a column the workflow writes | Add the column, then re-run |
| Gmail node fails | OAuth token expired | Re-authorise the Gmail credential |
| No lead stored, no error | Form is posting to the test URL, or the workflow is inactive | Use the production webhook URL and activate the workflow |
| Customer email shows blank name or phone | Form field name does not match the mapping in Clean Lead Data | Align the field names |

## 10. Known limitations and roadmap

- A follow-up loop for COLD leads (second and third nurture emails, then marking them dormant).
- A WhatsApp or Telegram alert for HOT leads, with escalation if not marked `CONTACTED` within 30 minutes.
- Webhook hardening and input validation (section 7).
- Detecting a returning lead by email and linking their submissions.
