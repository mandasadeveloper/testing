import { useState,useEffect } from 'react'
import {db, storage} from '../../firebase'
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
                url:url
              });     
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
        <div style={{maxWidth:"500px",margin:'auto'}}>
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12">            
              <input type="file" 
              id="autocomplete-input" 
              className="autocomplete"
              onChange={handleChange}/>                          
            {error && <div className="error">{error} </div>}
            {
                          data&&data.map((user, index)=>{                                           
                                return(
                                    <tr key={index}>
                                        <td><img src={user.url} style={{width:"100px"}}/></td>                                       
                                    </tr>
                                )                        
                          })
                      }                  
            </div> 
          </div>         
        </div>
      </div>
    )
}

export default Banners
