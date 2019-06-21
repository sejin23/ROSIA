import React, { Component } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Register.css';

class Userform extends Component {
    constructor() {
        super();
        this.state = {
            usname: '',
            usphone: '',
            uspw: '',
            uscon: ''
        }
        this.handleSubmit = this.handleSubmit.bind();
        this.onChange = this.onChange.bind();
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    handleSubmit = (e) => {
        e.preventDefault();
        const { usname, usphone, uspw, uscon } = this.state;
        if(usname === "" || usphone === "" || uspw === "" || uspw !== uscon) {
            alert("정보를 다시 확인해주세요.");
            return false;
        }
        axios.post('/register/user', {
            name: usname,
            phone: usphone,
            pw: uspw
        })
        .then(res => {
            if(!res.data) alert('정보를 다시 확인해주세요.');
            else {
                localStorage.setItem('name', usname);
                localStorage.setItem('ph', usphone);
                localStorage.setItem('pw', uspw);
                window.location.href = '/register';
            }
        });
    }
    render() {
        return (
            <form className="userform" onSubmit={this.handleSubmit}>
                <input type="text" name="usname" onChange={this.onChange} className="full" placeholder="User name" />
                <input type="tel" name="usphone" onChange={this.onChange} className="full" placeholder="User phone number (except '-')" />
                <input type="password" name="uspw" onChange={this.onChange} className="full" placeholder="Register Password" />
                <input type="password" name="uscon" onChange={this.onChange} className="full" placeholder="Confirm Password" />
                <input type="submit" className="buttonform" value="register" />
            </form>
        );
    }
}

class Storeform extends Component {
    constructor() {
        super();
        this.state = {
            stname: '',
            stbranch: '',
            staddr: '',
            stpw: '',
            stcon: ''
        }
        this.handleSubmit = this.handleSubmit.bind();
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { stname, stbranch, staddr, stpw, stcon } = this.state;
        if(stname === "" || stbranch === "" || staddr === "" || stpw === "" || stpw !== stcon) {
            alert("정보를 다시 확인해주세요.");
            return false;
        }
        axios.post('/register/store', {
            name: stname,
            branch: stbranch,
            addr: staddr,
            pw: stpw
        })
        .then(res => {
            if(!res.data) alert('정보를 다시 확인해주세요.');
            else window.location.href = '/register';
        });
    }
    render() {
        const { stname, stbranch, staddr, stpw, stcon } = this.state;
        return (
            <form className="userform" onSubmit={this.handleSubmit}>
                <input type="text" name="stname" className="half" value={stname} onChange={this.onChange} placeholder="Store name"/>
                <input type="text" name="stbranch" className="half" value={stbranch} onChange={this.onChange} placeholder="Store branch"/>
                <p>location</p>
                <input type="text" name="staddr" className="full" value={staddr} onChange={this.onChange} placeholder="Road name address"/>
                <input type="password" name="stpw" className="full" value={stpw} onChange={this.onChange} placeholder="Register Password"/>
                <input type="password" name="stcon" className="full" value={stcon} onChange={this.onChange} placeholder="Confirm Password"/>
                <input type="submit" className="buttonform" value="register"/>
            </form>
        );
    }
}

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            isUser: true,
        }
    }
    render() {
        const { isUser } = this.state;
        return (
            <div className="register">
                <Link to="/register"><IoMdArrowRoundBack className="backto" /></Link>
                Register
                <div className="registertab">
                    <div id="user" className={isUser? "selectedTab": ""} onClick={()=>this.setState({isUser: true})}>User</div>
                    <div id="store" className={isUser? "": "selectedTab"} onClick={()=>this.setState({isUser: false})}>Store</div>
                </div>
                {isUser? <Userform />: <Storeform />}
            </div>
        );
    }
}