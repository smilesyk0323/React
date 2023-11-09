import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {MdCancel} from "react-icons/md";
import {BiEditAlt} from "react-icons/bi";

import "./Book.css";
import { Modal } from "bootstrap";

const Book = (props)=>{
    const [bookList, setBookList]  = useState([]);

    const loadBook = ()=> {
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"get"
        })
        .then(response=>{
            // console.log(response)
            setBookList(response.data);
        })
        .catch(err=>{
            window.alert("통신오류발생");
        });
    }

    useEffect(()=>{
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"get"
        })
        .then(response=>{
            // console.log(response)
            setBookList(response.data);
        })
        .catch(err=>{
            window.alert("통신오류발생");
        });
    },[]);

    const deleteBook = (book) =>{
        const choice = window.confirm("정말 삭제하시겠습니까?")
        if(choice === false) return;
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method:"delete"
        }).then(response=>{
            loadBook();
        }).catch({});
    };
    
    //등록과 관련된 state
    const [book,setBook] = useState({
        bookTitle:"", bookAuthor:"", bookPublicationDate:"",bookPrice:"",bookPublisher:"",
        bookPageCount:"", bookGenre:""
    });
    const changeBook = (e) =>{
        setBook({
            ...book,
            [e.target.name] : e.target.value
        });
    };

    //등록창 초기화
    const clearBook = ()=>{
        setBook({
            bookTitle:"", bookAuthor:"", bookPublicationDate:"",bookPrice:0,bookPublisher:"",
            bookPageCount:0, bookGenre:""
        });
    };


    //modal 
    const bsModal = useRef();
    const openModal = ()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    };
    const closeModal = ()=>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();

        clearBook();
    };



    // 저장
    // const addBook = () =>{
    //     axios({
    //         url:"http://localhost:8080/book/",
    //         method:"post",
    //         data: book
    //     })
    //     .then(response=>{
    //         loadBook();
    //         closeModal();
    //     })
    //     .catch(err=>{});
    // };

    //async 함수와 await 키워드를 사용한 간소화 작업이 가능 
    //- 비동기 작업을 동기화된 코드로 작성할 수 있다
    const addBook = async ()=>{
        const response = await axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/`,
            method:"post",
            data: book
        });
        loadBook();
        closeModal();
    };
    
    const editBook = (target)=>{
        setBook({...target});
        openModal();
    };

    //모달 속 수정버튼
    const updateBook = ()=>{

        const copyBook = {...book};
        delete copyBook.bookId;

        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
            method:"put",
            data: copyBook
        })
        .then(response=>{
            loadBook();
            closeModal();
        });
    };



    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <h1>도서 관리</h1>
                    <p>책 좀 읽자</p>

                    <div className="row mt-4">
                        <div className="col">
                            <button type="button" className="btn btn-primary"
                                onClick={openModal}>도서등록</button>
                        </div>
                    </div>

                    <div className="row mt-4"><div className="col">
                    <table className="table table-hover text-center">
                        <thead>
                            <tr>
                                <th className="pc-only">번호</th>
                                <th>제목</th>
                                <th>저자</th>
                                <th className="pc-only">출간일</th>
                                <th>가격</th>
                                <th className="pc-only">출판사</th>
                                <th className="pc-only">페이지수</th>
                                <th className="pc-only">장르</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookList.map(book=>(
                                <tr key={book.bookId}>
                                    <td className="pc-only">{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td className="pc-only">{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td className="pc-only">{book.bookPublisher}</td>
                                    <td className="pc-only">{book.bookPageCount}</td>
                                    <td className="pc-only">{book.bookGenre}</td>
                                    <td>
                                    <BiEditAlt className="text-warning ms-2"
                                        onClick={e=>editBook(book)}/>
                                    <MdCancel className="text-danger ms-2"
                                    onClick={e=>deleteBook(book)}/>
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
                        <h5 className="modal-title" >
                            {/* {번호가 없으면 ? 추가 : 수정} */}
                            {/* {pocketmon.no === undefined ? '신규몬스터 등록' : `${pocketmon.no}번 몬스터`} */}
                            {book.bookId === undefined ? '신규도서 등록' : `${book.bookId}번 도서`}
                        </h5>
                        <button type="button" className="border-0 bg-transparent" 
                                                            onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="row">
                            <div className="col">
                                <label className="form-label">도서명</label>
                                <input type="text" name="bookTitle" className="form-control"
                                        value={book.bookTitle} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">저자</label>
                                <input type="text" name="bookAuthor" className="form-control"
                                        value={book.bookAuthor} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">출판일</label>
                                <input type="date" name="bookPublicationDate" className="form-control"
                                        value={book.bookPublicationDate} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">판매가</label>
                                <input type="number" name="bookPrice" className="form-control"
                                        value={book.bookPrice} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">출판사</label>
                                <input type="text" name="bookPublisher" className="form-control"
                                        value={book.bookPublisher} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">페이지</label>
                                <input type="number" name="bookPageCount" className="form-control"
                                        value={book.bookPageCount} onChange={changeBook}/>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col">
                                <label className="form-label">장르</label>
                                <select name="bookGenre" value={book.bookGenre} onChange={changeBook} className="form-select">
                                <option value="">선택하세요</option>
                                <option>다큐멘터리</option>
                                <option>판타지/무협</option>
                                <option>소설</option>
                                <option>자서전</option>
                                <option>로맨스</option>
                                <option>수필</option>
                                <option>추리</option>
                            </select>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeModal}>닫기</button>
                        {book.bookId === undefined ? 
                            <button className="btn btn-success" onClick={addBook} >저장</button>
                            :
                            <button className="btn btn-success" onClick={updateBook}>수정</button>
                        }
                    </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default Book;