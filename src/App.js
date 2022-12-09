import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import EditItem from './components/edititem';
import EditListing from './components/editlisting';
import ViewListings from './components/viewlistings';
import ViewItem from './components/viewitem';
import ViewAllItems from './components/viewallitems';

function App() {

  document.body.style.backgroundColor = "#F0F0F0"

  return (
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/listings" exact element={<ViewListings />} />
            <Route path="/items" exact element={<ViewAllItems />} />
            <Route path="/item/:id" exact element={<ViewItem />} />
            <Route path="/item/edit/:id" exact element={<EditItem />} />
            <Route path="/listing/edit/:id" exact element={<EditListing />} />
          </Routes>
      </Router>
  );
}

export default App;
