import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {MdCancel} from "react-icons/md";
import {BiEditAlt} from "react-icons/bi";
import { Modal } from "bootstrap";
import "bootstrap/dist/js/bootstrap";

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

    //modal 관련된 처리
    const bsModal = useRef();
    const openModal = ()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = ()=>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    };

    //등록과 관련된 state
    const [pocketmon, setPocketmon] = useState({ name:"",type:""});
    const changePocketmon = (e) =>{
        setPocketmon({
            ...pocketmon,
            [e.target.name] : e.target.value
        });
    };

    return(

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <h1>포켓몬 관리</h1>
                    <p>React CRUD 연습예제</p>

                     {/* 추가 버튼 */}
                    <div className="row mt-4">
                        <div className="col">
                            <button className="btn btn-success"
                                onClick={openModal}>
                                추가
                            </button>
                        </div>
                    </div>

                    {/* 출력위치 */}
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
                                        <BiEditAlt className="text-warning ms-2"
                                        />
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
                {/* Modal */}
                <div className="modal fade" ref={bsModal} 
                        data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" >제목</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <label className="form-label">이름</label>
                                <input type="text" name="name" className="form-control"
                                value={pocketmon.name} onChange={changePocketmon}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">속성</label>
                                <input type="text" name="type" className="form-control"
                                 value={pocketmon.type} onChange={changePocketmon}/>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                        <button className="btn btn-primary" >저장</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    );
};
export default Pocketmon;