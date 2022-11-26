import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CreateItem extends Component {

  constructor(props) {
    super(props);

    this.onChangeItemNumber = this.onChangeItemNumber.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeShippingCost = this.onChangeShippingCost.bind(this);
    this.onChangeFees = this.onChangeFees.bind(this);
    this.onChangeImageLink = this.onChangeImageLink.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      itemnumber: 0,
      itemname: "",
      category: "",
      price: 0,
      cost: 0,
      shippingcost: 0,
      fees: 0,
      imagelink: ""
    }

  }

  componentDidMount() {
    axios.get('http://localhost:5000/items/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            itemnumber: (response.data[response.data.length - 1].itemnumber + 1)
          });
        }
      });
  }

  onChangeItemNumber(e) {
    this.setState({
      itemnumber: e.target.value
    })
  }

  onChangeItemName(e) {
    this.setState({
      itemname: e.target.value
    })
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    })
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onChangeCost(e) {
    this.setState({
      cost: e.target.value
    })
  }

  onChangeShippingCost(e) {
    this.setState({
      shippingcost: e.target.value
    })
  }

  onChangeFees(e) {
    this.setState({
      fees: e.target.value
    })
  }

  onChangeImageLink(e) {
    this.setState({
      imagelink: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault;
    
    const item = {
      itemnumber: this.state.itemnumber,
      itemname: this.state.itemname,
      category: this.state.category,
      price: this.state.price,
      cost: this.state.cost,
      shippingcost: this.state.shippingcost,
      fees: this.state.fees,
      imagelink: this.state.imagelink
    }

    console.log(item);

    axios.post('http://localhost:5000/items/add', item)
      .then(res => console.log(res.data))
      .catch(err => console.log('Error: ' + err));

    window.location = '/';

  }

  render() {
    return (
      <div>
        <h3>Create New Item</h3>
        <form onSubmit={this.onSubmit}>
          {/* Item Number */}
          <div className='form-group'>
            <label>Item Number: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.itemnumber}
              onChange={this.onChangeItemNumber}
            />
          </div>
          {/* Item Name */}
          <div className='form-group'>
            <label>Item Name: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.itemname}
              onChange={this.onChangeItemName}
            />
          </div>
          {/* Category */}
          <div className='form-group'>
            <label>Category: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.category}
              onChange={this.onChangeCategory}
            />
          </div>
          {/* Price */}
          <div className='form-group'>
            <label>Price: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>
          {/* Cost */}
          <div className='form-group'>
            <label>Cost: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.cost}
              onChange={this.onChangeCost}
            />
          </div>
          {/* Shipping Cost */}
          <div className='form-group'>
            <label>Shipping Cost: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.shippingcost}
              onChange={this.onChangeShippingCost}
            />
          </div>
          {/* Fees */}
          <div className='form-group'>
            <label>Fees: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.fees}
              onChange={this.onChangeFees}
            />
          </div>
          {/* Image Link */}
          <div className='form-group'>
            <label>Image Link: </label>
            <input type='text'
              required
              className='form-control'
              value={this.state.imagelink}
              onChange={this.onChangeImageLink}
            />
          </div>
          <div className='form-group'>
            <input type='submit' value='Create Item' className='btn btn-primary' />
          </div>
        </form>
      </div>
    )
  }
}
