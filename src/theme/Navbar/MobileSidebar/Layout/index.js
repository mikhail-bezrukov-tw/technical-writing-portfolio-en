import React from 'react';

export default function NavbarMobileSidebarLayout({header, primaryMenu}) {
  return (
    <div className="navbar-sidebar">
      {header}
      <div className="navbar-sidebar__items">
        <div className="navbar-sidebar__item menu">
          {primaryMenu}
        </div>
      </div>
    </div>
  );
}
