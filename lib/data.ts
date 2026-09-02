/* ─── HKT CONSULTANCY — CONTENT DATA ─────────────────────────────── */
/* All verified from hktconsultancy.in. Placeholders clearly marked.  */

export const SITE = {
  name: "HKT Consultancy",
  tagline: "Manufacturing Business Growth Consultancy",
  url: "https://www.hktconsultancy.in",
  phone: "+91 89802 11122",
  phoneHref: "tel:+918980211122",
  email: "dhiraj@hktconsultancy.in",
  emailEnquiry: "contact@hktconsultancy.in",
  whatsapp: "https://wa.me/918980211122",
  address: "C-1102, PNTC, Times of India Press Road, Vejalpur, Ahmedabad – 380015",
  addressMap: "https://maps.google.com/?q=PNTC+Times+of+India+Press+Road+Vejalpur+Ahmedabad+380015",
  calendly: "https://calendly.com/",
  foundedYear: 1995,
} as const;

export const STATS = [
  { value: 30,  prefix: "",  suffix: "+",   label: "Years Experience",      sub: "In manufacturing & industrial sectors" },
  { value: 200, prefix: "",  suffix: "+",   label: "Enterprises Consulted", sub: "Across India" },
  { value: 500, prefix: "₹", suffix: "Cr+", label: "Revenue Generated",     sub: "Cumulative client impact" },
  { value: 500, prefix: "",  suffix: "+",   label: "Leaders Coached",        sub: "Sales managers & executives" },
  { value: 15,  prefix: "",  suffix: "+",   label: "Industries Served",      sub: "Across manufacturing verticals" },
  { value: 95,  prefix: "",  suffix: "%",   label: "Client Retention",       sub: "Long-term engagements" },
] as const;

export const HERO_STATS = [
  { display: "30+",     label: "Years" },
  { display: "200+",    label: "Enterprises" },
  { display: "₹500Cr+", label: "Revenue Impact" },
  { display: "15+",     label: "Industries" },
] as const;

export const PROBLEMS = [
  {
    title: "Revenue Has Plateaued",
    body: "Growth has stalled despite a strong product and established market position. The business has hit a ceiling it can't seem to break through.",
  },
  {
    title: "Sales Team Isn't Performing",
    body: "The team is active, but pipeline quality, conversion rates, and accountability aren't improving. Activity doesn't translate to results.",
  },
  {
    title: "Too Dependent on Key Clients",
    body: "A handful of legacy customers drive most of the revenue. Business development is weak and new client acquisition is unpredictable.",
  },
  {
    title: "Leadership Isn't Aligned",
    body: "Strategy exists on paper. But leadership and teams aren't executing together — priorities shift, accountability is unclear.",
  },
  {
    title: "Channel Isn't Scaling",
    body: "Dealers and distributors aren't producing the expected growth. Channel partner productivity is low and the go-to-market model needs work.",
  },
  {
    title: "Business Has Outgrown Its Processes",
    body: "Systems and structures that worked at a smaller scale are now creating friction. The business needs a new operating model.",
  },
] as const;

export const SOLUTIONS = [
  {
    slug: "revenue-growth",
    title: "Revenue Growth",
    headline: "Build the revenue architecture your business needs to scale.",
    body: "We work with manufacturing leaders to design and execute growth strategies that produce measurable, sustained revenue improvement.",
    outcomes: [
      "Growth strategy and go-to-market architecture",
      "Key account management systems",
      "Business development capability",
      "Pricing and margin improvement",
      "New market and segment entry",
    ],
    colour: "#0b1d35",
  },
  {
    slug: "sales-transformation",
    title: "Sales Transformation",
    headline: "Turn your sales team into a predictable revenue machine.",
    body: "From sales process redesign to team capability building, we work inside your organisation to close the gap between sales activity and sales results.",
    outcomes: [
      "End-to-end sales process design",
      "Sales team capability assessment and development",
      "Pipeline discipline and forecasting",
      "Sales leadership coaching",
      "Performance management systems",
    ],
    colour: "#163660",
  },
  {
    slug: "leadership-organisation",
    title: "Leadership & Organisation",
    headline: "Build the leadership capability your growth strategy demands.",
    body: "Growth stalls when leadership capability can't keep pace with business ambition. We work with management teams to close that gap.",
    outcomes: [
      "Leadership development and coaching",
      "Team alignment and decision-making",
      "Accountability frameworks",
      "Management capability building",
      "Succession and talent strategy",
    ],
    colour: "#0b1d35",
  },
  {
    slug: "operational-excellence",
    title: "Operational Excellence",
    headline: "Build the operational discipline that sustains profitable growth.",
    body: "Strong revenue growth requires equally strong operational foundations. We help manufacturing businesses build the systems that support scale.",
    outcomes: [
      "KPI design and performance systems",
      "Process improvement and standardisation",
      "Strategic execution frameworks",
      "Cross-functional alignment",
      "Operational discipline and governance",
    ],
    colour: "#163660",
  },
] as const;

