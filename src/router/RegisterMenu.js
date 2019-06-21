import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import './css/RegisterMenu.css';

export default class RegisterMenu extends Component {
    constructor() {
        super();
        this.state = {
            menu: '',
            price: '',
            flavor: '',
            explain: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    handleSubmit = (e) => {
        e.preventDefault();
        const { menu, flavor, price, explain } = this.state;
        const id = localStorage.getItem('id');
        if(id !== '1') {
            alert('가게 로그인 후 이용해주세요.');
            return false;
        }
        const name = localStorage.getItem('name');
        const branch = localStorage.getItem('ph');
        const pw = localStorage.getItem('pw');
        if(menu === "" || price === "") {
            alert("정보를 다시 확인해주세요.");
            return false;
        } 
        axios.post('/register/menu', {
            name: name,
            branch: branch,
            pw: pw,
            menu: menu,
            flavor: flavor,
            price: price,
            explain: explain
        })
        .then(res => {
            if(res.data) {
                this.setState({
                    menu: '',
                    price: '',
                    flavor: '',
                    explain: '',
                });
                alert('메뉴가 등록되었습니다.');
            } else
                alert('정보를 다시 확인해주세요.');
        });
    }
    render() {
        const { menu, flavor, price, explain } = this.state;
        return (
            <div className="registermenu">
                <Link to="/register"><IoMdArrowRoundBack className="backto"/></Link>
                <div className="menuheader">메뉴 등록</div>
                <form className="userform" onSubmit={this.handleSubmit}>
                    <input type="text" name="menu" value={menu} onChange={this.onChange} className="full" placeholder="menu name"/>
                    <input type="text" name="flavor" value={flavor} onChange={this.onChange} className="half" placeholder="menu flavor"/>
                    <input type="number" name="price" value={price} onChange={this.onChange} className="half" placeholder="menu price"/>
                    <textarea className="full" name="explain" value={explain} onChange={this.onChange} placeholder="explaination"/>
                    <input type="submit" className="buttonform" value="메뉴 등록"/>
                </form>
            </div>
        );
    }
}