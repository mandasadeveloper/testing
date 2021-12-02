import {useState,useEffect} from 'react'
import { Link,useParams} from 'react-router-dom';
import {db} from "../../firebase";

function Subjects() {
  const {id} = useParams();  
const [data, setData]=useState();
const [state, setState] = useState({
  name:"",
  });

useEffect(() => {   
getData();
}, [])

const getData=()=>{
  db.collection('Course').doc(id).collection('subjects').get()
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
  db.collection('Course').doc(id).collection('subjects')
  .add({
  name:state.name,                   
  }).then(get=>{
    const sub_id = get.id;
    db.collection('Course').doc(id).collection('subjects').doc(sub_id).update({
    sub_id:sub_id,            
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
              name="name"
              value={state.name}
              onChange={handleInputs}/>
              <label htmlFor="autocomplete-description">Insert New Subjects</label>
              <a onClick={Create} className="waves-effect btn">Create</a>
            </div>        
          </div>
        </div>
        <div className="row">
    <div className="col s12 m6">
      <h4>Subjects</h4>
     {
         data&&data.map((user,index)=>{
             return(
                <div className="card darken-1" key={index} >
               <Link to={`/admin-videos-link/${id}/${user.sub_id}`}>
               <div className="card-content black-text">
                  <span className="card-title">{user.name}</span>                  
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

export default Subjects
