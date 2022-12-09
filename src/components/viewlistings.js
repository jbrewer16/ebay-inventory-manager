import React, { Component } from 'react'
import { BsFillTrashFill, BsFillPencilFill, BsLink45Deg, BsCalendar3 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import CreateListingModal from './createlistingmodal';
import CreateOrderModal from './createordermodal';
import axios from 'axios';
import styles from '../css/viewlistings.module.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Listing = props => (
  <tr>
    <td><a href={'/item/' + props.listing.item._id}>{props.listing.item.itemname}</a></td>
    <td>{props.listing.item.category}</td>
    <td>{props.listing.originalAmount}</td>
    <td>{props.listing.amountLeft}</td>
    <td>$
      {
        ((Number(props.listing.item.cost) +
          Number(props.listing.item.shippingcost) +
          Number(props.listing.item.fees))
          *
          Number(props.listing.originalAmount)).toFixed(2)
      }
    </td>
    <td>${(Number(props.listing.originalAmount) * Number(props.listing.item.price)).toFixed(2)}</td>
    <td>$
      {
        ((Number(props.listing.originalAmount) * Number(props.listing.item.price))
          -
          (
            (Number(props.listing.item.cost) +
              Number(props.listing.item.shippingcost) +
              Number(props.listing.item.fees))
            *
            Number(props.listing.originalAmount)
          )).toFixed(2)
      }
    </td>
    <td><a href={props.listing.listinglink} target="_blank"><BsLink45Deg /></a></td>
    <td>{props.listing.status}</td>
    <td>{props.listing.dateadded.substring(0, 10)}</td>
    <td>
      <Link to={'/listing/edit/' + props.listing._id}><BsFillPencilFill /></Link>
      <a href='#' onClick={() => { props.deleteListing(props.listing._id) }}><BsFillTrashFill /></a>
    </td>
  </tr>
)

export default class ViewListings extends Component {

  constructor(props) {
    super(props)

    this.deleteListing = this.deleteListing.bind(this);
    this.onChangeStatusSort = this.onChangeStatusSort.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      listings: [],
      statusSort: "All",
      startDate: null,
      endDate: null,
      show: null
    }

  }

  componentDidMount() {
    axios.get('http://localhost:5000/listings/')
      .then(res => {
        this.setState({ listings: res.data })
      })
      .catch(err => console.log('Error: ' + err));
  }

  deleteListing(id) {
    axios.delete('http://localhost:5000/listings/' + id)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ' + err));
    this.setState({
      listings: this.state.listings.filter(el => el._id !== id)
    });
  }

  onChangeStatusSort(e) {
    this.setState({
      statusSort: e.target.value
    })
  }

  validListing(listing) {
    var valid = true;
    if (listing.status !== this.state.statusSort && this.state.statusSort !== "All") {
      valid = false;
    }
    if (this.state.startDate !== null && this.state.endDate !== null) {
      var dateAdded = new Date(listing.dateadded);
      dateAdded.setHours(0, 0, 0, 0);
      var startDate = new Date(this.state.startDate);
      var endDate = new Date(this.state.endDate);
      if (dateAdded < startDate || dateAdded > endDate) {
        valid = false;
      }
    }
    return valid;
  }

  handleClose(id) {
    this.setState({ show: id });
  }

  handleShow(id) {
    this.setState({ show: id });
  }

  listingsList() {
    return this.state.listings.map(currentListing => {
      if (this.validListing(currentListing)) {
        return <Listing
          listing={currentListing}
          deleteListing={this.deleteListing}
          key={currentListing._id}
        />;
      }
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <CreateListingModal show={this.state.show == 'listing'} handleClose={this.handleClose} />
        <CreateOrderModal show={this.state.show == 'order'} handleClose={this.handleClose} />
        <div className='row' style={{ paddingTop: '20px' }}>
          <div className='col-1'>
            <h3>Listings</h3>
          </div>
          <div className='col-1' style={{ marginLeft: '20px', marginTop: '10px' }}>
            <select
              name='sortStatus'
              value={this.state.statusSort}
              onChange={this.onChangeStatusSort}
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <div className='col-3' style={{ marginTop: '8px' }}>
            <div className='row'>
              <div className='col-2' style={{ paddingLeft: '40px' }}>
                <BsCalendar3 />
              </div>
              <div className='col'>
                <DatePicker
                  selectsRange={true}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={(update) => {
                    this.setState({
                      startDate: update[0],
                      endDate: update[1]
                    })
                  }}
                  isClearable={true}
                />
              </div>
            </div>
          </div>
          <div className='col-3' style={{ marginTop: '3px' }}>
            <div className='row'>
              <div className='col'>
                <button type='button' className='btn btn-primary' onClick={() => this.handleShow('listing')}>
                  New Listing
                </button>
              </div>
              <div className='col'>
                <button type='button' className='btn btn-primary' onClick={() => this.handleShow('order')}>
                  New Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='row' style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '20px' }}>
          <table className={`table table-hover ${styles['listing-table']}`}>
            <thead className={`${styles["listing-table-head"]}`}>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th># Left</th>
                <th>Total Costs</th>
                <th>Sale Price</th>
                <th>Final Profit</th>
                <th>Link</th>
                <th>Status</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {this.listingsList()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
