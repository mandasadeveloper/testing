import React, {useState, useEffect} from 'react'
import {db} from '../firebase'
import ReactPaginate from 'react-paginate';
import Report from './Report';
import AnswerSheet from './AnswerSheet';

function AllTest() { 
  var url = window.location.pathname;
  var splitUrl = url.split('/'); 
  const uid = splitUrl[2];
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
      db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc(uid).collection('quiz_list').get()
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
          <a className="collection-item waves-effect state" onClick={()=>Click(user.option_1,user.answer,user.test_id)}>{user.option_1}</a>
          <a className="collection-item waves-effect state" onClick={()=>Click(user.option_2,user.answer,user.test_id)}>{user.option_2}</a>    
          <a className="collection-item waves-effect state" onClick={()=>Click(user.option_3,user.answer,user.test_id)}>{user.option_3}</a>
          <a className="collection-item waves-effect state" onClick={()=>Click(user.option_4,user.answer,user.test_id)}>{user.option_4}</a>                                                                            
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
      db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc(uid).collection('user_answers')
      .add({         
        user_name:"user",
        report:report,                 
      }).then(get=>{        
        db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc(uid).collection('user_answers').doc(get.id)
        .get().then(snapshot=>setAnswer(snapshot.data().report))
      })     
      getData();
      const attempt = score+wrong;
      setShowScore({score:score,pageCount:pageCount, wrong:wrong, attempt:attempt, unattempt:pageCount-attempt});     
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
                        pageRangeDisplayed={150}
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

