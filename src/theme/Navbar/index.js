import React, {useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const homeUrl = useBaseUrl('/');
  const documentationUrl = useBaseUrl('/documentation');
  const caseStudiesUrl = useBaseUrl('/case-studies');
  const cvUrl = useBaseUrl('/mikhail-bezrukov-cv.pdf') + '?v=20261005-final';
  const aboutUrl = `${homeUrl}#about`;

  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar--fixed-top portfolio-navbar" aria-label="Main">
      <div className="portfolio-navbar__inner">
        <a className="portfolio-navbar__brand" href={homeUrl} onClick={close}>
          Mikhail Bezrukov
        </a>

        <div className="portfolio-navbar__desktop">
          <a href={documentationUrl}>Documentation Samples</a>
          <a href={caseStudiesUrl}>Case Studies</a>
          <a href={aboutUrl}>About</a>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer">CV <span aria-hidden="true">↗</span></a>
        </div>

        <button
          type="button"
          className="portfolio-navbar__toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {open && (
        <div className="portfolio-navbar__mobile">
          <a href={documentationUrl} onClick={close}>Documentation Samples</a>
          <a href={caseStudiesUrl} onClick={close}>Case Studies</a>
          <a href={aboutUrl} onClick={close}>About</a>
          <a href={cvUrl} target="_blank" rel="noopener noreferrer" onClick={close}>CV <span aria-hidden="true">↗</span></a>
        </div>
      )}
    </nav>
  );
}
