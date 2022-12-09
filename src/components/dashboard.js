import axios from 'axios';
import React, { Component } from 'react';
import styles from '../css/dashboard.module.css';
import { BsFillTrashFill, BsFillPencilFill, BsLink45Deg, BsCalendar3 } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Order = props => (
  <tr>
    <td>{props.order.listing.item.itemnumber}</td>
    <td>{props.order.listing.item.itemname}</td>
    <td>{props.order.amountOrdered}</td>
    <td>${(props.order.listing.item.price * props.order.amountOrdered).toFixed(2)}</td>
    <td>$
      {
        ((Number(props.order.listing.item.cost) +
          Number(props.order.listing.item.shippingcost) +
          Number(props.order.listing.item.fees))
          *
          Number(props.order.amountOrdered)).toFixed(2)
      }
    </td>
    <td>$
      {
        ((Number(props.order.amountOrdered) * Number(props.order.listing.item.price))
          -
          (
            (Number(props.order.listing.item.cost) +
              Number(props.order.listing.item.shippingcost) +
              Number(props.order.listing.item.fees))
            *
            Number(props.order.amountOrdered)
          )).toFixed(2)
      }
    </td>
    <td>{props.order.status}</td>
    <td>{props.order.datesold.substring(0, 10)}</td>
    <td>
      <Link to={'/order/edit/' + props.order._id}><BsFillPencilFill /></Link>
    </td>
  </tr>
)

export default class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.onChangeDateRange = this.onChangeDateRange.bind(this);

    this.state = {
      listings: [],
      orders: [],
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

    await axios.get('http://localhost:5000/orders/')
      .then(res => {
        this.setState({
          orders: res.data
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

    this.getOrdersStatus()
  }

  getInventoryCount() {
    return this.state.listings.reduce((count, listing) => {
      if (listing.status === "Open") {
        return count = count + Number(listing.amountLeft);
      } else {
        return count;
      }
    }, 0)
  }

  getInventoryPriceSummary() {
    return (this.state.listings.reduce((sum, listing) => {
      if (listing.status === "Open") {
        return sum + (Number(listing.amountLeft) * Number(listing.item.price))
      } else {
        return sum;
      }
    }, 0));
  }

  ordersList() {
    return this.state.salesWithinDate.map(currentOrder => {
      return <Order
        order={currentOrder}
        key={currentOrder._id}
      />;
    })
  }

  getSalesDetails() {
    const { count, revenue, costs, profit } = this.state.salesWithinDate.reduce((res, order) => {
      var itemCost = Number(order.listing.item.cost);
      var shippingCost = Number(order.listing.item.shippingcost);
      var fees = Number(order.listing.item.fees);
      var amount = Number(order.amountOrdered);
      var price = Number(order.listing.item.price);

      res.count = res.count + amount;
      res.revenue = res.revenue + (amount * price);
      res.costs = res.costs + (amount * (itemCost + shippingCost + fees));
      res.profit = res.profit + (amount * (price - (itemCost + shippingCost + fees)));

      return res;
    }, { count: 0, revenue: 0, costs: 0, profit: 0 });

    return [count, revenue, costs, profit];
  }

  getOrdersStatus() {

    var toBePackedC = 0;
    var toBeShippedC = 0;
    var toBeDeliveredC = 0;

    var ordersInRange = [];

    var timestamp = new Date().getTime() - (this.state.dateRange * 24 * 60 * 60 * 1000);

    this.state.orders.forEach(order => {
      switch (order.status) {
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

      var date = new Date(order.datesold);
      if (date >= timestamp && order.status !== "Open") {
        ordersInRange.push(order);
      }

    });

    this.setState({
      salesWithinDate: ordersInRange,
      toBePacked: toBePackedC,
      toBeShipped: toBeShippedC,
      toBeDelivered: toBeDeliveredC
    });


  }

  onChangeDateRange(e) {
    this.setState({ dateRange: e.target.value }, () => {
      this.getOrdersStatus()
    });

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {/* To be packed card */}
          <div className={`${styles.card} card`}>
            <div className="card-body">
              <div className={`card-title ${styles["card-title-pack"]}`}>
                {this.state.toBePacked}
              </div>
              <div className={`card-text ${styles["card-text"]}`}>
                To be packed
              </div>
            </div>
          </div>
          {/* To be shipped card */}
          <div className={`${styles.card} card`}>
            <div className="card-body">
              <div className={`card-title ${styles["card-title-ship"]}`}>
                {this.state.toBeShipped}
              </div>
              <div className={`card-text ${styles["card-text"]}`}>
                To be shipped
              </div>
            </div>
          </div>
          {/* To be delivered card */}
          <div className={`${styles.card} card`}>
            <div className="card-body">
              <div className={`card-title ${styles["card-title-del"]}`}>
                {this.state.toBeDelivered}
              </div>
              <div className={`card-text ${styles["card-text"]}`}>
                To be delivered
              </div>
            </div>
          </div>
          <div className={`col ${styles["inv-sum-c"]}`}>
            <div className={`row ${styles["inv-sum-r"]}`}>
              <p>Inventory Summary</p>
            </div>
            <div className={`row ${styles["inv-sum-r"]}`}>
              <p className={styles["inv-sum-p"]}>Number of items: {this.getInventoryCount()}</p>
            </div>
            <div className={`row ${styles["inv-sum-r"]}`}>
              <p className={styles["inv-sum-p"]}>Price of items: ${(this.getInventoryPriceSummary()).toFixed(2)}</p>
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
            <div className={`${styles["date-range-rev"]} card`}>
              <div className="card-body">
                <div className={`${styles["date-range-ct"]}`}>
                  Number of items: {this.getSalesDetails()[0]}
                </div>
                <div className={`${styles["date-range-ct"]}`}>
                  Total Revenue: ${this.getSalesDetails()[1].toFixed(2)}
                </div>
                <div className={`${styles["date-range-ct"]}`}>
                  Total Costs: ${this.getSalesDetails()[2].toFixed(2)}
                </div>
                <div className={`${styles["date-range-ct"]}`}>
                  Profit: ${this.getSalesDetails()[3].toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-9" style={{ marginTop: "40px" }}>
            <p>
              Order details last {this.state.dateRange} days
            </p>
            <table className={`table ${styles["dash-table"]}`}>
              <thead className={`${styles["dash-table-head"]}`}>
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
