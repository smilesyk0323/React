import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

//link 대신 import를 통해 설치한 라이브러리의 CSS를 불러오도록 처리
//- node_modules에 설치한 요소들은 바로 이름을 사용하여 접근 가능
//- bootswatch css파일 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/minty/bootstrap.min.css';
import "bootstrap";

//Router는 React앱을 여러 페이지로 분할하여 사용하도록 만드는 기술
// - HashRouter는 주소에 해시(#)가 포함된다
// - BrowserRouter는 주소에 해시(#)가 포함되지 않는다
import {BrowserRouter, HashRouter} from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<HashRouter>
  <App />
</HashRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
