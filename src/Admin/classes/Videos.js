import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {db,storage} from "../../firebase";
function VideosClass() {  
  const {id,videos_id} = useParams();
const [data, setData]=useState();
useEffect(() => {   
getData();
}, [])

const handleChange = (e) =>{
        const videoObj = e.currentTarget.files[0];        
        let {
          name,
          type
        } = videoObj;
        type = type.split("/")[0];
    
        if (type != "video") {
          alert("please upload video only");
          return;
        }     
        storage.ref(`videos/${videoObj.name}`).put(videoObj)
        .on(
          "state_changed",
          snapshot=>{},
          error=>{
            console.log(error);
          },
          ()=>{
            storage
            .ref("videos")
            .child(videoObj.name)
            .getDownloadURL()
            .then(url=>{          
                db.collection('Course').doc(id).collection('subjects').doc(videos_id).collection('videos')
                .add({
                    path:url,
                    thumnail:"thumbnail",
                    title:videoObj.name                    
                }).then(get=>
                db.collection('Course').doc(id).collection('subjects').doc(videos_id).collection('videos').doc(get.id)
                .update({
                    uid:get.id
                })) 
                getData()                     
            });        
          }
        )                
}


const getData=()=>{
   db.collection('Course').doc(id).collection('subjects').doc(videos_id).collection('videos').get()
   .then( snapshot =>{
    const user = []
    snapshot.forEach( doc =>{
     const value = doc.data()
     user.push(value);
    })
    setData(user)
  })    
}
const videDelete = (e,uid)=>{
  e.preventDefault();
  db.collection('Course').doc(id).collection('subjects').doc(videos_id).collection('videos').doc(uid)
  .delete()
getData()       
}
    return (
    <div>       
            <div style={{maxWidth:"700px",margin:'auto'}}>                
        <div className="row">
            <h4>Videos</h4>
    <div className="col s12 m6">
     {
         data&&data.map((user,index)=>{
            return(
              user.title?
            <div className="card darken-1" key={index} >                            
            <div style={{display:"flex", justifyContent:"space-between"}} className="card-content black-text">
                <p className="card-title">{user.title}</p>            
                <button onClick={(e)=>videDelete(e,user.uid)}>Delete</button>              
              </div>                
            </div>
            :null       
            )     
         })
     }
    </div>
  </div>
  <p>Upload video</p>
  <input type = "file"
            onChange = {handleChange}
            /> 
      </div>
    </div>
    )
}

export default VideosClass
