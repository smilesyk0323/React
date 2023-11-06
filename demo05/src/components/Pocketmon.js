import { useEffect, useState } from "react";
import axios from "axios";

const Pocketmon = (props)=>{
    const [pocketmonList, setPocketmonList] = useState([]);

    useEffect(()=>{
        //서버에서 pocketmon list를 불러와서 state에 설정하는 코드
        axios({
            url:"http://localhost:8080/pocketmon/",
            method:"get"
        })
        .then(response=>{
            // console.log(response);
            setPocketmonList(response.data);
        })
        .catch(err=>{});
    },[]);

    return(

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <h1>포켓몬 관리</h1>
                    <p>React CRUD 연습예제</p>

                    <div className="row mt-4"><div className="col">
                        <table className="table table-bordered">
                            <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>이름</th>
                                        <th>속성</th>
                                        <th></th>
                                    </tr>
                            </thead>
                            <tbody>
                                {pocketmonList.map(pocketmon=>(
                                    <tr key={pocketmon.no}>
                                        <td>{pocketmon.no}</td>
                                        <td>{pocketmon.name}</td>
                                        <td>{pocketmon.type}</td>
                                        <td>
                                            <button className="btn btn-primary">수정</button>
                                            <button className="btn btn-danger ms-2">삭제</button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div></div>

            </div>
            </div>
            </div>
    );
};
export default Pocketmon;