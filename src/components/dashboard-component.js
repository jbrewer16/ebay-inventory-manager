import axios from 'axios';
import React, { Component } from 'react'
import '../css/dashboard.css'

export default class CreateItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      items: [],
    }

  }

  componentDidMount() {
    axios.get('http://localhost:5000/listings/')
      .then(res => {
        this.setState({
          listings: res.data
        });
      })
      .catch(err => console.log('Error: ' + err));

    axios.get('http://localhost:5000/items/')
      .then(res => {
        this.setState({
          items: res.data
        });
      })
      .catch(err => console.log('Error: ' + err));
  }

  getInventoryCount() {
    return this.state.listings.reduce((count, listing) => count = count + Number(listing.amount), 0)
  }

  getInventoryPriceSummary(){
    return(this.state.listings.reduce((sum, listing) => {
      return sum + (Number(listing.amount) * Number(listing.item.price))
    }, 0));
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          {/* To be packed card */}
          <div class="card" style={{ width: "185px", height: "185px", marginTop: "10px", marginRight: "60px" }}>
            <div class="card-body">
              <div class="card-title" style={{ textAlign: "center", paddingTop: "30px", fontSize: "48px" }}>
                4
              </div>
              <div class="card-text" style={{ textAlign: "center", paddingTop: "20px", fontSize: "18px" }}>
                To be packed
              </div>
            </div>
          </div>
          {/* To be shipped card */}
          <div class="card" style={{ width: "185px", height: "185px", marginTop: "10px", marginRight: "60px" }}>
            <div class="card-body">
              <div class="card-title" style={{ textAlign: "center", paddingTop: "30px", fontSize: "48px" }}>
                2
              </div>
              <div class="card-text" style={{ textAlign: "center", paddingTop: "20px", fontSize: "18px" }}>
                To be shipped
              </div>
            </div>
          </div>
          {/* To be delivered card */}
          <div class="card" style={{ width: "185px", height: "185px", marginTop: "10px", marginRight: "60px" }}>
            <div class="card-body">
              <div class="card-title" style={{ textAlign: "center", paddingTop: "30px", fontSize: "48px" }}>
                6
              </div>
              <div class="card-text" style={{ textAlign: "center", paddingTop: "20px", fontSize: "18px" }}>
                To be delivered
              </div>
            </div>
          </div>
          <div class="col" style={{ marginTop: "80px", marginLeft: "50px" }}>
            <div class="row" style={{ width: "300px", textAlign: "center" }}>
              <p>Inventory Summary</p>
            </div>
            <div class="row" style={{ width: "300px", textAlign: "center" }}>
              <p style={{ borderStyle: "solid" }}>Number of items: {this.getInventoryCount()}</p>
            </div>
            <div class="row" style={{ width: "300px", textAlign: "center" }}>
              <p style={{ borderStyle: "solid" }}>Price of items: ${this.getInventoryPriceSummary()}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3" style={{ marginTop: "40px" }}>
            <p style={{ paddingLeft: "50px" }}>Sales last 30 days</p>
            {/* To be delivered card */}
            <div class="card" style={{ width: "225px", marginTop: "0px", marginRight: "10px" }}>
              <div class="card-body">
                <div class="card-text" style={{ textAlign: "left", paddingTop: "5px" }}>
                  Number of items: 12
                </div>
                <div class="card-text" style={{ textAlign: "left", paddingTop: "5px" }}>
                  Total Revenue: $450
                </div>
                <div class="card-text" style={{ textAlign: "left", paddingTop: "5px" }}>
                  Total Costs: $62
                </div>
                <div class="card-text" style={{ textAlign: "left", paddingTop: "5px" }}>
                  Profit: $388
                </div>
              </div>
            </div>
          </div>
          <div class="col-9" style={{marginTop: "40px"}}>
            <p>Order details last 30 days</p>
            <table>
              <tr>
                <th>Item #</th>
                <th>Item Name</th>
                <th>Item Quantity</th>
                <th>Sale Price</th>
                <th>Total Costs</th>
                <th>Profit</th>
                <th>Status</th>
                <th>Sale Date</th>
              </tr>
              <tr>
                <td>106</td>
                <td>GE LED Fan Frosted Bulb</td>
                <td>1</td>
                <td>$9.99</td>
                <td>$6.25</td>
                <td>$3.74</td>
                <td>Delivered</td>
                <td>2022-11-28</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
