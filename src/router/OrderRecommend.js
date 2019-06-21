import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { IoMdArrowRoundBack, IoMdClipboard } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class OrderRecommend extends Component {
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
        axios.post('/order/menu', {
            search: search,
        }).then(res => {
            const lists = res.data.map((ta, index) => {
                return el('tr', {key: index},
                    el('th', {}, index+1),
                    el('td', {}, ta.sname),
                    el('td', {}, ta.branch),
                    el('td', {}, <IoMdClipboard onClick={()=>window.location.href=`/order/menu/:${ta.sid}`} />)
                );
            });
            ReactDOM.render(lists, document.getElementById('listtable'));
        });
    }
    render() {
        return (
            <div className="ordersearch">
                <Link to="/order"><IoMdArrowRoundBack className="backto"/></Link>
                <div className="searchhead">메뉴 이름으로 검색</div>
                <form className="search-in" onSubmit={this.handleSubmit}>
                    <input type="text" name="search" className="searchinput" onChange={this.onChange}/>
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