export const INDUSTRIES = [
  {
    slug: "automotive",
    title: "Automotive & Auto Components",
    body: "Tier-1 and Tier-2 suppliers, OEM-facing businesses, and component manufacturers navigating margin pressure, customer concentration, and export growth.",
  },
  {
    slug: "engineering",
    title: "Engineering & Industrial Products",
    body: "Industrial equipment manufacturers, precision engineering firms, and B2B product businesses competing on value, not price.",
  },
  {
    slug: "capital-equipment",
    title: "Capital Equipment",
    body: "Capital equipment OEMs and project-based manufacturers with complex sales cycles, channel management challenges, and long customer relationships.",
  },
  {
    slug: "chemicals",
    title: "Chemicals & Process Manufacturing",
    body: "Specialty chemicals, industrial chemicals, and process manufacturing businesses managing commodity volatility, technical sales complexity, and compliance.",
  },
  {
    slug: "fmcg-manufacturing",
    title: "FMCG Manufacturing",
    body: "Consumer goods manufacturers building retail and distribution strength, brand presence, and the operational capability to sustain volume growth.",
  },
  {
    slug: "other",
    title: "Other Manufacturing Sectors",
    body: "Plastics, packaging, textiles, building materials, and other industrial manufacturing businesses facing similar growth and leadership challenges.",
  },
] as const;

export const CASE_STUDIES = [
  {
    slug: "auto-component-revenue-growth",
    tag: "Automotive Components",
    client: "Mid-Sized Auto Component Manufacturer",
    metric: "+62%",
    metricLabel: "Revenue Growth",
    period: "18 months",
    challenge: "Stagnant revenue for 3 consecutive years. A fragmented sales team with no defined process, poor pipeline visibility, and no accountability structure.",
    strategy: "Redesigned the entire sales pipeline from prospecting to close. Introduced a Key Account Management programme for the top 12 customers. Deployed a structured coaching programme for the 18-person sales team.",
    outcome: "Revenue grew 62% in 18 months. Sales team attrition dropped from 40% to 8%. Three new enterprise accounts were onboarded in the first year.",
    metrics: [
      { value: "+62%", label: "Revenue Growth" },
      { value: "40%→8%", label: "Attrition Reduction" },
      { value: "3", label: "New Enterprise Accounts" },
      { value: "18 months", label: "Engagement Duration" },
    ],
    takeaway: "Revenue stagnation in this case had nothing to do with the market or the product. The constraint was a sales team without process, pipeline discipline, or coaching. Once those were in place, growth followed.",
  },
  {
    slug: "capital-equipment-channel-growth",
    tag: "Capital Equipment",
    client: "Capital Equipment OEM — Pan-India",
    metric: "+45%",
    metricLabel: "Channel Revenue",
    period: "14 months",
    challenge: "Ineffective distribution network, low channel partner productivity, and no structured go-to-market strategy for a new product line launching across India.",
    strategy: "Mapped gaps across the distribution network. Designed a tiered partner programme with performance incentives and support structures. Trained 35 regional sales managers on value-based selling methodology.",
    outcome: "Channel revenue increased 45% across the network. The new product line achieved ₹18 Cr in Year 1 sales — against a ₹10 Cr target.",
    metrics: [
      { value: "+45%", label: "Channel Revenue" },
      { value: "₹18 Cr", label: "New Product Year 1" },
      { value: "35", label: "Sales Managers Trained" },
      { value: "14 months", label: "Engagement Duration" },
    ],
    takeaway: "Channel growth requires more than adding partners. The real constraint was partner capability and a lack of a structured engagement model. Once that was in place, the channel performed as it should.",
  },
  {
    slug: "chemical-new-business-development",
    tag: "Chemicals & Process Manufacturing",
    client: "Chemical Processing Enterprise",
    metric: "+30%",
    metricLabel: "New Business Contribution",
    period: "24 months",
    challenge: "Over-reliance on a small number of legacy clients, no new business development function, and a leadership team resistant to changing established practices.",
    strategy: "Conducted a full business diagnostic to identify the real growth constraints. Built a new business development function from scratch. Facilitated leadership alignment workshops to address the cultural resistance to change.",
    outcome: "New business contributed 30% of total revenue within 24 months — a function that had previously contributed almost nothing.",
    metrics: [
      { value: "+30%", label: "New Business Share" },
      { value: "0→30%", label: "Revenue from New Clients" },
      { value: "24 months", label: "Engagement Duration" },
    ],
    takeaway: "The business had the product and the market. What was missing was a structured new business engine and leadership alignment. Both were addressable — and once addressed, the results followed.",
  },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "30+ Years of Field Experience",
    body: "Practical, ground-level experience across sales leadership, operations, and business building in manufacturing industries. Not theoretical frameworks delivered from the outside.",
  },
  {
    title: "Manufacturing-Only Focus",
    body: "Exclusive focus on industrial and manufacturing enterprises gives HKT an understanding of sector dynamics that a generalist consultancy cannot replicate.",
  },
  {
    title: "Strategy and Execution",
    body: "HKT doesn't deliver reports and leave. We stay engaged through implementation — working alongside your team until measurable outcomes are achieved.",
  },
  {
    title: "Leadership-Level Engagement",
    body: "Every engagement involves working directly with Promoters, MDs, and senior leadership teams — not just middle management. The work happens where decisions are made.",
  },
  {
    title: "Measurable Business Outcomes",
    body: "Every engagement is structured around clear KPIs and outcome milestones. Revenue, margin, pipeline quality, and team performance — not activity metrics.",
  },
  {
    title: "Long-Term Partnership Model",
    body: "95% client retention is the result of a model built on sustained results, not short-term interventions. We build capability that stays in the organisation.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "Diagnose",
    desc: "Understand the real constraints — not just the surface symptoms. A thorough assessment of the business, its leadership, and the specific blockers to growth.",
  },
  {
    step: "Design",
    desc: "Build the right growth and execution architecture — a tailored strategy with clear priorities, sequence, and measurable milestones.",
  },
  {
    step: "Align",
    desc: "Get leadership and key teams moving in the same direction. Without alignment, the best strategy doesn't get implemented.",
  },
  {
    step: "Execute",
    desc: "Work alongside the organisation through implementation — removing bottlenecks, coaching managers, and tracking progress.",
  },
  {
    step: "Scale",
    desc: "Optimise, institutionalise, and build the systems and capability for sustained, predictable growth.",
  },
] as const;

