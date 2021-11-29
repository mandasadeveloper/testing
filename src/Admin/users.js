import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {db} from "../firebase";
const User = ()=>{
    const [data, setData]=useState();    
    useEffect(() => {      
        getData();
    }, [])
    const getData = ()=>{
        db.collection('USERS').get()
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
    const deleteData=(uid)=>{
        db.collection('USERS').doc(uid).delete()
        .then(()=>{           
            getData();
        })
    }
    return(
        <div className="container-fluid px-4">
        <h1 className="mt-4">User list</h1>
        <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-table me-1"></i>
                User List                                                               
            </div>
                <div className="card-body-1">
                <div className="table-responsive">   
                         
                <table id="datatablesSimple" className="table">
                <thead >
                <tr>
                <th scope="col">Sr No.</th> 
                <th scope="col">User Name</th>           
                <th scope="col">Phone</th>
                <th scope="col">City</th>                       
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>                                
                </tr>
                </thead>
                <tbody> 
                      {
                          data&&data.map((user, index)=>{                           
                                return(
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{user.student_name}</td>
                                        <td>{user.phone_number}</td>
                                        <td>{user.city}</td>
                                        <td><Link to={`/edit/${user.uid}`}>Edit</Link></td>
                                        <td><button onClick={()=>deleteData(user.uid)}>Delete</button></td>
                                    </tr>
                                )                        
                          })
                      }               
                </tbody>                
                </table>
                </div>
                </div>
        </div>
      </div>
    )
    }
    export default User