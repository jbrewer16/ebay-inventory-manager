import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateListingModal extends Component {

    constructor(props) {

        super(props);

        this.onChangeItem = this.onChangeItem.bind(this);
        this.onChangeItemNumber = this.onChangeItemNumber.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeListingLink = this.onChangeListingLink.bind(this);
        this.onChangeDateAdded = this.onChangeDateAdded.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            show: props.show,
            itemnumber: 0,
            originalAmount: 0,
            amountLeft: 0,
            listinglink: "",
            //Status will always initially be "Open", "Complete" when all items are sold
            status: "Open",
            //Doing just "new Date()" causes the date to be set one day ahead, my best
            //guess is it's a timezone issue, setting the hours to 0 seems to fix it
            dateadded: new Date(new Date().setHours(0,0,0,0)),
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
                        itemnumber: response.data[response.data.length - 1].itemnumber,
                        item: response.data[response.data.length - 1]
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
            originalAmount: e.target.value,
            amountLeft: e.target.value
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

    onSubmit(e) {
        e.preventDefault();

        const listing = {
            item: this.state.item,
            originalAmount: this.state.originalAmount,
            amountLeft: this.state.amountLeft,
            listinglink: this.state.listinglink,
            status: this.state.status,
            dateadded: this.state.dateadded,
        }

        axios.post('http://localhost:5000/listings/add', listing)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));

        window.location = '/listings';

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Listing</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        {/* Item Number */}
                        <div className='form-group'>
                            <label>Item Number: </label>
                            <select ref='userInput'
                                required
                                className='form-control'
                                value={this.state.itemnumber}
                                onChange={this.onChangeItem}>
                                {
                                    [...this.state.items].reverse().map(function (item) {
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
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='form-group'>
                            <input type='submit' value='Create Listing' className='btn btn-primary' />
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
