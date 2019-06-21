import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FiMinus, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import moment from 'moment';

class OrderMenu extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            table: 0,
        }
        this.orderMenus = this.orderMenus.bind(this);
    }
    componentDidMount() {
        const { match } = this.props;
        axios.post('/order/list', {
            sid: match.params.name.split(':')[1]
        }).then(res => {
            res.data.map(ta => 
                this.setState({
                    data: this.state.data.concat({index: ta.mid, name: ta.mname, flavor: ta.flavor, price: ta.price, num: 0}),
                })
            );
        });
    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    addNumber = (i, inc) => {
        const { data } = this.state;
        if(data[i-1].num + inc < 0) return;
        this.setState({
            data: data.map(el => i === el.index? {...el, ...{num: el.num+inc}}: el)
        });
    }
    totalPrice = () => {
        const { data } = this.state;
        var total = 0;
        data.map(el => total += el.price * el.num);
        return total;
    }
    orderMenus = () => {
        const { match } = this.props;
        const { data, table } = this.state;
        const id = localStorage.getItem('id');
        const name = localStorage.getItem('name');
        const ph = localStorage.getItem('ph');
        const pw = localStorage.getItem('pw');
        if(id !== '0') {
            alert('사용자 로그인 후 이용해주세요.');
            return false;
        }
        var mid = [];
        data.map(el => el.num > 0? mid = mid.concat({num: el.num, mid: el.index, price: el.price}): null);
        axios.post('/order/request', {
            sid: match.params.name.split(':')[1],
            user: [{name, ph, pw}],
            mid: mid,
            tid: table,
            date: moment().format('YYYY-MM-DD')
        }).then(res => {
            if(res.data === 'success') {
                window.location.href = '/order/success';
            } else {
                alert(res.data);
            }
        });
    }
    render() {
        const { data, table } = this.state;
        return (
            <div className="ordersearch">
                <Link to="/order"><IoMdArrowRoundBack className="backto"/></Link>
                <table className="table tablemargin">
                    <thead>
                        <tr>
                            <th className="tableindex">#</th>
                            <th className="tableindex">Menu</th>
                            <th className="tableindex">Flavor</th>
                            <th className="tableindex">Price</th>
                            <th className="tableindex" colSpan="3">Number</th>
                        </tr>
                    </thead>
                    <tbody className="tablebody">
                        {data.map((el) => {
                            return (<tr key={el.index}>
                                <td>{el.index}</td>
                                <td>{el.name}</td>
                                <td>{el.flavor}</td>
                                <td>{el.price}</td>
                                <td><FiMinus onClick={()=>this.addNumber(el.index, -1)}/></td>
                                <td>{el.num}</td>
                                <td><FiPlus onClick={()=>this.addNumber(el.index, 1)}/></td>
                            </tr>);
                        })}
                    </tbody>
                </table>
                <div className="totalprice">
                    <div className="tablenum">
                        <div>테이블 번호 : </div>
                        <input type="number" name="table" value={table} onChange={this.onChange}/>
                    </div>
                    <div className="orderprice">
                        <div>총 가격 : </div>
                        <div>{this.totalPrice()}</div>
                        <div onClick={this.orderMenus}>주문하기</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderMenu;