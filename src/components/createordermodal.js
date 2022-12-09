import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateOrderModal extends Component {

    constructor(props) {
        super(props);

        this.onChangeListing = this.onChangeListing.bind(this);
        this.onChangeListingId = this.onChangeListingId.bind(this);
        this.onChangeAmountOrdered = this.onChangeAmountOrdered.bind(this);
        this.onChangeDateSold = this.onChangeDateSold.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            listings: [],
            listing: {
                itemnumber: 0,
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
                originalAmount: 0,
                amountLeft: 0,
                listinglink: "",
                status: "",
                dateadded: new Date(new Date().setHours(0, 0, 0, 0))
            },
            listingId: 0,
            amountOrdered: 1,
            status: "Sold",
            dateSold: new Date(new Date().setHours(0, 0, 0, 0))
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/listings/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        listings: response.data.map(listing => listing),
                    }, () => {
                        let i = 0;
                        let validReached = false;
                        while((i < this.state.listings.length) && validReached === false) {
                            if(this.state.listings[i].amountLeft > 0) {
                                this.setState({
                                    listingId: this.state.listings[i]._id,
                                    listing: this.state.listings[i]
                                });
                                validReached = true;
                            }
                            i++;
                        }
                    });
                }
            });
    }

    onChangeListing(e) {
        this.setState({
            listing: JSON.parse(e.target.value)
        });
        this.onChangeListingId(e);
    }

    onChangeListingId(e) {
        this.setState({
            listingId: e.target.value
        });
    }

    onChangeAmountOrdered(e) {
        this.setState({
            amountOrdered: e.target.value
        });
    }

    onChangeDateSold(d) {
        this.setState({
            dateSold: d
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const order = {
            listing: this.state.listing,
            amountOrdered: this.state.amountOrdered,
            status: this.state.status,
            datesold: this.state.dateSold,
        }

        const listing = {
            itemnumber: this.state.listing.itemnumber,
            item: this.state.listing.item,
            originalAmount: this.state.listing.originalAmount,
            amountLeft: this.state.listing.amountLeft - this.state.amountOrdered,
            listinglink: this.state.listing.listinglink,
            status: ((this.state.listing.amountLeft - this.state.amountOrdered) === 0)
                        ? "Complete"
                        : this.state.listing.status,
            dateadded: this.state.listing.dateadded
        }

        axios.post('http://localhost:5000/listings/update/' + this.state.listing._id, listing)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));

        axios.post('http://localhost:5000/orders/add', order)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));

        window.location = '/listings';

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Order</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        {/* Listing */}
                        <div className='form-group'>
                            <label>Listing: </label>
                            <select
                                // ref='userInput'
                                required
                                className='form-control'
                                value={this.state.listingId}
                                onChange={this.onChangeListing}>
                                {
                                    this.state.listings.map(function (listing) {
                                        if (listing.amountLeft > 0) {
                                            return <option
                                                key={listing._id}
                                                value={JSON.stringify(listing)}>
                                                {listing.item.itemnumber} - {listing.item.itemname}
                                            </option>
                                        }
                                    })
                                }
                            </select>
                        </div>
                        {/* Amount ordered */}
                        <div className='form-group'>
                            <label>Amount Ordered: </label>
                            <select
                                required
                                className='form-control'
                                value={this.state.amountOrdered}
                                onChange={this.onChangeAmountOrdered}>
                                {
                                    [...Array(Number(this.state.listing.amountLeft))].map((x, i) => {
                                        return <option
                                            key={(i + 1)}
                                            value={(i + 1)}>
                                            {(i + 1)}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        {/* Date Sold */}
                        <div className='form-group'>
                            <label>Date Sold: </label>
                            <div>
                                <DatePicker
                                    selected={this.state.dateSold}
                                    onChange={this.onChangeDateSold}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='form-group'>
                            <input type='submit' value='Create Order' className='btn btn-primary' />
                        </div>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        )
    }
}
