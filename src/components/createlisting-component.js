import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateListing extends Component {
  constructor(props) {
    super(props);

    this.onChangeItem = this.onChangeItem.bind(this);
    this.onChangeItemNumber = this.onChangeItemNumber.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeFinalProfit = this.onChangeFinalProfit.bind(this);
    this.onChangeListingLink = this.onChangeListingLink.bind(this);
    this.onChangeDateAdded = this.onChangeDateAdded.bind(this);
    this.onChangeDateSold = this.onChangeDateSold.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      itemnumber: 0,
      amount: 0,
      finalprofit: 0,
      listinglink: "",
      //Status will always initially be "Listed"
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
      },
      items: [],
      users: [],
      itemnumbers: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            items: response.data.map(item => item),
            itemnumber: response.data[0].itemnumber,
            item: response.data[0]
          });
        }
      });
  }

  onChangeItem(e) {
    this.setState({
      item: JSON.parse(e.target.value)
    });
    this.onChangeItemNumber(e);
  }

  onChangeItemNumber(e) {
    this.setState({
      itemnumber: e.target.value
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onChangeFinalProfit(e) {
    this.setState({
      finalprofit: e.target.value
    });
  }

  onChangeListingLink(e) {
    this.setState({
      listinglink: e.target.value
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

    axios.post('http://localhost:5000/listings/add', listing)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ' + err));

    window.location = '/listings';

  }

  render() {
    return (
      <div>
        <h3>Create New Listing</h3>
        <form onSubmit={this.onSubmit}>
          {/* Item Number */}
          <div className='form-group'>
            <label>Item Number: </label>
            <select ref='userInput'
              required
              className='form-control'
              value={this.state.itemnumber}
              onChange={this.onChangeItem}>
              {
                this.state.items.map(function (item) {
                  return <option
                    key={item.itemnumber}
                    value={JSON.stringify(item)}>{item.itemnumber} - {item.itemname}
                  </option>
                })
              }
            </select>
          </div>
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
          {/* Final Profit */}
          {/* <div className='form-group'>
            <label>Final Profit: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.finalprofit}
              onChange={this.onChangeFinalProfit}
            />
          </div> */}
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
            <input type='submit' value='Create Listing' className='btn btn-primary' />
          </div>
        </form>
      </div>
    )
  }
}
