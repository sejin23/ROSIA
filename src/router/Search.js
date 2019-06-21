import React, { Component } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './css/Search.css';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: false,
            isUser: true,
            record: [],
            time: ''
        }
    }
    componentDidMount() {
        const id = localStorage.getItem('id');
        if(id === '0') this.setState({isLogin: true, isUser: true, sales: 0});
        else if(id === '1') this.setState({isLogin: true, isUser: false, sales: 0});
        else {
            this.setState({isLogin: false, isUser: true, sales: 0});
            return false;
        }
        const name = localStorage.getItem('name');
        const ph = localStorage.getItem('ph');
        const pw = localStorage.getItem('pw');
        if(id === '0') {
            axios.post('/search/user', {
                name: name,
                phone: ph,
                pw: pw
            }).then(res => {
                if(res.data === 'fail') this.setState({record: []});
                else res.data.map(el => this.setState({
                        time: moment().format('YY-MM-DD'),
                        record: this.state.record.concat({sname: el.sname, mname: el.mname, price: el.price, count: el.count, date: el.dates})
                    }));
            });
        } else {
            axios.post('/search/store', {
                name: name,
                branch: ph,
                pw: pw
            }).then(res => {
                if(res.data === 'fail') this.setState({record: []});
                else res.data.map(el => this.setState({
                    time: moment().format('YY-MM-DD'),
                    record: this.state.record.concat({mname: el.mname, price: el.price, count: el.count, table: el.tid, date: el.dates})
                }));
            });
        }
    }
    render() {
        const { isLogin, isUser, record, time } = this.state;
        return (
            <div className="search">
                <Link to="/"><IoMdArrowRoundBack className="backto"/></Link>
                <div>Search</div>
                {isLogin?
                    <div className="time">
                        <FiChevronLeft size="30px" onClick={()=>this.setState({time: moment(moment(this.state.time, "YY-MM-DD").subtract(1, 'days').toDate()).format('YY-MM-DD')})}/>
                        <div>{time}</div>
                        <FiChevronRight size="30px" onClick={()=>this.setState({time: moment(moment(this.state.time, "YY-MM-DD").add(1, 'days').toDate()).format('YY-MM-DD')})}/>
                    </div>:
                    null
                }
                {isLogin?
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="tableindex">#</th>
                                <th className="tableindex">{isUser?'store':'table'}</th>
                                <th className="tableindex">menu</th>
                                <th className="tableindex">price</th>
                                <th className="tableindex">count</th>
                                <th className="tableindex">date</th>
                            </tr>
                        </thead>
                        {isUser?
                            <tbody className="tablesearch">{record.map((el, index) => moment(time, "YY-MM-DD").diff(moment(el.date), 'days') === 0?
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el.sname}</td>
                                    <td>{el.mname}</td>
                                    <td>{el.price}</td>
                                    <td>{el.count}</td>
                                    <td>{moment(el.date).format('YY.MM.DD')}</td>
                                </tr>: null)}
                            </tbody>:
                            <tbody className="tablesearch">{record.map((el, index) => moment(time, "YY-MM-DD").diff(moment(el.date), 'days') === 0?
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el.table}</td>
                                    <td>{el.mname}</td>
                                    <td>{el.price}</td>
                                    <td>{el.count}</td>
                                    <td>{moment(el.date).format('YY.MM.DD')}</td>
                                </tr>:null)}
                            </tbody>
                        }
                    </table>:
                    <div className="pllogin">로그인 후 이용해주세요.</div>
                }
            </div>
        );
    }
}