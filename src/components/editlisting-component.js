import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditListing extends Component {

  constructor(props) {

    super(props);

    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeListingLink = this.onChangeListingLink.bind(this);
    this.onChangeDateAdded = this.onChangeDateAdded.bind(this);
    this.onChangeDateSold = this.onChangeDateSold.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      itemnumber: 0,
      amount: 0,
      finalprofit: 0,
      listinglink: "",
      status: "Listed",
      dateadded: new Date(),
      datesold: new Date(),
      item: {
        itemnumber: 0,
        itemname: "",
        category: "",
        price: 0,
        cost: 0,
        shippingcost: 0,
        fees: 0,
        imagelink: "",
      }
    }

  }

  componentDidMount() {
    const arr = window.location.href.split('/');
    axios.get('http://localhost:5000/listings/' + arr[arr.length - 1])
      .then(res => {
        this.setState({
          itemnumber: res.data.itemnumber,
          amount: res.data.amount,
          finalprofit: res.data.finalprofit,
          listinglink: res.data.listinglink,
          status: res.data.status,
          dateadded: new Date(res.data.dateadded),
          datesold: new Date(res.data.datesold),
          item: res.data.item
        });
      })
      .catch(err => console.log('Error: ' + err));
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onChangeListingLink(e) {
    this.setState({
      listinglink: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onChangeDateAdded(d) {
    this.setState({
      dateadded: d
    });
  }

  onChangeDateSold(d) {
    this.setState({
      datesold: d
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const listing = {
      item: this.state.item,
      amount: this.state.amount,
      finalprofit: this.state.finalprofit,
      listinglink: this.state.listinglink,
      status: this.state.status,
      dateadded: this.state.dateadded,
      datesold: this.state.datesold
    }

    console.log(listing);

    const arr = window.location.href.split('/');
    axios.post('http://localhost:5000/listings/update/' + arr[arr.length - 1], listing)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ' + err));

    window.location = '/listings';

  }

  render() {
    return (
      <div>
        <h3>Edit Listing</h3>
        <p>{this.state.item.itemnumber} - {this.state.item.itemname}</p>
        <form onSubmit={this.onSubmit}>
          {/* Amount */}
          <div className='form-group'>
            <label>Amount: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>
          {/* Listing Link */}
          <div className='form-group'>
            <label>Listing Link: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.listinglink}
              onChange={this.onChangeListingLink}
            />
          </div>
          {/* Status */}
          <div className='form-group'>
            <label>Status: </label>
            <select
              name='status'
              value={this.state.status}
              onChange={this.onChangeStatus}>
              <option value='Listed'>Listed</option>
              <option value='Sold'>Sold</option>
              <option value='Packed'>Packed</option>
              <option value='Shipped'>Shipped</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
          {/* Date Added */}
          <div className='form-group'>
            <label>Date Added: </label>
            <div>
              <DatePicker
                selected={this.state.dateadded}
                onChange={this.onChangeDateAdded}
              />
            </div>
          </div>
          {/* Date Sold */}
          <div className='form-group'>
            <label>Date Sold: </label>
            <div>
              <DatePicker
                selected={this.state.datesold}
                onChange={this.onChangeDateSold}
              />
            </div>
          </div>
          <div className='form-group'>
            <input type='submit' value='Edit Listing' className='btn btn-primary' />
          </div>
        </form>
      </div>
    )
  }
}
