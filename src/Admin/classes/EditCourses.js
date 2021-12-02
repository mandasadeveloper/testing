
import { useEffect, useState} from "react";
import { useHistory, useParams } from "react-router";
import {db,storage} from "../../firebase";
function EditCourses() { 
    const [file, setFile] = useState({})  
    const [error, setError] = useState() 
    const types = ['image/png','image/jpeg'];
    const {id}=useParams();  
    const history=useHistory();    
    const [description, setDescription]=useState();
    const [title, setTitle]=useState();    
    const [banners, setBanners]=useState();
    const [selected, setSelected] = useState()    
    useEffect(() => {   
      db.collection('Course').doc(id).get()
      .then(snapshot => {
        setDescription(snapshot.data()['description']);
        setTitle(snapshot.data()['title']);
        setBanners(snapshot.data()['banner']);
      })                
    }, [id])   

const handleChage=(e)=>{
    setSelected(e.target.files[0])
}

    const Update=(e)=>{
        e.preventDefault();        
        if(selected && types.includes(selected.type)){
          setFile(selected);
          setError('');
          storage.ref(`banners/${selected.name}`).put(selected)
          .on(
            "state_changed",
            snapshot=>{},
            error=>{
              console.log(error);
            },
            ()=>{
              storage
              .ref("banners")
              .child(selected.name)
              .getDownloadURL()
              .then(url=>{          
                db.collection('Course').doc(id).update({
                    description:description,
                    title:title,  
                    banner:url,                                      
                })                      
              });        
            }
          )
          history.push('/admin-classes')
        }else{
          setFile(null);
          setError('Please select an image file (png or jpeg)');
        }      
      
    }

    return (
        <div style={{maxWidth:"500px",margin:'auto'}}>
        <img src={banners} style={{width:"500px"}}/>            
        <form style={{marginTop:"30px"}}className="col s12" onSubmit={Update}>
        <div className="row">
        <div className="input-field col s6">
        <p htmlFor="banners">banners</p>
        {error && <div style={{color:"red"}} className="error">{error} </div>}
          <input id="banners" type="file" 
          onChange={handleChage}
          className="validate"/>          
        </div>  
        <div className="input-field col s6">
        <p htmlFor="title">Title</p>
          <input id="title" type="text" value={title} 
          onChange={(e)=>setTitle(e.target.value)}
          className="validate"/>          
        </div>
      </div>
      <div className="row"> 
      <div className="input-field col s6">
      <p htmlFor="Cource">Cource description</p>
          <input  id="Cource" type="text" value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="validate"/>          
        </div>              
      </div>
         
          <button className="waves-effect waves-light btn">Update</button>   
        </form>
    </div>
    )
}

export default EditCourses
