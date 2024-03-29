import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Book from './components/Book';
import Pocketmon from './components/Pocketmon';
import Home from './components/Home';
import Menu from './components/Menu';
import BookInfinite from './components/BookInfinite';
import './App.css';
import { useState } from 'react';
// import "./components/styles.css";
import Sidebar from './components/Sidebar';
import {CgProfile} from "react-icons/cg";
import {BsFillBellFill} from "react-icons/bs";
import {RiKakaoTalkFill} from "react-icons/ri";
import TeamUpLogo from './components/images/TeamUpLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS 파일 임포트
import 'bootstrap/dist/js/bootstrap.bundle.min'; // 부트스트랩 JavaScript 파일 임포트
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SalList from './components/SalList';






function App() {
  const location = useLocation();
  const [show, setShow] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  return (
    <div className="container-fluid">
      {/* 상단 메뉴 영역 */}
      <Sidebar />
      
      {/* 본문 영역 */}
       <div className='row'>
        <div className=' col-sm-10 offset-sm-1'>
        <div className='col'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/pocketmon" element={<Pocketmon />} />
            <Route path="/book" element={<Book />} />
            <Route path="/book2" element={<BookInfinite />} />
          </Routes>
        </div>
      </div>
                {/* <div className="main-content container-fluid">

                  <div className='row'>
                    <div className='col-10 offset-1 me-5'>

                  <div className='row '>
                      <div className='col-8 me-auto mt-3'>
                        <Navbar.Brand href="#home">
                          <img src={TeamUpLogo} alt="TemaUpLog" width={100}/>
                          <Button onClick={handleShow} className=" btn btn-primary">조직도</Button>
                          </Navbar.Brand>
                      </div>

                    <div className='col-4  'style={{  padding:0, marginRight: 'auto !important'}}>
                      <div className='row'><div className='col d-flex ml-auto justify-content-between align-items-center text-end ' style={{  padding:0}}>
                              <div className='col-2 offset-6 mt-1 me-1'>
                              <RiKakaoTalkFill className=" me-3 " size="45"style={{color:'#218C74'}}/>
                              </div>
                              <div className='col-2 mt-1'>
                              <BsFillBellFill className="me-3" size="40"style={{color:'#218C74'}}/>
                              </div>
                              <div className='col-2'>
                                <Navbar expand="sm" className="bg-body-white ">
                                    <Nav className="bg-body-primary ">
                                        <NavDropdown style={{padding:0}} title={<CgProfile className="me-3" size={50}style={{color:'#218C74'}} />} id="basic-nav-dropdown">  
                                        <NavLink  className={`nav-link ${location.pathname === '/salList' ? 'active' : ''}`} to='/salList'>
                                            <NavDropdown.Item className={`nav-link ${location.pathname === '/salList' ? 'active' : ''}`} href='/salList'>급여내역</NavDropdown.Item>
                                          </NavLink>                                  
                                            <NavDropdown.Item href="#action/3.2"> Another action</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar>
                              </div>
                      </div></div>                     
                    </div>

                    </div>
                  </div>


                    </div>
                    {/* 본문 */}

                          {/* <div className='row'>
                          <div className=' col-md-10 offset-md-1'> 
                              <Routes>
                                <Route path="/salList" element={<SalList/>}></Route>
                              </Routes>
                          </div>
                        </div> */}

                {/* 조직도 offcanvas  */}

                        {/* <>
                          
                          <Offcanvas show={show} onHide={handleClose} placement='end'>
                            <Offcanvas.Header closeButton>
                              <Offcanvas.Title>조직도</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                             조직도 자리 
                            </Offcanvas.Body>
                          </Offcanvas>
                        </> */}

                {/* <div className='row'><div className='col'>
                    <Emp/>
                </div></div> */}
            </div> 



    </div>
  );
}

export default App;
