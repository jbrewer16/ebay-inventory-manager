import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditOrder extends Component {

    constructor(props) {

        super(props);

        this.onChangeAmountOrdered = this.onChangeAmountOrdered.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDateSold = this.onChangeDateSold.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
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
            amountOrdered: 1,
            status: "Sold",
            dateSold: new Date(new Date().setHours(0, 0, 0, 0))
        }

    }

    componentDidMount() {
        const arr = window.location.href.split('/');
        axios.get('http://localhost:5000/orders/' + arr[arr.length - 1])
            .then(res => {
                this.setState({
                    listing: res.data.listing,
                    amountOrdered: res.data.amountOrdered,
                    status: res.data.status,
                    dateSold: new Date(res.data.datesold),
                }, () => {
                    axios.get('http://localhost:5000/listings/' + this.state.listing._id)
                    .then(res => {
                        this.setState({ listing: res.data })
                    })
                });
            })
            .catch(err => console.log('Error: ' + err));
    }

    onChangeAmountOrdered(e) {
        this.setState({
            amountOrdered: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
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
            datesold: this.state.dateSold
        }

        const listing = {
            itemnumber: this.state.listing.itemnumber,
            item: this.state.listing.item,
            originalAmount: this.state.listing.originalAmount,
            amountLeft: this.state.listing.originalAmount - this.state.amountOrdered,
            listinglink: this.state.listing.listinglink,
            status: this.state.listing.status,
            dateadded: this.state.listing.dateadded
        }

        axios.post('http://localhost:5000/listings/update/' + this.state.listing._id, listing)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));

        const arr = window.location.href.split('/');
        axios.post('http://localhost:5000/orders/update/' + arr[arr.length - 1], order)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));

        window.location = '/';

    }

    render() {
        return (
            <div className='container-sm'>
                <div className='row' style={{ paddingTop: '40px', width: '25%', margin: 'auto' }}>
                    <h3>Edit Order</h3>
                </div>
                <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
                    <p>{this.state.listing.item.itemnumber} - {this.state.listing.item.itemname}</p>
                </div>
                <div className='row'>
                    <form onSubmit={this.onSubmit}>
                        <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
                            {/* Amount ordered */}
                            <div className='form-group'>
                                <label>Amount Ordered: </label>
                                <input type='text'
                                    required
                                    readOnly={true}
                                    className='form-control'
                                    value={this.state.amountOrdered}
                                    onChange={this.onChangeAmountOrdered}
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
                                    <option value='Sold'>Sold</option>
                                    <option value='Packed'>Packed</option>
                                    <option value='Shipped'>Shipped</option>
                                    <option value='Delivered'>Delivered</option>
                                </select>
                            </div>
                        </div>
                        <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
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
                        </div>
                        <div className='row' style={{ paddingTop: '10px', width: '25%', margin: 'auto' }}>
                            <div className='form-group'>
                                <input type='submit' value='Edit Order' className='btn btn-primary' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
