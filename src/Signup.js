import React from 'react'
import {useState} from 'react' 
import {auth} from './firebase'
import {useHistory} from 'react-router-dom'
function Signup() {
  const [email, setEmail]= useState();
  const [password, setpassword]= useState();
  const history =useHistory();
  const Submit = async (e)=>{
    e.preventDefault();
    try{
      const result = await auth.createUserWithEmailAndPassword(email,password)
      window.M.toast({html:`welcome ${result.user.email}`,classes:'green'})
      history.push('/')
    } catch(err){
      window.M.toast({html:err.message,classes:"green"})
    }  
    setEmail('');
    setpassword('');
  }
    return (
<div className="row" style={{maxWidth:"500px"}}>
    <form className="col s12" onSubmit={Submit}>
    <div className="row">
        <div className="input-field col s12">
          <input id="email" 
            type="email" 
            className="validate"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          <label htmlFor="email">Email</label>
        </div>
      </div>    
      <div className="row">
        <div className="input-field col s12">
          <input id="password"
           type="password" 
           className="validate"
           value={password}
           onChange={(e)=>setpassword(e.target.value)}/>
          <label htmlFor ="password">Password</label>
        </div>        
      </div>  
      <button className="waves-effect waves-light btn">Signup</button>   
    </form>
</div>
    )
}

export default Signup
