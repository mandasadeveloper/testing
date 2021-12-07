import { useState,useEffect } from 'react'
import {db, storage} from '../../firebase'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
function Banners() {
    const [file, setFile] = useState({})
    const [data, setData] = useState()   
    const [error, setError] = useState() 
    const types = ['image/png','image/jpeg'];

    useEffect(() => {
      getUrl();   
    }, [])
  
    const getUrl = ()=>{
      db.collection('banners').get()
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
    
const delBanner=(e,id)=>{
  e.preventDefault()
  db.collection('banners').doc(id).delete();
  getUrl();
}


    const handleChange = (e)=>{
      const selected=e.target.files[0];
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
              db.collection('banners')
              .add({
                url:url,                
              }).then(get=>{
                db.collection('banners').doc(get.id).update({
                id:get.id,
                name:selected.name                
              })
              })   
              getUrl();       
            });        
          }
        )
      }else{
        setFile(null);
        setError('Please select an image file (png or jpeg)');
      }      
    }
  
    return (
        <div style={{width:"500px",margin:'auto'}}>
           <AwesomeSlider>          
          {data&&data.map((user)=>{return(<div><span className="card-title activator texts">{user.name}</span><span onClick={(e)=>delBanner(e,user.id)} className="material-icons right icons">clear</span><img src={user.url} style={{width:"500px"}}/></div>)})}     
            </AwesomeSlider> 
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12">    
            <p>Upload Banners</p>        
              <input type="file" 
              id="autocomplete-input" 
              className="autocomplete"
              onChange={handleChange}/>                          
            {error && <div className="error">{error} </div>}                        
            </div> 
          </div>         
        </div>
      </div>
    )
}

export default Banners
