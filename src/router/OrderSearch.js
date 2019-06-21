import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack, IoMdClipboard } from 'react-icons/io';
import axios from 'axios';
import './css/OrderSearch.css';

export default class OrderSearch extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        const { search } = this.state;
        const el = React.createElement;
        axios.post('/order/store', {
            search: search,
        })
        .then(res => {
            const lists = res.data.map((ta, index) => {
                return el('tr', {key: index}, el('th', {className: ''}, index+1), el('td', {}, ta.sname), el('td', {}, ta.branch), el('td', {}, <IoMdClipboard onClick={()=>window.location.href=`/order/menu/:${ta.sid}`}/>));
            });
            ReactDOM.render(lists, document.getElementById('listtable'));
        });
    }
    render() {
        const { search } = this.state;
        return (
            <div className="ordersearch">
                <Link to="/order"><IoMdArrowRoundBack className="backto"/></Link>
                <div className="searchhead">매장 이름 또는 지점으로 검색</div>
                <form className="search-in" onSubmit={this.handleSubmit}>
                    <input type="text" name="search" value={search} onChange={this.onChange} className="searchinput" />
                    <input type="submit" className="searchbtn" value="search" />
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="tableindex">#</th>
                            <th className="tableindex">Name</th>
                            <th className="tableindex">Branch</th>
                            <th className="tableindex">Order</th>
                        </tr>
                    </thead>
                    <tbody id="listtable" className="tablebody">
                    </tbody>
                </table>
            </div>
        );
    }
}