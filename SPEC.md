# Agent Team Builder - Onboarding Flow Specification

## Project Overview
- **Product:** Agent Team Builder (SaaS)
- **Purpose:** Help users build custom AI agent ecosystems by answering business/role/team questions
- **Pricing:** $99 one-time
- **Output:** Exports to GitHub (repo with agent configs, README, setup scripts)
- **Tech Stack:** React / Tailwind / TypeScript

---

## User Journey Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        AGENT TEAM BUILDER                               │
│                         User Onboarding                                 │
└─────────────────────────────────────────────────────────────────────────┘

    ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
    │  STEP 1  │────▶│  STEP 2  │────▶│  STEP 3  │────▶│  STEP 4  │
    │  Welcome │     │  Business│     │   Team   │     │  Work    │
    │  & Goal  │     │   Type   │     │  Size    │     │  Style   │
    └──────────┘     └──────────┘     └──────────┘     └──────────┘
                          │                                     │
                          ▼                                     ▼
                    ┌──────────┐                          ┌──────────┐
                    │  STEP 5  │◀───── (conditional) ────│  STEP 6  │
                    │  Primary │                          │  Special │
                    │  Focus   │                          │  Needs   │
                    └──────────┘                          └──────────┘
                          │
                          ▼
                    ┌──────────┐     ┌──────────┐
                    │  STEP 7  │────▶│  STEP 8  │
                    │  Review  │     │  Export  │
                    │  & Tune  │     │  & Pay   │
                    └──────────┘     └──────────┘

    SKIP LOGIC:
    - Step 6 only appears if "Other" selected in Step 5
    - Step 3 (Team Size) skip if Step 1 = "Solo founder"
    - Step 4 (Work Style) skip if Step 1 = "Just exploring"
