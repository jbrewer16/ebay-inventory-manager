import React, { Component } from 'react'
import { BsFillTrashFill, BsFillPencilFill, BsLink45Deg } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Listing = props => (
  <tr>
    <td><a href={'/item/' + props.listing.item._id}>{props.listing.item.itemname}</a></td>
    <td>{props.listing.item.category}</td>
    <td>{props.listing.amount}</td>
    <td>$
      {
        ((Number(props.listing.item.cost) +
          Number(props.listing.item.shippingcost) +
          Number(props.listing.item.fees))
        *
        Number(props.listing.amount)).toFixed(2)
      }
    </td>
    <td>${props.listing.item.price}</td>
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
    <td><a href={props.listing.listinglink} target="_blank"><BsLink45Deg /></a></td>
    <td>{props.listing.status}</td>
    <td>{props.listing.dateadded.substring(0, 10)}</td>
    <td>{props.listing.datesold.substring(0, 10)}</td>
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

    this.state = { listings: [] }

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

  listingsList() {
    return this.state.listings.map(currentListing => {
      return <Listing
        listing={currentListing}
        deleteListing={this.deleteListing}
        key={currentListing._id}
      />;
    })
  }

  render() {
    return (
      <div>
        <h3>Listings</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Total Costs</th>
              <th>Sale Price</th>
              <th>Final Profit</th>
              <th>Link</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Date Sold</th>
            </tr>
          </thead>
          <tbody>
            {this.listingsList()}
          </tbody>
        </table>
      </div>
    )
  }
}
