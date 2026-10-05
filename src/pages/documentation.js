import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const samples = [
  {
    to:'/writing-samples/today-patients',
    title:'Today (Patients)',
    type:'Feature documentation / UI behavior',
    text:'A portfolio-safe adaptation of a production Knowledge Base article explaining the Today dashboard, same-day priorities, appointments, HEDIS metrics, and PCP Group performance.'
  },
  {
    to:'/writing-samples/ai-assistant-how-to',
    title:'How to Use the AI Assistant in Workspace',
    type:'How-to / AI assistant',
    text:'A portfolio-safe adaptation of a production how-to article covering access, contextual questions, chat controls, keyboard shortcuts, and answer verification.'
  }
];

export default function Documentation(){
  return <Layout title="Documentation Samples" description="User-facing product documentation samples by Mikhail Bezrukov">
    <main>
      <section className="listing-hero"><div className="wrap">
        <div className="eyebrow">The documentation itself</div>
        <h1>Documentation Samples</h1>
        <p className="lede">These are portfolio-safe adaptations of real user-facing Knowledge Base articles. They are presented as documentation samples, not as case studies about my process.</p>
      </div></section>
      <section className="section"><div className="wrap">
        <div className="cards doc-cards">
          {samples.map(s=><Link className="card work-card doc" to={s.to} key={s.to}>
            <div className="work-type">USER-FACING DOCUMENTATION</div>
            <div className="num">{s.type}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Link>)}
        </div>
      </div></section>
    </main>
  </Layout>
}