```

---

## Step Details

### STEP 1: Welcome & Goal
**Purpose:** Establish intent and set expectations

**Question:** "What brings you to Agent Team Builder?"

**Options:**
| Option | Label | Skip Logic |
|--------|-------|------------|
| 1 | "I'm building a product or service" | Continue to Step 2 |
| 2 | "I'm a solo founder getting started" | Skip Step 3, go to Step 4 |
| 3 | "I want to improve my existing team's efficiency" | Continue to Step 2 |
| 4 | "Just exploring what's possible" | Skip Steps 2-5, go directly to Step 7 |
| 5 | "I need agents for a specific project" | Continue to Step 2 |

**Why this matters:** Determines depth of onboarding. Solo founders get streamlined flow. Explorers get a demo experience.

---

### STEP 2: Business Type
**Purpose:** Map user's industry to relevant agent categories

**Question:** "What type of business or role are you in?"

**Options & Agent Category Mapping:**

| Option | Business Type | Primary Agent Categories |
|--------|---------------|---------------------------|
| 1 | Software / Tech Startup | Engineering, Product, Testing, Support |
| 2 | E-commerce / Retail | Marketing, Support, Specialized (analytics) |
| 3 | Creative Agency / Design Studio | Design, Marketing, Project Management |
| 4 | Consulting / Services | Support, Specialized (research), Marketing |
| 5 | Content / Media Company | Design, Marketing, Product (content) |
| 6 | Financial Services | Specialized (compliance), Engineering, Support |
| 7 | Healthcare / Medical | Specialized (compliance), Support, Engineering |
| 8 | Education / EdTech | Product, Design, Specialized (tutoring) |
| 9 | Real Estate | Marketing, Support, Specialized (CRM) |
| 10 | Other / Not listed | Show "Other" flow → Step 6 |

**Multi-select note:** Users can select up to 2. Second selection adds secondary agent categories.

---

### STEP 3: Team Size
**Purpose:** Scale agent recommendations to team size

**Question:** "How big is your current team?"

**Options:**
| Option | Team Size | Agent Implications |
|--------|-----------|-------------------|
| 1 | Just me (solo) | 3-5 core agents only |
| 2 | 2-5 people | 5-8 agents, focus on collaboration |
| 3 | 6-15 people | 8-12 agents, need coordination |
| 4 | 16-50 people | 12-20 agents, need management layer |
| 5 | 50+ people | 15-30 agents, enterprise structure |

**Skip Logic:** If Step 1 = "Solo founder", skip this step (assume 1 person).

---

### STEP 4: Work Style
**Purpose:** Determine integration preferences and workflow

**Question:** "How do you prefer to work with AI agents?"

**Options:**
| Option | Work Style | Technical Implications |
|--------|------------|----------------------|
| 1 | "I want them to run autonomously" | Higher automation agents, fewer approval gates |
| 2 | "I want human-in-the-loop for major decisions" | Include approval/notification agents |
| 3 | "I need detailed reporting on everything" | Add analytics/reporting agents |
| 4 | "I just want suggestions, I'll decide" | Focus on advisory agents |
| 5 | "Integrate with my existing tools" | Show tool integration selector after export |

**Skip Logic:** If Step 1 = "Just exploring", skip this step (use default: option 2).

---

### STEP 5: Primary Focus Areas
**Purpose:** Identify the main work domains

**Question:** "What are your primary focus areas? (Select up to 3)"

**Options:**
| Option | Focus Area | Maps to Agent Categories |
|--------|------------|-------------------------|
| 1 | Writing & Content Creation | Marketing (copywriting), Design (visual content) |
| 2 | Coding & Technical Work | Engineering, Testing |
| 3 | Customer Support | Support |
| 4 | Marketing & Growth | Marketing, Design |
| 5 | Product Management | Product, Project Management |
| 6 | Data Analysis & Reporting | Specialized (analytics), Engineering |
| 7 | Design & Creative | Design |
| 8 | Research & Strategy | Specialized (research) |
| 9 | Project Coordination | Project Management |
| 10 | Sales & Lead Gen | Marketing, Support |
| 11 | Operations & Admin | Specialized (operations), Project Management |
| 12 | Something else | → Trigger Step 6 (Special Needs) |

**Logic:** Each selection adds 2-4 agents from the corresponding categories. Top 3 selections get priority.

---

### STEP 6: Special Needs (Conditional)
**Purpose:** Capture edge cases not covered by standard options

**Trigger:** Only appears if:
- Step 2 = "Other / Not listed"
- Step 5 = "Something else"

**Question:** "Tell us a bit more about your needs..."

**Input Fields:**
1. **Industry/Field** (text input, required)
   - Placeholder: "e.g., Non-profit, Government, Sports..."

2. **Specific challenge** (text area, required)
   - Placeholder: "What's the main problem you want AI agents to help with?"

3. **Required integrations** (multi-select chips)
   - Options: Slack, Notion, GitHub, Jira, HubSpot, Salesforce, Zapier, Custom API, None

4. **Any compliance requirements?** (checkbox group)
   - GDPR, HIPAA, SOC2, PCI-DSS, None

**Skip Logic:** This step only appears when triggered. Otherwise skipped entirely.

---

### STEP 7: Review & Customize
**Purpose:** Let users fine-tune the suggested agent team

**Display:** Show the recommended agent team as cards with:
- Agent name
- Category badge (Design, Engineering, etc.)
- Brief description
- Toggle: Include / Exclude

**Question:** "Here's your recommended agent team. Anything you want to adjust?"

**Interactions:**
- Toggle each agent on/off
- Click to expand and see agent details
- "Add more agents" button → opens agent picker (all 68 agents)
- "Remove all, start fresh" → opens full picker

**Agent Selection Logic (Summary):**

```
Base Selection Algorithm:
1. Start with business type categories (Step 2)
2. Add team-size multiplier (Step 3)
3. Apply work style filters (Step 4)
4. Prioritize focus area categories (Step 5)
5. Include special needs agents if Step 6 answered

