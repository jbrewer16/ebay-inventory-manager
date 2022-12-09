import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <Link to='/' className='navbar-brand'>Ebay Inventory Manager</Link>
        <div className='collapse navbar-collapse'>
            <ul className='navbar-nav mr-auto'>
                <li className='navbar-item'>
                    <Link to='/' className='nav-link'>Dashboard</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/listings' className='nav-link'>View Listings</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/items' className='nav-link'>View Items</Link>
                </li>
            </ul>
        </div>
      </nav>
    )
  }
}
