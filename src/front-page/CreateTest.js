import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {db} from "../firebase";

function CreateTest() {
const [data, setData]=useState();
useEffect(() => {   
getData();
}, [])

const getData=()=>{
  db.collection('Test').get()
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
                <div className="card-content black-text">
                  <span className="card-title">{user.cardname}</span>
                  <p>{user.description}</p>
                </div>
                <div className="card-action">
                  <Link to={`/test-list/${user.uid}`}>See More</Link>                  
                </div>
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

export default CreateTest
