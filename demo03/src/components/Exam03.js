import { useState } from "react";

//const Exam03 = ()=>{};
function Exam03(){

    const [money, setMoney] = useState(0);
    const format = money.toLocaleString('en-US');

    return(
        <>
            <h1>세 번째 예제</h1>
            <h3>출금 금액 : {format}원</h3>
            <br/>
            <button className="btn btn-outline-primary" onClick={()=>setMoney(money + 100000)}>10만원</button>
            <button className="btn btn-outline-primary ms-2" onClick={()=>setMoney(money + 50000)}>5만원</button>
            <button className="btn btn-outline-primary ms-2" onClick={()=>setMoney(money + 10000)}>1만원</button>
            <button className="btn btn-outline-primary ms-2" onClick={()=>setMoney(0)}>초기화</button>
            <br/>
            <input type="range" min="0" max="10000000" step="10000" value={money} onChange={e=>setMoney(parseInt(e.target.value))}/>
        </>
    );
}

export default Exam03;