Example Output for "Software Startup + 5 People + Content Focus":
- Engineering Agent (x2) - code review, documentation
- Product Manager Agent - roadmap, specs
- QA/Testing Agent - test generation
- Marketing Agent (x2) - social copy, email campaigns
- Support Agent - FAQ, triage
- Design Agent (optional) - if visual content selected
```

---

### STEP 8: Export & Checkout
**Purpose:** Finalize and deliver the agent ecosystem

**Question:** "Your agent team is ready. How would you like to proceed?"

**Display:**
- Summary: X agents selected
- Total: $99 (one-time)
- GitHub repo name input (default: "my-agent-team")

**Options:**
| Option | Action |
|--------|--------|
| 1 | "Export to GitHub" → Opens GitHub OAuth, creates repo |
| 2 | "Download as ZIP" → Generates and downloads |
| 3 | "Send me the preview" → Email preview (no payment yet) |

**Post-Payment/Export:**
- GitHub repo created with:
  - `/agents` - YAML configs for each agent
  - `/docs` - README with setup instructions
  - `/scripts` - One-click setup scripts
  - `CLAUDE.md` - Context file for AI collaboration
  - `AGENTS.md` - Agent definitions

---

## Agent Category Mapping (Reference)

### 68 Agents Across 9 Categories

| Category | # Agents | Examples |
|----------|----------|----------|
| Design | 8 | UI Designer, Brand Designer, Illustrator, Video Editor, etc. |
| Engineering | 12 | Full-Stack Dev, Backend Dev, Frontend Dev, DevOps, Security, etc. |
| Marketing | 10 | SEO Specialist, Social Media Manager, Content Writer, Email Marketer, etc. |
| Product | 8 | Product Manager, UX Researcher, Product Analyst, Roadmap Planner, etc. |
| Project Management | 6 | Project Manager, Scrum Master, Resource Planner, Risk Analyst, etc. |
| Spatial Computing | 4 | AR/VR Developer, 3D Modeler, Spatial Designer, etc. |
| Specialized | 12 | Research Analyst, Data Scientist, Legal Assistant, HR Assistant, etc. |
| Support | 5 | Customer Support, Technical Support, Community Manager, etc. |
| Testing | 3 | QA Engineer, Performance Tester, Security Tester, etc. |

---

## Success Metrics for the Form

### Key Performance Indicators

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Completion Rate** | > 70% | (Completed sessions / Started sessions) |
| **Avg Time to Complete** | < 4 minutes | Session duration tracking |
| **Step Drop-off Rate** | < 15% per step | Abandonment at each step |
| **GitHub Export Rate** | > 60% of completions | Exports / Completed forms |
| **Agent Customization** | > 50% make changes | Users who modify suggested team |
| **Skip Rate - Step 6** | < 20% | Users triggering special needs |
| **Skip Rate - Conditional** | N/A (expected) | Per-step skip tracking |

### Funnel Visualization

```
Landing → Started Form → Step 1 → Step 2 → Step 3 → Step 4 → Step 5
   ↓          ↓           ↓        ↓        ↓        ↓        ↓
100%       85%         78%      75%      72%      70%      68%
                                           
              Step 6 (if) → Step 7 → Step 8 → Payment/Export
                  ↓          ↓         ↓          ↓
                 12%        65%       62%        60%
```

### Form Analytics to Track

- **Heatmap:** Which options are most selected per step
- **Abandonment points:** Where users drop off
- **Time per step:** Identify confusing questions
- **Correlation:** Which paths lead to highest satisfaction (post-export survey)

---

## Technical Implementation Notes

### State Management
```typescript
interface OnboardingState {
  step: number;
  answers: {
    goal?: 'building' | 'solo' | 'improving' | 'exploring' | 'project';
    businessType?: string[];
    teamSize?: number;
    workStyle?: 'autonomous' | 'human-in-loop' | 'reporting' | 'suggestions' | 'integrations';
    focusAreas?: string[];
    specialNeeds?: {
      industry: string;
      challenge: string;
      integrations: string[];
      compliance: string[];
    };
  };
  recommendedAgents: Agent[];
  selectedAgents: Agent[];
}
```

### Skip Logic Implementation
```typescript
const getNextStep = (currentStep: number, answers: OnboardingState['answers']): number => {
  if (currentStep === 1) {
    if (answers.goal === 'solo') return 4;
    if (answers.goal === 'exploring') return 7;
    return 2;
  }
  // ... etc
}
```

---

## Appendix: Quick Reference - Business Type to Agent Mapping

| Business Type | Priority Agents (Top 3) | Secondary Agents |
|---------------|------------------------|------------------|
| Software/Tech | Engineering, Testing, Product | Support, DevOps |
| E-commerce | Marketing, Support, Specialized (Analytics) | Design, Engineering |
| Creative Agency | Design, Marketing, Project Management | Support, Product |
| Consulting | Support, Specialized (Research), Marketing | Project Management |
| Content/Media | Marketing, Design, Product | Support, Specialized |
| Financial Services | Specialized (Compliance), Engineering, Support | Product, Testing |
| Healthcare | Specialized (Compliance), Support, Engineering | Product, Security |
| Education | Product, Design, Specialized (Tutoring) | Marketing, Support |
| Real Estate | Marketing, Support, Specialized (CRM) | Design, Project Management |

---

*End of Specification*
