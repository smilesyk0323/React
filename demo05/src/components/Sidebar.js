import React, { useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { levelState, userState } from '../recoil';
import "./styles.css";

import {AiOutlineMenu, AiOutlineHome} from "react-icons/ai";
import {BiMessageRoundedError} from "react-icons/bi";
import {MdApproval} from "react-icons/md";
import {BsFillPersonCheckFill} from "react-icons/bs";
import {BiChalkboard} from "react-icons/bi";
import {MdPayment} from "react-icons/md";
import {BiLogOut} from "react-icons/bi";
import {RiAdminLine} from "react-icons/ri";


import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS 파일 임포트
import 'bootstrap/dist/js/bootstrap.bundle.min'; // 부트스트랩 JavaScript 파일 임포트


const Sidebar = (props) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const sidebarStyle = {
        width: isSidebarOpen ? '200px' : '100px',
        transition: 'width 0.5s',
    };

    return (
        <div>

            <div className="side-bar1 row"style={sidebarStyle}>
            <div className="icon mb-5">
                    <div onClick={toggleSidebar}>
                        <AiOutlineMenu className="me-3 mt-1" size="30" />
                    </div>
                </div>
                
                <div className="mb-3">
                    <NavLink to="#" >
                        <label className="me-4">홈</label>
                        <AiOutlineHome className="text-white me-3 mt-1" size="35" />
                    </NavLink> 
                </div>
                <div className="mb-3 ">
                    <NavLink to="#">
                        <label className="me-4">공지사항</label>
                        <BiMessageRoundedError className="text-white me-3 mt-1" size="35" />
                    </NavLink> 
                </div>
                <div className="mb-3">
                    <NavLink to="#">
                        <label className="me-4">전자결재</label>
                        <MdApproval className="text-white me-3 mt-1" size="35" />
                    </NavLink> 
                </div>
                <div className="mb-3">
                    <NavLink to="#">
                      <label className="me-4">주소록</label>
                        <BsFillPersonCheckFill className="text-white me-3 mt-1" size="35" />
                    </NavLink>
                </div> 
                <div className="mb-3">
                    <NavLink to="#">
                        <label className="me-4">TV</label>
                        <BiChalkboard className="text-white me-3 mt-1" size="35" />
                    </NavLink> 
                </div>
                <div className="mb-3">
                    <NavLink to="#">
                        <label className="me-4">카드</label>
                        <MdPayment className="text-white me-3 mt-1" size="35" />
                    </NavLink> 
                </div>
                <div className="mb-3">
                    <NavLink to="#">
                        <label className="me-4">사직서</label>
                        <BiLogOut className="text-white me-3 mt-1" size="35" />
                    </NavLink> 
                </div>

                {/* 관리자일 때만 나오기 */}
                <div className="mb-3">
                    <NavLink to="#">
                        <label className="me-4">관리자</label>
                        <RiAdminLine className="text-white me-3 mt-1" size="35" />
                    </NavLink> 
                </div>

                <div className='row'>
                    <div className='col-6 offset-6'>
                        <div className="sidebar-menu  me-1">
    
                                <button className='btn btn-primary'>로그인</button>
                                <button className='btn btn-primary'>로그아웃</button>

                        </div>
                    </div>
                </div>
            </div>

            </div>

    );
}
export default Sidebar;