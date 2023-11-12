import { useEffect, useState } from "react";
import axios from "axios";

const SalList=(props)=>{
    const[salLists, setSalLists] = useState([]);

    useEffect(()=>{
        //서버에서 급여내역 list 불러와서 state에 설정하는 코드 
        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/salList/empNo/11`,
            method:"get"
        })
        .then(response=>{
            console.log(response.data);
            setSalLists(response.data);
        })
        .catch(err=>{
            window.alert("통신 오류 발생");
        });

    },[]);


    return(

            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <h1>급여내역</h1>

                    <div className="row">
                        <div className="col">
                                <table className="table table-bordered text-end">
                                    <thead>
                                        <tr>
                                            <th>총 지급액</th>
                                            <th>건강보험</th>
                                            <th>고용보험</th>
                                            <th>국민연금</th>
                                            <th>장기요양보험</th>
                                            <th>근로소득세</th>
                                            <th>지방소득세</th>
                                            <th>실수령액</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salLists.map(salList=>(
                                        <tr key={salList.empNo}>
                                            <td>{salList.salListTotal.toLocaleString()} 원</td>
                                            <td>{salList.salListHealth.toLocaleString()} 원</td>
                                            <td>{salList.salListLtcare.toLocaleString()} 원</td>
                                            <td>{salList.salListNational.toLocaleString()} 원</td>
                                            <td>{salList.salListEmp.toLocaleString()} 원</td>
                                            <td>{salList.salListWork.toLocaleString()} 원</td>
                                            <td>{salList.salListLocal.toLocaleString()} 원</td>

                                        </tr>
                                        ))}
                                       
                                    </tbody>
                                </table>
                        </div>
                    </div>

                </div>
            </div>

    );
};

export default SalList;