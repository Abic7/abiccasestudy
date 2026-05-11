# Requirements - AI Account Review & Expansion Agent

## Problem Statement
Account Managers at Podium spend 45-60 minutes manually preparing QBRs per account.
This leads to inconsistent insights, missed upsell opportunities, and weak alignment between
customer goals and product usage. At scale (60k+ customers), this is a compounding revenue problem.

## Goal
Save AMs 30-60 minutes per account per QBR cycle while improving output quality and consistency.

## In Scope (MVP)
- Read and process call transcripts (.txt)
- Read and process usage data (.xlsx)
- Extract customer goals from transcript history
- Identify adoption gaps (features paid for but unused)
- Surface top 3 upsell opportunities
- Generate a structured QBR brief

## Out of Scope (MVP)
- CRM integrations (Salesforce, HubSpot)
- Real-time data sync
- Email thread parsing
- Advanced analytics or dashboards
- Slack/notification delivery
- Multi-tenant authentication

## User Stories

### Primary: Account Manager
- As an AM, I want to open a brief before a QBR call so I know exactly what to discuss without manual prep
- As an AM, I want to see my customer's stated goals alongside their actual usage so I can have an honest conversation
- As an AM, I want the top upsell opportunities ranked so I know where to focus expansion conversations

### Secondary: Sales Leader
- As a sales leader, I want consistent QBR quality across my team so I can trust the data in reviews
- As a sales leader, I want visibility into adoption gaps across accounts so I can identify systemic issues

## Acceptance Criteria

### Must Have
- [ ] Pipeline runs end-to-end on provided sample data without errors
- [ ] Output includes: customer goals, adoption gaps (top 3), upsell opportunities (top 3), QBR outline
- [ ] Local processing (LM Studio) handles transcript + usage analysis
- [ ] Cloud processing (Claude Haiku 4.5) handles reasoning and narrative generation
- [ ] n8n workflow is visual, labelled, and explainable node by node
- [ ] Pipeline completes in under 60 seconds per account

### Should Have
- [ ] Output is formatted as clean markdown an AM can read immediately
- [ ] Each upsell opportunity is tied back to a specific stated customer goal
- [ ] Gap detection references specific features by name

### Nice to Have
- [ ] Confidence indicators on extracted goals
- [ ] Multiple account support (batch mode)

## Sample Accounts (provided data)
| Account | Transcripts | Key Theme |
|---------|------------|-----------|
| Meridian Furniture | 9 calls | Integration frustration, onboarding, AI setup |
| Northfield Electrical | 8 calls | Sales intro through AI upgrade |
| Apex | 1 call | Lead program intro |

## Dependencies
- n8n running on localhost:5678
- LM Studio running on localhost:1234 with Gemma-4-E4B loaded
- Anthropic API key configured in n8n credentials
- Sample data files accessible from n8n filesystem
