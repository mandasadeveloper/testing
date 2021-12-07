import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {db,storage} from "../../firebase";

function CreatePost() {
const [error, setError] = useState() 
const [data, setData]=useState();
const [file, setFile] = useState({})  
const [selected, setSelected] = useState()
const [description, setDescription]=useState();
const Time = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(new Date().firstSale);
useEffect(() => {   
getData();
}, [])

const getData=()=>{
  db.collection('Post').get()
  .then( snapshot =>{
    const user = []
    snapshot.forEach( doc =>{
     const value = doc.data()
     user.push(value);
    })
    setData(user)
  }) 
}


const delPost=(e,id)=>{
    e.preventDefault()
    db.collection('Post').doc(id).delete();
    getData();
  }

const handleInputs=(e)=>{
setSelected(e.target.files[0])
}
const Create = (e)=>{
    e.preventDefault();        
    if(selected){    
      setFile(selected);    
      storage.ref(`Post/${selected.name}`).put(selected)
      .on(
        "state_changed",
        snapshot=>{},
        error=>{
          console.log(error);
        },
        ()=>{        
          storage
          .ref("Post")
          .child(selected.name)
          .getDownloadURL()
          .then(url=>{          
            db.collection('Post').add({                                
                description:description,  
                time:Time,              
                url:url,                                     
            }).then(get=>{
                db.collection('Post').doc(get.id).update({
                    id:get.id
                }); 
                setSelected('');
                setDescription('');
                getData();
            })                    
          });        
        }
      )     
    } 
}
    return (
    <div>
            <div style={{padding:"10%", margin:"auto"}} >
            <div className="row" style={{display:"block"}}>
            {
         data&&data.map((user,index)=>{
             return(
            <div className="card" style={{width:"50%"}}>
            <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{user.description}<span onClick={(e)=>delPost(e,user.id)} className="material-icons right">clear</span></span>
      <p>{user.time}</p>
    </div>
    <div className="card-image waves-effect waves-block waves-light">
      <img className="activator" src={user.url}/>
    </div>      
  </div>
             )
            }) 
}    
  </div>
        <div className="col s12">
       <form onSubmit={Create}>
       <div style={{maxWidth:"500px", margin:"5% 15%"}}>
       <div className="input-field col s6">
        <p htmlFor="url">Add New Post</p>        
          <input id="url" type="file" 
          onChange={handleInputs}
          className="validate"/>          
        </div>    
            <div className="input-field col s12">
            <div className="input-field col s6">     
          <input  id="autocomplete-description" type="text" value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="validate"/>   
          <label htmlFor="autocomplete-description">Add Post Description</label>       
        </div>   
              <input type="submit" value="Create" className="waves-effect btn"/>              
            </div>        
          </div>
       </form>
        </div>       
      </div>
    </div>
    )
}

export default CreatePost
