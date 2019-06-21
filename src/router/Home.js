import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <Link to="/register" className="homelist">register</Link>
                <Link to="/order" className="homelist">order</Link>
                <Link to="/search" className="homelist">search</Link>
            </div>
        );
    }
}