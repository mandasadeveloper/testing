import {useState,useEffect} from 'react'
import { Link,useParams} from 'react-router-dom';
import {db} from "../../firebase";

function TestList() {
  const {id} = useParams();  
const [data, setData]=useState();
const [state, setState] = useState({
  quiz:"",
  });

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
  db.collection('Test').doc(id).collection('Test_id')
  .add({
  quiz:state.quiz,                   
  }).then(get=>{
    const test_uid = get.id;
    db.collection('Test').doc(id).collection('Test_id').doc(test_uid).update({
    test_id:test_uid,            
  })
  })
  setState({
    quiz:"",
  })
  getData();
}
    return (
    <div>
            <div style={{padding:"10% 10%"}}>        
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
            <div className="input-field col s12 card darken-1" style={{margin:"10%"}}>
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
    )
}

export default TestList
