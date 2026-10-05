import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NavbarMobileSidebarPrimaryMenu() {
  const homeUrl = useBaseUrl('/');
  const documentationUrl = useBaseUrl('/documentation');
  const caseStudiesUrl = useBaseUrl('/case-studies');
  const cvUrl = useBaseUrl('/mikhail-bezrukov-cv.pdf?v=20261005-1758');

  return (
    <ul className="menu__list mobile-portfolio-menu">
      <li className="menu__list-item">
        <a className="menu__link" href={documentationUrl}>Documentation Samples</a>
      </li>
      <li className="menu__list-item">
        <a className="menu__link" href={caseStudiesUrl}>Case Studies</a>
      </li>
      <li className="menu__list-item">
        <a className="menu__link" href={`${homeUrl}#about`}>About</a>
      </li>
      <li className="menu__list-item">
        <a className="menu__link" href={cvUrl}>CV <span aria-hidden="true">↗</span></a>
      </li>
    </ul>
  );
}
