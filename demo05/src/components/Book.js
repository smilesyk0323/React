import { useEffect, useState } from "react";
import axios from "axios";
import {MdCancel} from "react-icons/md";
import {BiEditAlt} from "react-icons/bi";

import "./Book.css";

const Book = (props)=>{
    const [bookList, setBookList]  = useState([]);

    const loadBook = ()=> {
        axios({
            url:"http://localhost:8080/book/",
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
            url:"http://localhost:8080/book/",
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
            url:`http://localhost:8080/book/${book.bookId}`,
            method:"delete"
        }).then(response=>{
            loadBook();
        }).catch({});
    };

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <h1>도서 관리</h1>
                    <p>책 좀 읽자</p>

                    <div className="row mt-4">
                        <div className="col">
                            <button type="button" className="btn btn-primary">도서등록</button>
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
                                    <BiEditAlt className="text-warning ms-2"/>
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
        </div>
    );
};
export default Book;