
import { useEffect, useState} from "react";
import {db} from "../firebase";
function Edit({id}) {       
    const [name, setName]=useState();
    const [dob, setDob]=useState();
    const [state, setState]=useState();
    const [city, setCity]=useState();    
    useEffect(() => {   
      db.collection('USERS').doc(id).get()
      .then(snapshot => {          
              setName(snapshot.data()['student_name']);
              setDob(snapshot.data()['dob']);
              setState(snapshot.data()['state']);
              setCity(snapshot.data()['city']);           
      })                
    }, [id])   
    const Update=(e)=>{
        e.preventDefault();
        db.collection('USERS').doc(id).update({
            student_name:name,
            dob:dob,
            state:state,
            city:city                    
        })       
    }

    return (
        <div style={{maxWidth:"500px",margin:'auto'}}>
        <form className="col s12" onSubmit={Update}>
        <div className="row">
        <div className="input-field col s6">
          <input  id="student" type="text" value={name}
          onChange={(e)=>setName(e.target.value)}
          className="validate"/>
          <label htmlFor="student">Student Name</label>
        </div>
        <div className="input-field col s6">
          <input id="birth" type="text" value={dob} 
          onChange={(e)=>setDob(e.target.value)}
          className="validate"/>
          <label htmlFor="birth">Date of Birth</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input  id="state" type="text" value={state}
          onChange={(e)=>setState(e.target.value)}
           className="validate"/>
          <label htmlFor="state">State</label>
        </div>
        <div className="input-field col s6">
          <input id="city" type="text" value={city} 
          onChange={(e)=>setCity(e.target.value)}
          className="validate"/>
          <label htmlFor="city">City</label>
        </div>
      </div>
         
          <button className="waves-effect waves-light btn">Update</button>   
        </form>
    </div>
    )
}

export default Edit
