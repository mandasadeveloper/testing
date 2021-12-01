import {useState,useEffect} from 'react'
import { Link,useParams} from 'react-router-dom';
import {db} from "../firebase";

function TestList() {  
  const {id} = useParams();
const [data, setData]=useState();
useEffect(() => {   
getData();
}, [])

const getData=()=>{
  db.collection('Test').doc(id).collection('Test_id').get()
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
               <Link to={`/quiz-list/${id}/${user.test_id}`}>
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
