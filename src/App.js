import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiX } from 'react-icons/fi';
import Home from './router/Home';
import Register from './router/Register';
import RegisterList from './router/RegisterList';
import RegisterMenu from './router/RegisterMenu';
import RegisterTable from './router/RegisterTable';
import Order from './router/Order';
import OrderSearch from './router/OrderSearch';
import OrderRecommend from './router/OrderRecommend';
import OrderMenu from './router/OrderMenu';
import OrderSuccess from './router/OrderSuccess';
import Search from './router/Search';
import Header from './component/Header';
import axios from 'axios';
import * as actions from './actions';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: false,
      user: true,
      name: '',
      phone: '',
      pw: ''
    }
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.handleStoreSubmit = this.handleStoreSubmit.bind(this);
  }
  componentDidMount() {
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const phone = localStorage.getItem('ph');
    const pw = localStorage.getItem('pw');
    const { pendLogin, successLogin } = this.props;
    pendLogin(true);
    successLogin(false);
    if(id === '0'){
      axios.post('/login/user', {
        name: name,
        phone: phone,
        pw: pw,
      }).then(res => {
        if(res.data) successLogin(true);
        pendLogin(false);
      });
    } else {
      axios.post('/login/store', {
        name: name,
        branch: phone,
        pw: pw,
      }).then(res => {
        if(res.data) successLogin(true);
        pendLogin(false);
      });
    }
  }
  onChange = (e) => this.setState({[e.target.name]: e.target.value});
  handleUserSubmit = (e) => {
    e.preventDefault();
    const { name, phone, pw } = this.state;
    axios.post('/login/user', {
      name: name,
      phone: phone,
      pw: pw,
    }).then(res => {
        if(res.data) {
          localStorage.setItem('id', '0');
          localStorage.setItem('name', name);
          localStorage.setItem('ph', phone);
          localStorage.setItem('pw', pw);
          window.location.reload();
        } else {
          alert('로그인 정보를 다시 확인해주세요.');
        }
    });
  }
  handleStoreSubmit = (e) => {
    e.preventDefault();
    const { name, phone, pw } = this.state;
    axios.post('/login/store', {
      name: name,
      branch: phone,
      pw: pw,
    }).then(res => {
        if(res.data) {
          localStorage.setItem('id', 1);
          localStorage.setItem('name', name);
          localStorage.setItem('ph', phone);
          localStorage.setItem('pw', pw);
          window.location.reload();
        } else {
          alert('로그인 정보를 다시 확인해주세요.');
        }
    });
  }
  render() {
    const { isLoginSuccess, successLogin } = this.props;
    const { display, user, name, phone, pw } = this.state;
    return (
      <BrowserRouter>
        {!isLoginSuccess? <div className="login" onClick={()=>this.setState({display: true})}>로그인</div>: <div className="logout" onClick={()=>{successLogin(false);localStorage.clear();window.location.reload();}}>로그아웃</div>}
        {display?
          <div className="displaylogin">
            <FiX className="logclose" onClick={()=>this.setState({display: false})}/>
            {user?
              <div>
                <div>사용자 로그인</div>
                <input type="text" className="full" name="name" onChange={this.onChange} value={name} placeholder="name"/>
                <input type="number" className="full" name="phone" onChange={this.onChange} value={phone} placeholder="phone"/>
                <input type="password" className="full" name="pw" onChange={this.onChange} value={pw} placeholder="password"/>
                <div className="buttonform" onClick={this.handleUserSubmit}>LOGIN</div>
                <div className="tostore" onClick={()=>{this.setState({user: false, name: '', phone: '', pw: ''})}}>가게 로그인으로 바꾸기</div>
              </div>
            :<div>
              <div>가게 로그인</div>
              <input type="text" className="half" name="name" onChange={this.onChange} value={name} placeholder="name"/>
              <input type="text" className="half" name="phone" onChange={this.onChange} value={phone} placeholder="branch"/>
              <input type="password" className="full" name="pw" onChange={this.onChange} value={pw} placeholder="password"/>
              <div className="buttonform" onClick={this.handleStoreSubmit}>LOGIN</div>
              <div className="tostore" onClick={()=>this.setState({user: true, name: '', phone: '', pw: ''})}>사용자 로그인으로 바꾸기</div>
            </div>
            }
          </div>:
          null
        }
        <Header />
        <div className="round">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={RegisterList}/>
            <Route path="/register/component" component={Register}/>
            <Route path="/register/menu" component={RegisterMenu}/>
            <Route path="/register/table" component={RegisterTable}/>
            <Route exact path="/order" component={Order}/>
            <Route path="/order/search" component={OrderSearch}/>
            <Route path="/order/recommend" component={OrderRecommend}/>
            <Route path="/order/menu/:name" component={OrderMenu}/>
            <Route path="/order/success" component={OrderSuccess}/>
            <Route exact path="/search" component={Search}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  pendLogin: PropTypes.func,
  successLogin: PropTypes.func,
};

App.defaultProps = {
  pendLogin: () => console.warn('pending Login not define'),
  successLogin: () => console.warn('success Login not define'),
};

const mapStateToProps = (state) => ({
  isLoginPending: state.isLoginPending,
  isLoginSuccess: state.isLoginSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  pendLogin: (msg) => dispatch(actions.loginPending(msg)),
  successLogin: (msg) => dispatch(actions.loginSuccess(msg)),
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
