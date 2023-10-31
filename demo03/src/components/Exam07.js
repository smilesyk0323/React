import { useEffect, useState } from "react";

const Exam07= ()=>{

    //객체로 상태 변수를 정의
    const [info, setInfo] = useState({//입력데이터
        memberId : "",
        memberPw : "",
        memberPwRe : ""
    });
    const[result, setResult] = useState({//검사결과
        memberId:false,
        memberPw:false,
        memberPwRe:false
    });
    //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
    useEffect(()=>{
        // console.log("info가 변했습니다");
        //ID검사
        const idRegex = /^[a-z][a-z0-9]{7,19}$/;
        const idMatch = idRegex.test(info.memberId);

        //PW검사
        const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
        const pwMatch = pwRegex.test(info.memberPw);

        //PW-RE검사
        const pwReMatch = info.memberPw.length > 0 &&//비밀번호 1글자 이상 && 비밀번호 == 확인값;
                                    info.memberPw === info.memberPwRe//= 3개가 똑같은/ = 2개는 비슷

        setResult({
            memberId : idMatch,
            memberPw : pwMatch,
            memberPwRe : pwReMatch
        });
        
    },[info]);


    //객체의 상태를 한 번에 변경하는 함수 구현 
    const loginInfo = (e)=>{
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        });
    };

    return(
        <>
        <div className="container-fluid">
            <form autoComplete="off">

            <div className="row text-center"><div className="col-md-10 offset-md-1">  
                <h1>회원가입</h1>
            </div></div>

            <div className="row"><div className="col-md-10 offset-md-1">              
                <label className="form-label">아이디</label><input type="text" name="memberId"
                 className={`form-control ${result.memberId ? 'is-valid' : 'is-invalid'}`}
                value={info.memberId} onChange={loginInfo}/>
                <div className="valid-feedback">멋진 아이디!</div>
                <div className="invalid-feedback">다시 입력하세요</div>
                <label className="form-label mt-2">비밀번호</label><input type="password" name="memberPw"
                className={`form-control ${result.memberPw ? 'is-valid' : 'is-invalid'}`}
                value={info.memberPw} onChange={loginInfo}/>
                <div className="valid-feedback">멋진 비번!</div>
                <div className="invalid-feedback">다시 입력하세요</div>
                <label className="form-label mt-2">비밀번호 확인</label><input type="password" name="memberPwRe" 
                className={`form-control ${result.memberPwRe ? 'is-valid' : 'is-invalid'}`}
                value={info.memberPwRe} onChange={loginInfo}/>
                <div className="valid-feedback">잘입력했어요</div>
                <div className="invalid-feedback">비밀번호랑 달라요</div>
            </div></div>

            <div className="row mt-5 text-center"><div className="col-md-10 offset-md-1">
                <button type="button" className="btn btn-primary w-100"
                    disabled={!(result.memberId && result.memberPw && result.memberPwRe)}>가입하기</button>
            </div></div>

            </form>
        </div>
        </>
    );
};

export default Exam07;