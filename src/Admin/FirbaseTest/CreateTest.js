import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {db} from "../../firebase";

function CreateTest() {
const [data, setData]=useState();
const [state, setState] = useState({
cardname:"",
description:"",
});

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
  db.collection('Test').add({
    cardname:state.cardname,
    description:state.description,                     
  }).then(get=>{
    const uid = get.id;
    db.collection('Test').doc(uid).update({
     uid:uid,             
  })
  })
  getData();
}
    return (
    <div>
            <div style={{padding:"10%", margin:"auto"}} >
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
                  {user.uid?<Link to={`/test-list/${user.uid}`}>See More</Link>:null}                 
                </div>
              </div>
             )
         })
     }
    </div>
  </div>
        <div className="col s12">
       <form onSubmit={Create}>
       <div style={{marginTop:"10%", display:"block"}}>
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="text" 
              id="autocomplete-cardname" 
              className="autocomplete"
              name="cardname"
              value={state.cardname}
              onChange={handleInputs}/>
              <label htmlFor="autocomplete-cardname">Create new test series</label>             
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
      </div>
    </div>
    )
}

export default CreateTest
