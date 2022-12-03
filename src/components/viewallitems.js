import axios from 'axios';
import React, { Component } from 'react';
import '../css/viewallitems.css'

const Card = props => (
    <div
        class="card"
        style={{ width: "275px", marginBottom: "10px", marginRight: "10px" }}
    >
        <img
            class="card-img"
            src={props.item.imagelink}
            style={{ width: "250px", height: "250px", objectFit: "contain" }}
            alt='Card image cap' />
        <div class="card-body">
            <div class="card-title">
                <a href={'/item/' + props.item._id}>
                    {props.item.itemname}
                </a>
            </div>
            <div class="card-text">{props.item.itemnumber}</div>
            <div class="card-subtitle">{props.item.category}</div>
        </div>
    </div>
);

export default class ViewAllItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/',)
            .then(res => {
                this.setState({ items: res.data })
            })
            .catch(err => console.log('Error: ' + err));
    }

    render() {
        return (
            <div class="container" style={{ paddingTop: "10px" }}>
                <div class='row'>
                    {this.state.items.map(item => {
                        return <Card item={item}/>
                    })}
                </div>
            </div>
        )
    }
}
