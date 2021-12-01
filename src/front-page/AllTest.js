import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import ReactPaginate from 'react-paginate';
import Report from './Report';
import AnswerSheet from './AnswerSheet';
import {useParams} from 'react-router-dom';
function AllTest() { 
  const {url_id, uid} = useParams();  
    const [offset, setOffset] = useState(0);
    const [value, setValue] = useState([]);
    const [perPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)
    const [score, setScore] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [report, setReport] = useState({});
    const [answer, setAnswer] = useState('');  
    const [data, setData] = useState()  
    
    const Click=(option,ans,id)=>{       
setReport((preValue)=>{ 
return{
...preValue,
[id]:option,
}
})     
if(option==ans){
  setScore(score + 1);
}
else{
  setWrong(wrong + 1);
}
    }
    const getData = async() => {       
      db.collection('Test').doc(url_id).collection('Test_id').doc(uid).collection('quiz_list').get()
      .then( snapshot =>{
        const user = []
        snapshot.forEach( doc =>{
         const value = doc.data()
         user.push(value);
        })
        setData(user)
        const slice = user.slice(offset, offset + perPage)
        const postData = slice.map((user) => 
        <div className="collection with-header" key={user.test_id}>                   
          <li className="collection-header"><h6>{user.quiztest}</h6></li> 
          {
            user.url?
            <li className="collection-item" ><img src = {user.url} style={{maxWidth:"200px"}}/></li>
            :null
          }                  
          <a className="collection-item waves-effect state" onClick={()=>Click(user.option_1[0],user.answer[0],user.test_id)}>{user.option_1}</a>
          <a className="collection-item waves-effect state" onClick={()=>Click(user.option_2[0],user.answer[0],user.test_id)}>{user.option_2}</a>    
          <a className="collection-item waves-effect state" onClick={()=>Click(user.option_3[0],user.answer[0],user.test_id)}>{user.option_3}</a>
          <a className="collection-item waves-effect state" onClick={()=>Click(user.option_4[0],user.answer[0],user.test_id)}>{user.option_4}</a>                                                                            
        </div>)
        setValue(postData)
        setPageCount(Math.ceil(user.length / perPage))
      })                             
    }
   
    useEffect(() => {
        getData()       
      }, [offset])
      
      const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage)
    };
    const Submit=(e)=>{        
      e.preventDefault();    
      const attempt = score+wrong;
      setShowScore({score:score,pageCount:pageCount, wrong:wrong, attempt:attempt, unattempt:pageCount-attempt});           
      db.collection('Test').doc(url_id).collection('Test_id').doc(uid).collection('user_answers')
      .add({                 
        report:report,   
        score:[{score:score,pageCount:pageCount, wrong:wrong, attempt:attempt, unattempt:pageCount-attempt}],              
      }).then(get=>{        
        db.collection('Test').doc(url_id).collection('Test_id').doc(uid).collection('user_answers').doc(get.id)
        .get().then(snapshot=>setAnswer(snapshot.data().report))
      })     
      getData();      
    }   
    return (
        <div className="App">
          {
            !showScore?
            <>
            {value}
            <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>                        
            <a onClick={Submit} className="waves-effect waves-light btn">Submit</a>                   
            </>                        
            :<>
            <Report score={showScore}/>
            <AnswerSheet data={data} answer={answer}/>
            </>
          }                                                              
        </div>
      );
}
export default AllTest

