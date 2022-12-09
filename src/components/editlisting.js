import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditListing extends Component {

  constructor(props) {

    super(props);

    this.onChangeOriginalAmount = this.onChangeOriginalAmount.bind(this);
    this.onChangeAmountLeft = this.onChangeAmountLeft.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeListingLink = this.onChangeListingLink.bind(this);
    this.onChangeDateAdded = this.onChangeDateAdded.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      itemnumber: 0,
      originalAmount: 0,
      amountLeft: 0,
      // finalprofit: 0,
      listinglink: "",
      status: "Listed",
      dateadded: new Date(),
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
          originalAmount: res.data.originalAmount,
          amountLeft: res.data.amountLeft,
          // finalprofit: res.data.finalprofit,
          listinglink: res.data.listinglink,
          status: res.data.status,
          dateadded: new Date(res.data.dateadded),
          item: res.data.item
        });
      })
      .catch(err => console.log('Error: ' + err));
  }

  onChangeOriginalAmount(e) {
    this.setState({
      originalAmount: e.target.value
    });
  }

  onChangeAmountLeft(e) {
    this.setState({
      amountLeft: e.target.value
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

  onSubmit(e) {
    e.preventDefault();

    const listing = {
      item: this.state.item,
      originalAmount: this.state.originalAmount,
      amountLeft: this.state.amountLeft,
      // finalprofit: this.state.finalprofit,
      listinglink: this.state.listinglink,
      status: this.state.status,
      dateadded: this.state.dateadded
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
      <div className='container-sm'>
        <div className='row' style={{ paddingTop: '40px', width: '25%', margin: 'auto' }}>
          <h3>Edit Listing</h3>
        </div>
        <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
          <p>{this.state.item.itemnumber} - {this.state.item.itemname}</p>
        </div>
        <div className='row'>
          <form onSubmit={this.onSubmit}>
            <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
              {/* Amount */}
              <div className='form-group'>
                <label>Original Amount: </label>
                <input type='text'
                  required
                  className='form-control'
                  value={this.state.originalAmount}
                  onChange={this.onChangeOriginalAmount}
                />
              </div>
            </div>
            <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
              {/* Amount */}
              <div className='form-group'>
                <label>Amount Left: </label>
                <input type='text'
                  required
                  className='form-control'
                  value={this.state.amountLeft}
                  onChange={this.onChangeAmountLeft}
                />
              </div>
            </div>
            <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
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
            </div>
            <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
              {/* Status */}
              <div className='form-group'>
                <label>Status: </label>
                <select
                  name='status'
                  style={{ marginLeft: '10px' }}
                  value={this.state.status}
                  onChange={this.onChangeStatus}>
                  <option value='Listed'>Listed</option>
                  <option value='Complete'>Complete</option>
                </select>
              </div>
            </div>
            <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
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
            </div>
            <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
              <div className='form-group'>
                <input type='submit' value='Edit Listing' className='btn btn-primary' />
              </div>
            </div>
          </form>
        </div>

      </div>
    )
  }
}
