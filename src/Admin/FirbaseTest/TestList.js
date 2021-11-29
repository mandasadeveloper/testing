import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {db} from "../../firebase";

function TestList() {
    var url = window.location.pathname;
    var splitUrl = url.split('/');   
    const uid = splitUrl[2];   
const [data, setData]=useState();
const [state, setState] = useState({
  quiz:"",
  });

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


const handleInputs=(e)=>{
const {name, value}=e.target;
setState((preValue)=>{
return{
...preValue,
[name]:value,
}
})
}
const Create = (e)=>{
  e.preventDefault();
  db.collection('Test').doc(uid).collection('Test_list').add({
  quiz:state.quiz,                   
  }).then(get=>{
    const test_uid = get.id;
    db.collection('Test').doc(uid).collection('Test_list').doc(test_uid).update({
    test_id:test_uid,            
  })
  })
  getData();
}
    return (
    <div>
            <div style={{width:"90%", margin:"auto"}} >
        <div className="col s12">
          <div style={{marginTop:"10%", display:"block"}}>             
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="text" 
              id="autocomplete-description" 
              className="autocomplete"
              name="quiz"
              value={state.quiz}
              onChange={handleInputs}/>
              <label htmlFor="autocomplete-description">Create new Quiz</label>
              <a onClick={Create} className="waves-effect btn">Create</a>
            </div>        
          </div>
        </div>
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
