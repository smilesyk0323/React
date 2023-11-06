import { useEffect, useState } from "react";
import axios from "axios";
import {MdCancel} from "react-icons/md";
import {BiEditAlt} from "react-icons/bi";

const Pocketmon = (props)=>{
    const [pocketmonList, setPocketmonList] = useState([]);

    const loadPocketmon = ()=>{
        axios({
            url:"http://localhost:8080/pocketmon/",
            method:"get"
        })
        .then(response=>{
            // console.log(response);
            setPocketmonList(response.data);
        })
        .catch(err=>{});
            }

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

    //포켓몬스터 삭제
    // - 이제는 state에서 삭제하는 것이 아니라 서버에 통신을 보낸 뒤 목록을 갱신하면 된다
    const deletePocketmon = (pocketmon) => {
        const choice = window.confirm("정말 삭제하시겠습니까?")
        if(choice === false) return;
        
        //axios({옵션}).then(성공시 실행할 함수).catch(실패시 실행할 함수);
        axios({
            url:`http://localhost:8080/pocketmon/${pocketmon.no}`,
            method:"delete"
        })
        .then(response=>{
            loadPocketmon();
        })
        .catch(err=>{});
    };

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
                                        <BiEditAlt className="text-warning ms-2"size="20"/>
                                        <MdCancel className="text-danger ms-2"
                                        onClick={e=>deletePocketmon(pocketmon)}/>
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