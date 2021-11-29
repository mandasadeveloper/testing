import React, { useState,useEffect } from 'react'
import {storage, db, timestamp} from "../../firebase";


const Storage = (file)=>{
    const [progress, setProgress] = useState() 
    const [error, setError] = useState() 
    const [url, setUrl] = useState() 
useEffect(() => {
   const storageRef = storage.ref(file.name);
   const collection = db.collection('images');
   storageRef.put(file).on('state_changed', (snap)=>{
       let percentage = (snap.bytesTransferred /snap.totalBytes)*100;
       setProgress(percentage);
   },(err)=>{
       setError(err);
   },
   async ()=>{
       const url =await storageRef.getDownloadURL();
       const createdAt = timestamp();
       collection.add({url, createdAt})
       setUrl(url);
   })
}, [file])
    return {progress, url, error}
}

export default Storage
