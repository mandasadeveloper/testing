import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {db} from "../../firebase";

function CreateCource() {
const [data, setData]=useState();
const [state, setState] = useState({
title:"",
description:"",
});

useEffect(() => {   
getData();
}, [])

const getData=()=>{
  db.collection('Course').get()
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
  db.collection('Course').add({
    title:state.title,
    description:state.description,                     
  }).then(get=>{
    const uid = get.id;
    db.collection('Course').doc(uid).update({
     uid:uid,             
  })
  })
  getData();
}
    return (
    <div>
            <div style={{width:"90%", margin:"auto"}} >
        <div className="col s12">
       <form onSubmit={Create}>
       <div style={{marginTop:"10%", display:"block"}}>
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="text" 
              id="autocomplete-title" 
              className="autocomplete"
              name="title"
              value={state.title}
              onChange={handleInputs}/>
              <label htmlFor="autocomplete-title">Create new Cource</label>             
            </div>        
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="text" 
              id="autocomplete-description" 
              className="autocomplete"
              name="description"
              value={state.description}
              onChange={handleInputs}/>
              <label htmlFor="autocomplete-description">description</label>
              <input type="submit" value="Create" className="waves-effect btn"/>
            </div>        
          </div>
       </form>
        </div>
        <div className="row">
    <div className="col s12 m6">
     {
         data&&data.map((user,index)=>{
             return(
                <div className="card darken-1" key={index} >
                <div className="card-content black-text">
                  <span className="card-title">{user.title}</span>
                  <p>{user.description}</p>
                </div>
                <div className="card-action">
                  <Link to={`/admin-sujects/${user.uid}`}>See More</Link> 
                  <Link to={`edit-courses/${user.uid}`} >Edit</Link>                 
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

export default CreateCource
