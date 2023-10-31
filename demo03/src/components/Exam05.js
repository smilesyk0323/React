import { useEffect, useState } from "react";

const Exam05 = ()=>{
    //state를 3개로 보면 =(javaPoint,dbPoint,springBootPoint)
    const [javaPoint, setJavaPoint] = useState(0);
    const [dbPoint, setDbPoint] = useState(0);
    const [springBootPoint, setSpringBootPoint] = useState(0);
    const [total, setTotal] = useState(0);
    const [avg, setAvg] = useState(0);
    
    useEffect(() => {
        const totalPoints = javaPoint + dbPoint + springBootPoint;
        const average = totalPoints / 3;
        setTotal(totalPoints);
        setAvg(Math.floor(average));
      }, [javaPoint, dbPoint, springBootPoint]);

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>성적 계산기</h1>
                    </div>
                </div>
                <div className="row"><div className="col">
                    <h3>자바<input type="number"
                    value={javaPoint}
                    onChange={(e) => setJavaPoint(Number(e.target.value))}/></h3>
                </div></div>
                <div className="row"><div className="col">
                    <h3>데이터베이스<input type="number"
                    value={dbPoint}
                    onChange={(e) => setDbPoint(Number(e.target.value))}/></h3>
                </div></div>
                <div className="row"><div className="col">
                    <h3>스트링부트<input type="number"
                     value={springBootPoint}
                     onChange={(e) => setSpringBootPoint(Number(e.target.value))}/></h3>
                </div></div>
                <hr/>
                <h3>총점 = {total}점, 평균 = {avg}점</h3>
            </div>

        </>
    );
};

export default Exam05;
