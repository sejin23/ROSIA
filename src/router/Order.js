import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import './css/Order.css';

export default class Order extends Component {
    render() {
        return (
            <div className="order">
                <Link to="/"><IoMdArrowRoundBack className="backto"/></Link>
                <Link to="/order/search" className="orderby">매장 검색</Link>
                <Link to="/order/recommend" className="orderby">추천 매장</Link>
            </div>
        );
    }
}