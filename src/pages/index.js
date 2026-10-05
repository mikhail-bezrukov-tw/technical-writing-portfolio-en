import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const featured = [
  {
    to: '/writing-samples/today-patients',
    number: '01',
    title: 'Today (Patients)',
    kicker: 'Product documentation · UI behavior',
    summary: 'A production-based feature article paired with an anonymized Figma mockup, written to explain what the UI does and what the user can act on.',
    tags: ['Product docs', 'UI documentation', 'Visual documentation']
  },
  {
    to: '/case-studies/ai-screenshot-workflow',
    number: '02',
    title: 'Let the Model Decide, Let the Script Verify',
    kicker: 'AI-assisted workflow · Screenshots',
    summary: 'How screenshot preparation evolved from a detailed prompt into an orchestration layer with deterministic Python checks.',
    tags: ['Claude Code', 'Python', 'Screenshots']
  },
  {
    to: '/case-studies/docs-linter',
    number: '03',
    title: 'When Documentation Rules Belong in Code',
    kicker: 'Docs-as-code · Quality automation',
    summary: 'How recurring review comments became a small Python linter—and why some findings should warn rather than block.',
    tags: ['Docs-as-code', 'Python', 'Editorial judgment']
  },
];

const additional = [
  {to:'/writing-samples/clinical-copilot-overview', title:'Clinical Copilot Overview', text:'A second product-documentation sample focused on product orientation and navigation.'},
  {to:'/case-studies/release-communications', title:'Release Communications Across 18 Services', text:'Turning distributed release information into searchable user-facing release notes.'},
  {to:'/case-studies/product-logic', title:'Documenting Complex Product Logic', text:'A case study in product investigation, information architecture, and explaining interconnected rules.'},
];

export default function Home(){
  const cvUrl = useBaseUrl('/mikhail-bezrukov-cv.pdf');
  return <Layout title="Senior Technical Writer" description="Mikhail Bezrukov — product documentation, docs-as-code, visual documentation, and AI-assisted workflows">
    <main>
      <section className="hero"><div className="wrap">
        <div className="eyebrow">Senior Technical Writer · Product documentation</div>
        <h1>Mikhail Bezrukov</h1>
        <div className="lede">I own customer-facing product documentation from research and source verification through publication and maintenance. I also build docs-as-code and AI-assisted workflows that make documentation easier to keep accurate as the product evolves.</div>
        <div className="chips">{['Product documentation','English C1 · Russian native','Visual documentation','Docs-as-code','AI-assisted workflows','Release communication'].map(x=><span className="chip" key={x}>{x}</span>)}</div>
        <div className="cta"><Link className="btn primary" to="/writing-samples/today-patients">View product documentation</Link><Link className="btn" to="/case-studies/ai-screenshot-workflow">See screenshot workflow</Link><a className="btn" href={cvUrl}>Resume</a></div>
        <div className="fitline"><strong>Software product documentation since 2022.</strong> Day-to-day documentation and collaboration in English; product research across Product, Engineering, QA, business analysis, and domain teams.</div>
        <div className="stats"><div className="stat"><strong>200+</strong><span>Knowledge Base articles</span></div><div className="stat"><strong>8</strong><span>services under documentation ownership</span></div><div className="stat"><strong>18</strong><span>services covered by release communications</span></div><div className="stat"><strong>50+</strong><span>docs-as-code articles maintained</span></div></div>
      </div></section>

      <section className="section" id="featured"><div className="wrap">
        <div className="section-title"><h2>Selected work</h2><p>Product writing first, then visual/AI workflow design and documentation engineering.</p></div>
        <div className="cards">
          {featured.map(c=><Link className="card" to={c.to} key={c.to}><div className="num">{c.number} · {c.kicker}</div><h3>{c.title}</h3><p>{c.summary}</p><div className="tagrow">{c.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div></Link>)}
        </div>
      </div></section>

      <section className="section"><div className="wrap">
        <div className="section-title"><h2>Additional work</h2><p>Supporting samples for product research, release documentation, and information architecture.</p></div>
        <div className="cards compact-cards">{additional.map(c=><Link className="card" to={c.to} key={c.to}><div className="num">Additional sample</div><h3>{c.title}</h3><p>{c.text}</p></Link>)}</div>
      </div></section>
    </main>
  </Layout>
}
