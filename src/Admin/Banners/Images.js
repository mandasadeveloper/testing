import React, { useState,useEffect } from 'react'
import ImageGrid from './ImageGrid';
import ProgressBar from './ProgressBar';

function Images() {
    const [file, setFile] = useState({})   
    const [error, setError] = useState() 
    const types = ['image/png','image/jpeg'];
    const handleChange = (e)=>{
      const selected=e.target.files[0];
      if(selected && types.includes(selected.type)){
        setFile(selected);
        setError('');
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
            {/* <button onClick={Upload} className="waves-effect waves-light btn">Update</button>    */}     
            {error && <div className="error">{error} </div>} 
            {file && <div>{file.name} </div>}   
            {file && <ProgressBar file={file} setFile={setFile}/>}   
            <ImageGrid />                  
            </div> 
          </div>         
        </div>
      </div>
    )
}

export default Images
