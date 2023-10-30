import { useState } from 'react';
import monggu from '../assets/images/monggu3.jpg';

function Exam02(){
    //이 화면의 상태(state)는 한 개이다.
    const[size, setSize] = useState(200);

    // function small(){
    //     setSize(100);
    // }

    // function normal(){
    //     setSize(200);
    // }

    // function big(){
    //     setSize(300);
    // }

    return (
        <>
            <h1>두 번째 예제</h1>
            <button className='btn btn-info' onClick={()=>setSize(100)}>작게</button>
            <button className='btn btn-info ms-2' onClick={()=>setSize(200)}>기본</button>
            <button className='btn btn-info ms-2' onClick={()=>setSize(300)}>크게</button>
            <br/>
            <img src={monggu} width={size} height={size}/>

        </>
    );
}

export default Exam02;