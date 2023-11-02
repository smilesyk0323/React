import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import {MdCancel} from "react-icons/md";
import {BiEditAlt} from "react-icons/bi";
import {BiSolidPlusSquare} from "react-icons/bi";

const TodoList = ()=>{

    const [todoList, setTodoList] = useState([
        {no:1, title:"학원가기", type:"공부"},
        {no:2, title:"영어단어외우기", type:"공부"},
        {no:3, title:"헬스장가기", type:"운동"},
        {no:4, title:"친구만나기", type:"일상"}
    ]);

    //등록을 위한 state
    const [data, setData] = useState({title:"", type:""});
    //백업 데이터
    const [backup, setBackup] = useState([]);


    const bsModal = useRef();

    const changeData = e=> {
        const newData = {
            ...data,
            [e.target.name] : e.target.value
        };
        setData(newData);
    };

    //todo의 내용을 backup으로 복제
    useEffect(()=>{
        setBackup(todoList.map(todo=>{
            const newTodo = {...todo};
            return newTodo
        }));
    },[]);

    //수정 버튼
    const changeToEdit = (target) =>{

        const newTodoList = todoList.map(todo =>{
            if(todo.no === target.no){
                return{
                    ...todo,
                    edit:true
                };
            }
            return todo;
        });
        setTodoList(newTodoList);
    };



    //줄의 데이터를 변경하는 함수
    const changeTodo = (target, e) =>{
        const newTodoList = todoList.map(todo =>{
            if(todo.no === target.no){
                return{
                    ...todo,
                    [e.target.name] : e.target.value
                }
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

    //완료 버튼
    const saveTodo = (target) =>{
        const newBackup = backup.map(todo => {
            if(todo.no === target.no){
                return{
                    ...target,
                    edit: false
                };
            }
            return todo;
        });
        setBackup(newBackup);

        const newTodoList = todoList.map(todo =>{
            if(todo.no === target.no){
                return {
                    ...todo,
                    edit:false
                };
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

    //삭제버튼
     const deleteTodo = (target) =>{
        const newTodoList = todoList.filter(todo => todo.no !== target.no);
        setTodoList(newTodoList);

        const newBackup = backup.filter(todo => todo.no !== target.no);
        setBackup(newBackup);
     }


    //취소 버튼
    const cancelTodo = (target) => {
        const findResult = backup.filter(todo => todo.no === target.no);

        const newTodoList = todoList.map(todo =>{
            if(todo.no === target.no){
                return{
                    ...findResult[0],
                    edit: false
                };
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

        //모달 todo 추가
        const addTodo = e =>{
            if(data.title.length===0|| data.type.length===0) return;
            const no = todoList.length == 0 ? 1 : todoList[todoList.length - 1].no + 1;

            //todo 추가
            setTodoList(
                [
                    ...todoList,
                    {
                        ...data,
                        edit: false,
                        no : no
                    }
                ]
            );

            //백업추가
            setBackup(
                [
                    ...todoList,
                    {
                        ...data,
                        edit: false,
                        no:no
                    }
                ]
            );

            //입력창 초기화
            setData({
                type: "",
                title: ""
            })

            //모달 닫기
            // closeModal();

        };


        //모달 취소 버튼
        const cancelAddTodo = ()=>{
            setData({
                type: "",
                title: ""
            })
            closeModal();
        };

        //모달 여는 함수 
        const openModal = e => {
            // var modal = new Modal(document.querySelector("#exampleModal"));//VanillaJS style
            var modal = new Modal(bsModal.current);//React style
            modal.show();
        };
    
        //모달 닫는 함수
        const closeModal = () => {
            // var modal = Modal.getInstance(document.querySelector("#exampleModal"));
            var modal = Modal.getInstance(bsModal.current);
            modal.hide();
        };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">

                    <div className="row">
                        <div className="col-6 offset-3">
                                <h1 className="">Todo List</h1>  
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4">
                            <select className="form-select" name="type" value={data.type}
                                        onChange={changeData}>
                                <option>선택</option>
                                <option>일상</option>
                                <option>취미</option>
                                <option>운동</option>
                                <option>공부</option>
                            </select>
                        </div>
                        <div className="col-6">
                             <input name="title" className="form-control"
                                             value={data.title} onChange={changeData} />
                        </div>
                        <div className="col-2">
                               <BiSolidPlusSquare className="text-primary" size="40"
                                        onClick={addTodo}/>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col">
                                <table className="table table-bordered">
                                    <thead className="table-secondary">
                                    </thead>
                                    <tbody>
                                        {todoList.map((todo,index) =>(
                                            todo.edit ?(
                                                <tr key={todo.no}>
                                                    <td width="6%">{todo.no}</td>
                                                    <td width="12%">
                                                    <select className="form-select" name="type" value={todo.type}
                                                                    onChange={e => changeTodo(todo, e)}>
                                                            <option>선택</option>
                                                            <option>일상</option>
                                                            <option>취미</option>
                                                            <option>운동</option>
                                                            <option>공부</option>
                                                        </select>
                                                    </td>
                                                    <td className="row">
                                                    <div className="col-6">
                                                        <input className="form-control" type="text" value={todo.title}
                                                            onChange={e => changeTodo(todo, e)}  name="title"/>
                                                    </div>
                                                    <div className="col-4">
                                                        {/* 수정 저장 버튼 */}
                                                    <BiEditAlt className="text-warning ms-2"size="20"
                                                            onClick={e => saveTodo(todo)} />
                                                        {/* 수정 취소 버튼 */}
                                                    <MdCancel className="text-danger ms-2"
                                                         onClick={e => cancelTodo(todo)}/>

                                                    </div>
                                                    </td>
                                                    
                                                </tr>
                                            ) : (
                                                <tr key={todo.no}>
                                                    <td>{todo.no}</td>
                                                    <td>{todo.type}</td>
                                                    <td>
                                                        {todo.title}
                                                        <BiEditAlt className="text-warning ms-2"size="20"
                                                            onClick={e => changeToEdit(todo)} />
                                                        <MdCancel className="text-danger ms-2" onClick={e => deleteTodo(todo)}/>
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                        </div>
                    </div>


                    {/* Modal */}
                    <div className="modal fade" ref={bsModal} id="exampleModal" 
                           data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">todo 등록</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label">분류</label>
                                            <input name="type" className="form-control"
                                            value={data.type} onChange={changeData} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label">할 일</label>
                                            <input name="title" className="form-control"
                                             value={data.title} onChange={changeData} />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
                                    {/* 자동으로 닫히게 하는 버튼 */}
                                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                    {/* 수동으로 원하는 로직을 추가하여 닫히게 하는 버튼 */}
                                    <button type="button" className="btn btn-secondary"
                                                                            onClick={cancelAddTodo}>close</button>
                                    
                                    <button type="button" className="btn btn-primary"
                                        onClick={addTodo}>등록</button>                                
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default TodoList;