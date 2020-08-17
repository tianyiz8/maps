import React, { useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import './Nav.css';
const Nav = () => {
  const menuRef = useRef();
  useEffect(() => {
    M.Sidenav.init(menuRef.current, {})
  }, [])
  return (
    <nav className="nav-wrapper deep-purple">
      <div className="container">
        <Link to='/' className="brand-logo">DSRS</Link>
        <Link data-target="mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </Link>
        <ul className="right hide-on-med-and-down">
            <li><Link to="/chord">Chord</Link></li>
            <li><Link to="/flow">Flow</Link></li>
            <li><Link to="/gdpmap">GDP</Link></li>
            <li><Link to="/treemap">Tree</Link></li>
        </ul>
        <ul className="sidenav" id="mobile" ref={ menuRef }>
          <li><Link to="/chord">Chord</Link></li>
          <li><Link to="/flow">Flow</Link></li>
          <li><Link to="/gdpmap">GDP</Link></li>
          <li><Link to="/treemap">Tree</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;