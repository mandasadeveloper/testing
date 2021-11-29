import {useState, useEffect} from 'react'
import {db} from "../../firebase";

const UseFireStore = (collection)=>{
    const [docs, setDocs]=useState();

    useEffect(() => {
     const unsub = db.collection(collection)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap)=>{
          let document = []
          snap.forEach(doc=>{
              document.push({...doc.data(),id: doc.id});
          })
          setDocs(document);
      })
      return () => unsub();
    }, [collection])
    return {docs}
}

export default UseFireStore
