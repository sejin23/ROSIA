import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const RegisterList = () => {
    return (
        <div className="order">
            <Link to='/'><IoMdArrowRoundBack className="backto" /></Link>
            <Link to='/register/component' className="orderby">가게/사용자 등록</Link>
            <Link to='/register/menu' className="orderby">메뉴 등록</Link>
            <Link to='/register/table' className="orderby">좌석 등록</Link>
        </div>
    );
}

export default RegisterList;