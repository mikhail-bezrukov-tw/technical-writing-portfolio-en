import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const documentation = [
  {
    to: '/writing-samples/today-patients',
    title: 'Today (Patients)',
    kicker: 'User-facing Knowledge Base article',
    summary: 'A portfolio-safe adaptation of production feature documentation explaining a clinical dashboard, its key UI regions, and group-level performance metrics.',
    tags: ['Product documentation', 'UI guidance', 'Visual documentation']
  },
  {
    to: '/writing-samples/ai-assistant-how-to',
    title: 'How to Use the AI Assistant in Workspace',
    kicker: 'User-facing how-to article',
    summary: 'A procedural article covering how to open an embedded AI assistant, work with context-aware chat, use controls and shortcuts, and verify answers.',
    tags: ['How-to', 'AI feature', 'Procedural writing']
  },
];

const caseStudies = [
  {
    to: '/case-studies/ai-screenshot-workflow',
    title: 'Let the Model Decide, Let the Script Verify',
    kicker: 'AI-assisted workflow · Screenshots',
    summary: 'How screenshot preparation evolved from a detailed prompt into an orchestration layer with deterministic Python checks.',
    tags: ['Claude Code', 'Python', 'Screenshots']
  },
  {
    to: '/case-studies/docs-linter',
    title: 'When Documentation Rules Belong in Code',
    kicker: 'Docs-as-code · Quality automation',
    summary: 'How recurring review comments became a small Python linter—and why some findings should warn rather than block.',
    tags: ['Docs-as-code', 'Python', 'Editorial judgment']
  },
  {
    to: '/case-studies/release-communications',
    title: 'Release Communications Across 18 Services',
    kicker: 'Release documentation · Product communication',
    summary: 'How distributed release information becomes searchable, user-facing release notes without automating editorial judgment.',
    tags: ['Release notes', 'Editorial workflow', 'Cross-team work']
  },
  {
    to: '/case-studies/product-logic',
    title: 'Documenting Complex Product Logic',
    kicker: 'Product investigation · Information architecture',
    summary: 'Reconstructing interconnected product rules and turning them into a traceable decision model for internal users.',
    tags: ['Research', 'Information architecture', 'Decision flows']
  },
  {
    to: '/case-studies/docs-as-code',
    title: 'Documentation Delivery in a Docs-as-Code Environment',
    kicker: 'Docs-as-code · Repository delivery',
    summary: 'How a manual Git-based writing process evolved into documentation-specific commands with explicit review safeguards.',
    tags: ['Git', 'Workflow design', 'Documentation engineering']
  },
  {
    to: '/case-studies/ai-assisted-system',
    title: 'Building a Reusable AI-Assisted Documentation System',
    kicker: 'AI-assisted workflows · Documentation tooling',
    summary: 'Organizing shared standards, source checks, and task-specific instructions into reusable components for documentation work.',
    tags: ['Claude Code', 'Reusable skills', 'Automation']
  },
];

function WorkCard({item, type}) {
  return <Link className={`card work-card ${type}`} to={item.to}>
    <div className="work-type">{type === 'doc' ? 'DOCUMENTATION SAMPLE' : 'CASE STUDY'}</div>
    <div className="num">{item.kicker}</div>
    <h3>{item.title}</h3>
    <p>{item.summary}</p>
    <div className="tagrow">{item.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
  </Link>;
}

export default function Home(){
  const cvUrl = 'https://mikhail-bezrukov-tw.github.io/technical-writing-portfolio-en/mikhail-bezrukov-cv.pdf?v=20261005-1758';
  return <Layout title="Senior Technical Writer" description="Mikhail Bezrukov — product documentation, docs-as-code, visual documentation, and AI-assisted workflows">
    <main>
      <section className="hero"><div className="wrap">
        <div className="eyebrow">Senior Technical Writer · Product documentation</div>
        <h1>Mikhail Bezrukov</h1>
        <div className="lede">I own customer-facing product documentation from research and source verification through publication and maintenance. I also build docs-as-code and AI-assisted workflows that make documentation easier to keep accurate as the product evolves.</div>
        <div className="chips">{['Product documentation','English C1 · Russian native','Visual documentation','Docs-as-code','AI-assisted workflows','Release communication'].map(x=><span className="chip" key={x}>{x}</span>)}</div>
        <div className="cta"><Link className="btn primary" to="/documentation">View documentation samples</Link><Link className="btn" to="/case-studies">Explore case studies</Link><a className="btn" href={cvUrl}>CV</a></div>
        <div className="fitline"><strong>Software product documentation since 2022.</strong> Day-to-day documentation and collaboration in English; product research across Product, Engineering, QA, business analysis, and domain teams.</div>
        <div className="stats">
          <div className="stat"><strong>200+</strong><span>Knowledge Base articles maintained</span></div>
          <div className="stat"><strong>8 services</strong><span>end-to-end documentation ownership</span></div>
          <div className="stat"><strong>18 services</strong><span>release notes coverage across the wider product ecosystem</span></div>
          <div className="stat"><strong>Nearly 4 years</strong><span>in software product documentation</span></div>
        </div>
      </div></section>

      <section className="section work-section doc-section"><div className="wrap">
        <div className="section-title vertical-title">
          <div><div className="section-kicker">THE DOCUMENTATION ITSELF</div><h2>Documentation samples</h2></div>
          <p>Portfolio-safe adaptations of real user-facing Knowledge Base articles. These pages demonstrate the documentation as a reader would encounter it—not an explanation of my process.</p>
        </div>
        <div className="cards doc-cards">{documentation.map(item=><WorkCard item={item} type="doc" key={item.to}/>)}</div>
        <div className="section-more"><Link to="/documentation">View all documentation samples →</Link></div>
      </div></section>

      <section className="section work-section case-section"><div className="wrap">
        <div className="section-title vertical-title">
          <div><div className="section-kicker">HOW I WORK</div><h2>Case studies</h2></div>
          <p>Behind-the-scenes explanations of how I investigate product behavior, design documentation workflows, collaborate with teams, and build reusable tooling.</p>
        </div>
        <div className="cards case-cards">{caseStudies.map(item=><WorkCard item={item} type="case" key={item.to}/>)}</div>
        <div className="section-more"><Link to="/case-studies">View all case studies →</Link></div>
      </div></section>

      <section className="section about-section" id="about"><div className="wrap">
        <div className="section-title vertical-title">
          <div><div className="section-kicker">ABOUT</div><h2>Senior Technical Writer</h2></div>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            <p>I have nearly four years of experience in software product documentation. In my current role I own end-user and internal documentation for eight healthcare IT services, maintain more than 200 Knowledge Base articles, and contribute to release communication across 18 services.</p>
            <p>My day-to-day documentation and stakeholder communication are in English. I combine product research, source verification, writing, publication and maintenance, Git-based delivery, screenshots and diagrams, and collaboration with Product, Engineering, QA, business analysts, data specialists, and domain experts.</p>
            <p>I also build reusable Claude and Claude Code skills and AI-assisted workflows for drafting support, editorial QA, UX copy, screenshot preparation, and documentation maintenance.</p>
            <p>My working stack includes Git, Markdown, Docusaurus, Docker, Jira, Confluence, Figma, Python documentation utilities, Claude / Claude Code, ChatGPT, Gemini, and Cursor. I work in English daily, with Russian as my native language and Spanish at professional proficiency.</p>
          </div>

          <div className="contact-panel">
            <div className="contact-card">
              <div className="contact-label">CONTACT ME</div>
              <div className="contact-row"><span className="contact-kind">Telegram</span><a href="https://t.me/el_miguel">@el_miguel</a></div>
              <div className="contact-row"><span className="contact-kind">Email</span><a href="mailto:Snail7070@gmail.com">Snail7070@gmail.com</a></div>
            </div>
            <div className="contact-card">
              <div className="contact-label">TECHNICAL WRITING CHANNEL</div>
              <div className="contact-row"><span className="contact-kind">Telegram</span><a href="https://t.me/mishka_v_kurse">@mishka_v_kurse</a></div>
              <p>Russian-language posts about technical writing, docs-as-code, AI workflows, and documentation practice.</p>
            </div>
            <a className="btn primary about-cv" href={cvUrl}>CV</a>
          </div>
        </div>
      </div></section>
    </main>
  </Layout>
}
