import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

const Navbar = ({isAuthenticated, handleClickLogout}) => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/upload-receipt">Upload Receipt</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/additems">Add Items</Link>
    <Link to="/summary">Member Summary</Link>
    <Link to="/create-trip">Create Trip</Link>
    {isAuthenticated ? null : <Link to="/login">Login</Link>}
    {!isAuthenticated ? null : <Link to="/logout" onClick={this.handleClickLogout}>Logout</Link>}
  </nav>
)

export default Navbar;
