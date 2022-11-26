import axios from 'axios';
import React, { Component } from 'react'

export default class ViewItem extends Component {

    constructor(props) {
        super(props);

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
        const arr = window.location.href.split('/');
        axios.get('http://localhost:5000/items/' + arr[arr.length - 1])
            .then(res => {
                this.setState({
                    itemnumber: res.data.itemnumber,
                    itemname: res.data.itemname,
                    category: res.data.category,
                    price: res.data.price,
                    cost: res.data.cost,
                    shippingcost: res.data.shippingcost,
                    fees: res.data.fees,
                    imagelink: res.data.imagelinks
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(this.state.itemnumber);

    }

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    render() {
        return (
            <div>
                <h1>{this.state.itemname}</h1>
                <p>Item Number: {this.state.itemnumber}</p>
                <p>Category: {this.state.category}</p>
                <p>Price: {this.formatter.format(this.state.price)}</p>
                <p>Cost: {this.formatter.format(this.state.cost)}</p>
                <p>Shipping Cost: {this.formatter.format(this.state.shippingcost)}</p>
                <p>Fees: {this.formatter.format(this.state.fees)}</p>
                <p>Image: {this.state.imagelink}</p>
            </div>
        )
    }
}