export const FAQS = [
  {
    q: "What types of manufacturing businesses does HKT work with?",
    a: "HKT Consultancy works exclusively with manufacturing and industrial enterprises — ranging from SMEs turning over ₹20 Cr to established businesses exceeding ₹500 Cr. Our experience spans auto components, capital equipment, chemicals, FMCG manufacturing, engineering goods, and more.",
  },
  {
    q: "What does a typical consulting engagement look like?",
    a: "Every engagement begins with a thorough diagnostic phase — understanding the business, its leadership, and the real constraints to growth. We then co-develop a tailored strategy, align the leadership team, and provide hands-on guidance through execution. Engagements typically run for 6–18 months depending on scope.",
  },
  {
    q: "How does HKT approach sales team transformation?",
    a: "We start with an honest assessment of the current sales team — capability, structure, process, and culture. We then implement a structured development programme covering sales methodology, account management, pipeline discipline, and performance coaching. The goal is sustainable improvement, not a one-time training event.",
  },
  {
    q: "What revenue growth is realistic?",
    a: "Results vary based on starting point, sector, and the organisation's commitment to execution. Across our engagements, clients have seen revenue growth ranging from 25% to over 100% within 12–24 months. We will give you an honest assessment of what is achievable for your specific situation.",
  },
  {
    q: "Does HKT only work on long-term engagements?",
    a: "No. For businesses seeking a specific intervention — a sales strategy review, a leadership offsite, a go-to-market plan for a new product — we can structure focused, time-bound advisory assignments. We can discuss what format makes sense for your situation.",
  },
  {
    q: "How is HKT different from a traditional management consultancy?",
    a: "Most traditional consultancies deliver a strategy and leave. HKT stays through implementation. Our model is built around measurable outcomes, not deliverables — we're engaged until results are achieved, not until the report is presented.",
  },
  {
    q: "How do we get started?",
    a: "The first step is a complimentary 45-minute discovery call. This conversation helps us understand your business situation and determine whether there is a strong fit. Book directly via our Calendly link or contact Dhiraj on WhatsApp.",
  },
] as const;

export type Solution  = typeof SOLUTIONS[number];
export type Industry  = typeof INDUSTRIES[number];
export type CaseStudy = typeof CASE_STUDIES[number];
