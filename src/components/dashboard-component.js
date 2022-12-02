import axios from 'axios';
import React, { Component } from 'react'
import '../css/dashboard.css'

const Order = props => (
  <tr>
    <td>{props.listing.item.itemnumber}</td>
    <td>{props.listing.item.itemname}</td>
    <td>{props.listing.amount}</td>
    <td>${(props.listing.item.price * props.listing.amount).toFixed(2)}</td>
    <td>$
      {
        ((Number(props.listing.item.cost) +
          Number(props.listing.item.shippingcost) +
          Number(props.listing.item.fees))
          *
          Number(props.listing.amount)).toFixed(2)
      }
    </td>
    <td>$
      {
        ((Number(props.listing.amount) * Number(props.listing.item.price))
          -
          (
            (Number(props.listing.item.cost) +
              Number(props.listing.item.shippingcost) +
              Number(props.listing.item.fees))
            *
            Number(props.listing.amount)
          )).toFixed(2)
      }
    </td>
    <td>{props.listing.status}</td>
    <td>{props.listing.datesold.substring(0, 10)}</td>
  </tr>
)

export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.onChangeDateRange = this.onChangeDateRange.bind(this);

    this.state = {
      listings: [],
      items: [],
      salesWithinDate: [],
      toBePacked: 0,
      toBeShipped: 0,
      toBeDelivered: 0,
      dateRange: 30
    }

  }

  async componentDidMount() {
    await axios.get('http://localhost:5000/listings/')
      .then(res => {
        this.setState({
          listings: res.data
        });
      })
      .catch(err => console.log('Error: ' + err));

    await axios.get('http://localhost:5000/items/')
      .then(res => {
        this.setState({
          items: res.data
        });
      })
      .catch(err => console.log('Error: ' + err));

    this.getListingStatus()
  }

  getInventoryCount() {
    return this.state.listings.reduce((count, listing) => count = count + Number(listing.amount), 0)
  }

  getInventoryPriceSummary() {
    return (this.state.listings.reduce((sum, listing) => {
      return sum + (Number(listing.amount) * Number(listing.item.price))
    }, 0));
  }

  ordersList() {
    return this.state.salesWithinDate.map(currentListing => {
      return <Order
        listing={currentListing}
        key={currentListing._id}
      />;
    })
  }

  getSalesDetails() {
    const { count, revenue, costs, profit } = this.state.salesWithinDate.reduce((res, listing) => {
      var itemCost = Number(listing.item.cost);
      var shippingCost = Number(listing.item.shippingcost);
      var fees = Number(listing.item.fees);
      var amount = Number(listing.amount);
      var price = Number(listing.item.price);

      res.count = res.count + amount;
      res.revenue = res.revenue + (amount * price);
      res.costs = res.costs + (amount * (itemCost + shippingCost + fees));
      res.profit = res.profit + (amount * (price - (itemCost + shippingCost + fees)));

      return res;
    }, { count: 0, revenue: 0, costs: 0, profit: 0 });

    return [count, revenue, costs, profit];
  }

  getListingStatus() {

    var toBePackedC = 0;
    var toBeShippedC = 0;
    var toBeDeliveredC = 0;

    var listingsInRange = [];

    var timestamp = new Date().getTime() - (this.state.dateRange * 24 * 60 * 60 * 1000);

    this.state.listings.forEach(listing => {
      switch (listing.status) {
        case 'Sold':
          toBePackedC++;
          break;
        case 'Packed':
          toBeShippedC++;
          break;
        case 'Shipped':
          toBeDeliveredC++;
          break;
      }

      var date = new Date(listing.datesold);
      if (date >= timestamp && listing.status !== "Listed") {
        listingsInRange.push(listing);
      }

    });

    this.setState({
      salesWithinDate: listingsInRange,
      toBePacked: toBePackedC,
      toBeShipped: toBeShippedC,
      toBeDelivered: toBeDeliveredC
    });


  }

  onChangeDateRange(e) {
    this.setState({ dateRange: e.target.value }, () => {
      this.getListingStatus()
    });
    
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {/* To be packed card */}
          <div className="card" style={{ width: "185px", height: "185px", marginTop: "10px", marginRight: "60px" }}>
            <div className="card-body">
              <div className="card-title" style={{ textAlign: "center", paddingTop: "30px", fontSize: "48px" }}>
                {this.state.toBePacked}
              </div>
              <div className="card-text" style={{ textAlign: "center", paddingTop: "20px", fontSize: "18px" }}>
                To be packed
              </div>
            </div>
          </div>
          {/* To be shipped card */}
          <div className="card" style={{ width: "185px", height: "185px", marginTop: "10px", marginRight: "60px" }}>
            <div className="card-body">
              <div className="card-title" style={{ textAlign: "center", paddingTop: "30px", fontSize: "48px" }}>
                {this.state.toBeShipped}
              </div>
              <div className="card-text" style={{ textAlign: "center", paddingTop: "20px", fontSize: "18px" }}>
                To be shipped
              </div>
            </div>
          </div>
          {/* To be delivered card */}
          <div className="card" style={{ width: "185px", height: "185px", marginTop: "10px", marginRight: "60px" }}>
            <div className="card-body">
              <div className="card-title" style={{ textAlign: "center", paddingTop: "30px", fontSize: "48px" }}>
                {this.state.toBeDelivered}
              </div>
              <div className="card-text" style={{ textAlign: "center", paddingTop: "20px", fontSize: "18px" }}>
                To be delivered
              </div>
            </div>
          </div>
          <div className="col" style={{ marginTop: "80px", marginLeft: "50px" }}>
            <div className="row" style={{ width: "300px", textAlign: "center" }}>
              <p>Inventory Summary</p>
            </div>
            <div className="row" style={{ width: "300px", textAlign: "center" }}>
              <p style={{ borderStyle: "solid" }}>Number of items: {this.getInventoryCount()}</p>
            </div>
            <div className="row" style={{ width: "300px", textAlign: "center" }}>
              <p style={{ borderStyle: "solid" }}>Price of items: ${this.getInventoryPriceSummary()}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3" style={{ marginTop: "40px" }}>
            <p style={{ paddingLeft: "50px" }}>
              Sales last
              <select
                name='dateRange'
                value={this.state.dateRange}
                onChange={this.onChangeDateRange}
              >
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={90}>90</option>
              </select>
              days
            </p>
            {/* To be delivered card */}
            <div className="card" style={{ width: "225px", marginTop: "0px", marginRight: "10px" }}>
              <div className="card-body">
                <div className="card-text" style={{ textAlign: "left", paddingTop: "5px" }}>
                  Number of items: {this.getSalesDetails()[0]}
                </div>
                <div className="card-text" style={{ textAlign: "left", paddingTop: "5px" }}>
                  Total Revenue: ${this.getSalesDetails()[1].toFixed(2)}
                </div>
                <div className="card-text" style={{ textAlign: "left", paddingTop: "5px" }}>
                  Total Costs: ${this.getSalesDetails()[2].toFixed(2)}
                </div>
                <div className="card-text" style={{ textAlign: "left", paddingTop: "5px" }}>
                  Profit: ${this.getSalesDetails()[3].toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-9" style={{ marginTop: "40px" }}>
            <p>
              Order details last {this.state.dateRange} days
            </p>
            <table>
              <thead>
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
              </thead>
              <tbody>
                {this.ordersList()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
