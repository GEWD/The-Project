import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const Navbar = ({isAuthenticated, handleClickLogout, sideMenuState, menuOnClick}) => (
  <header>
    <div className='navbar-component'>
      <a href="#" onClick={menuOnClick} className='menu-icon'></a>
      <Link to="/" className='brand'>Diff</Link>
      <nav className='menu'>
        <Link to="/" className='link'>Home</Link>
        <Link to="/upload-receipt" className='link'>Upload Receipt</Link>
        <Link to="/profile" className='link'>Profile</Link>
        <Link to="/additems" className='link'>Add Items</Link>
        <Link to="/summary" className='link'>Member Summary</Link>
        <Link to="/create-trip" className='link'>Create Trip</Link>
        {isAuthenticated ? null : <Link to="/login" className='link'>Login</Link>}
        {!isAuthenticated ? null : <Link to="/logout" onClick={handleClickLogout} className='link'>Logout</Link>}
      </nav>
    </div>
  </header>
)

export default Navbar;
