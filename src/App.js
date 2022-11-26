import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/navbar-component';
import CreateItem from './components/createitem-component';
import CreateListing from './components/createlisting-component';
import CreateUser from './components/createuser-component';
import Dashboard from './components/dashboard-component';
import EditItem from './components/edititem-component';
import EditListing from './components/editlisting-component';
import ViewListings from './components/viewlistings-component';
import ViewItem from './components/viewitem-component';

function App() {
  return (
    <div className="container">
      <Router>
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/listings" exact element={<ViewListings />} />
            <Route path="/user/create" exact element={<CreateUser />} />
            <Route path="/item/create" exact element={<CreateItem />} />
            <Route path="/item/:id" exact element={<ViewItem />} />
            <Route path="/item/edit/:id" exact element={<EditItem />} />
            <Route path="/listing/create" exact element={<CreateListing />} />
            <Route path="/listing/edit/:id" exact element={<EditListing />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
