import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const studies = [
  ['/case-studies/ai-screenshot-workflow','Let the Model Decide, Let the Script Verify','AI-assisted workflow · Screenshots','A reproducible screenshot workflow built around semantic decisions and deterministic Python checks.'],
  ['/case-studies/docs-linter','When Documentation Rules Belong in Code','Docs-as-code · Quality automation','Turning recurring review comments into code while keeping editorial judgment with the writer.'],
  ['/case-studies/release-communications','Release Communications Across 18 Services','Release documentation · Product communication','The editorial layer between distributed release inputs and user-facing release notes.'],
  ['/case-studies/product-logic','Documenting Complex Product Logic','Product investigation · Information architecture','Reconstructing interconnected rules and expressing them as a traceable decision model.'],
  ['/case-studies/docs-as-code','Documentation Delivery in a Docs-as-Code Environment','Docs-as-code · Repository delivery','From manual Git operations to documentation-specific delivery commands and safeguards.'],
  ['/case-studies/ai-assisted-system','Building a Reusable AI-Assisted Documentation System','AI-assisted workflows · Documentation tooling','Reusable Claude / Claude Code skills and workflows for documentation creation and maintenance.'],
];

export default function CaseStudies(){
  return <Layout title="Case Studies" description="Technical writing and documentation workflow case studies by Mikhail Bezrukov">
    <main>
      <section className="listing-hero"><div className="wrap">
        <div className="eyebrow">How I work</div>
        <h1>Case Studies</h1>
        <p className="lede">These pages explain the thinking, collaboration, tooling, and trade-offs behind my documentation work. They are not end-user articles themselves.</p>
      </div></section>
      <section className="section"><div className="wrap">
        <div className="cards case-cards">
          {studies.map(([to,title,type,text])=><Link className="card work-card case" to={to} key={to}>
            <div className="work-type">CASE STUDY</div>
            <div className="num">{type}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </Link>)}
        </div>
      </div></section>
    </main>
  </Layout>
}
