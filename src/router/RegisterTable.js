import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import './css/RegisterMenu.css';

export default class RegisterTable extends Component {
    constructor() {
        super();
        this.state = {
            tables: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const id = localStorage.getItem('id');
        const name = localStorage.getItem('name');
        const branch = localStorage.getItem('ph');
        const pw = localStorage.getItem('pw');
        if(!id || id < 1) {
            alert('가게 로그인 후 사용해주세요.');
            return false;
        }
        axios.post('/register/table', {
            name: name,
            branch: branch,
            pw: pw,
            tables: this.state.tables,
        })
        alert('성공적으로 테이블 등록을 완료했습니다.');

    }
    render() {
        const { tables } = this.state;
        return (
            <div className="registermenu">
                <Link to="/register"><IoMdArrowRoundBack className="backto"/></Link>
                <div className="menuheader">테이블 등록</div>
                <form className="userform" onSubmit={this.handleSubmit}>
                    <div id="tabletext">{
                        tables.map((el, i) => {
                            return <div key={i}>
                                    <input type="number" className="half" value={el.num} placeholder="table number" onChange={(e)=>this.setState({tables: tables.map((t, j) => i === j? {...t, ...{num: e.target.value}}: t)})}/>
                                    <input type="number" className="half" value={el.cap} placeholder="capacitance" onChange={(e)=>this.setState({tables: tables.map((t, j) => i === j? {...t, ...{cap: e.target.value}}: t)})}/>
                                </div>
                        })
                    }</div>
                    <input type="button" value="테이블 추가" className="buttonform" onClick={()=>this.setState({tables: this.state.tables.concat({num: '', cap: ''})})}/>
                    <input type="submit" className="buttonform" value="테이블 등록"/>
                </form>
            </div>
        );
    }
}