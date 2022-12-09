import axios from 'axios';
import React, { Component } from 'react';
import '../css/viewallitems.css';
import defaultImage from '../assets/default-placeholder.png';
import CreateItemModal from './createitemmodal';

const Card = props => (
    <div
        class="card"
        style={{ width: "175px", marginBottom: "10px", marginRight: "15px" }}
    >
        <img
            class="card-img"
            src={props.item.imagelink}
            style={{ width: "150px", height: "150px", objectFit: "contain" }}
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

        this.showItemModal = this.showItemModal.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

        this.state = {
            items: [],
            showItemModal: false
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/',)
            .then(res => {
                this.setState({ items: res.data })
            })
            .catch(err => console.log('Error: ' + err));
    }

    showItemModal() {
        this.setState({
            showItemModal: true
        })
    }

    handleModalClose() {
        this.setState({
            showItemModal: false
        })
    }

    render() {
        return (
            <div class="container" style={{ paddingTop: "10px" }}>
                <CreateItemModal show={this.state.showItemModal} handleClose={this.handleModalClose} />
                <div class='row'>
                    {this.state.items.map(item => {
                        return <Card item={item} />
                    })}
                    <div
                        class="card"
                        style={{ width: "175px", marginBottom: "10px", marginRight: "15px" }}
                    >
                        <img
                            class="card-img"
                            src={defaultImage}
                            style={{ width: "150px", height: "150px", objectFit: "contain" }}
                            alt='Default Image' />
                        <div class="card-body" style={{ textAlign: 'center', paddingTop: '40px' }}>
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={this.showItemModal}
                                style={{ margin: 'auto' }}>
                                New Item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
