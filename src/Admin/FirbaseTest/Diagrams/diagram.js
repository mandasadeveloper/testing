import React, { useState,useEffect } from 'react'
import {db, storage} from '../../../firebase'

function Diagram({id}) {
  const [url, setUrl] = useState()

  useEffect(() => {
    getUrl()   
  }, [])

  const getUrl = ()=>{
    db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc('eiRMEg0LQomdEDNASjtu').collection('quiz_list').doc(id)
    .get()
    .then( snapshot =>{     
      setUrl(snapshot.data().url);
    })   
  }
  const handleFile = (e) =>{
    e.preventDefault();
    const file = e.target.files[0];
    storage.ref(`diagrams/${file.name}`).put(file)
    .on(
      "state_changed",
      snapshot=>{},
      error=>{
        console.log(error);
      },
      ()=>{
        storage
        .ref("diagrams")
        .child(file.name)
        .getDownloadURL()
        .then(url=>{          
          db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc('eiRMEg0LQomdEDNASjtu').collection('quiz_list').doc(id)
          .update({
            url:url
          });
          getUrl();
        });        
      }
    )    
  }
  const del=()=>{
    db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc('eiRMEg0LQomdEDNASjtu').collection('quiz_list').doc(id)
    .update({
      url:""
    });
    getUrl();
  }
    return (
       
            <div className="input-field col s12">            
              <input type="file"
              onChange={handleFile}/>                           
              {
                url?
                <>
                <img src = {url} style={{width:"100px"}}/>
                <span className="material-icons" style={{cursor:"pointer"}} onClick={del}>clear</span>
              </>
              :null
              }                                                           
            </div>          
    )
}

export default Diagram
