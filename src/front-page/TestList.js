import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {db} from "../firebase";

function TestList() {
    var url = window.location.pathname;
    var splitUrl = url.split('/');   
    const uid = splitUrl[2];   
const [data, setData]=useState();
useEffect(() => {   
getData();
}, [])

const getData=()=>{
  db.collection('Test').doc(uid).collection('Test_list').get()
  .then( snapshot =>{
    const user = []
    snapshot.forEach( doc =>{
     const value = doc.data()
     user.push(value);
    })
    setData(user)
  })
  .catch( error => console.log(error))    
}

    return (
    <div>
            <div style={{width:"90%", margin:"auto"}} >      
        <div className="row">
    <div className="col s12 m6">
     {
         data&&data.map((user,index)=>{
             return(
                <div className="card darken-1" key={index} >
               <Link to={`/quiz-list/${user.test_id}`}>
               <div className="card-content black-text">
                  <span className="card-title">{user.quiz}</span>                  
                </div>  
                </Link>              
              </div>
             )
         })
     }
    </div>
  </div>
      </div>
    </div>
    )
}

export default TestList
