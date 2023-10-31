import { useEffect, useState } from "react";


function Exam04(){

  //const[필드명, 세터메소드명] = useState(초기값);
    const [text, setText] = useState("");
    const[length, setLength] = useState(0);

    //state끼리 의존성이 생기는 경우가 있다
    //- content가 변하면 length가 변해야 한다.
    //- 수동으로 하는 것이 아니라 자동으로 변하도록 설정할 수 있다
    //- useEffect 훅 사용
    //- useEffect (함수, [감지항목]);//컨
    useEffect(()=>{
      setLength(text.length);
    },[text]);
    
      return (
        <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h3>(Q) 주말에 뭐하세요?</h3>
            <div className="form-group mb-1">
              <textarea
                className="form-control " 
                style={{ resize: "none", outline: "none"}}
                rows="5" onChange={e=>setText(e.target.value)}
                ></textarea>
            </div>
            <h6 className="text-end">
              {length} / 1000
            </h6>
          </div>
        </div>
      </div>
      );
}

export default Exam04;