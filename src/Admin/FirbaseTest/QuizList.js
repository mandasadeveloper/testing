import {useState,useEffect} from 'react'
import {ExcelRenderer} from 'react-excel-renderer';
import AllTest from './AllTest';
import {db} from "../../firebase";

function QuizList() {
    var url = window.location.pathname;
    var splitUrl = url.split('/');   
    const uid = splitUrl[2];
const [data, setData]=useState();
const [state, setState] = useState({ 
  rows:"",
  quiztest:"",
  option_1:"",
  option_2:"",
  option_3:"",
  option_4:"",
  answer:""
  });
useEffect(() => {   
getData();
}, [])

const getData=()=>{
  db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc(uid).collection('quiz_list').get()
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


const handleInputs=(e)=>{
  const fileObj = e.target.files[0];
  ExcelRenderer(fileObj, (err, resp)=>{
    if(err){
      console.log(err);
    }
    else{  
      setState({        
        rows:resp.rows
      });
    }
  })

}


const Create = (e)=>{
  for(var i = 0; i<state.rows.length; i++)
if(i%7==0){
db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc(uid).collection('quiz_list').add({
  quiztest:state.rows[i],
  option_1:state.rows[i+1],
  option_2:state.rows[i+2],
  option_3:state.rows[i+3],
  option_4:state.rows[i+4],
  answer:state.rows[i+5],                 
  }).then(get=>{
    const test_uid = get.id;
    db.collection('Test').doc('Sw7DqGT7Nt5WnTJM7AcB').collection('Test_list').doc(uid).collection('quiz_list').doc(test_uid).update({
    test_id:test_uid,            
  })
  })
  getData();
}
}
    return (
    <div>
            <div style={{width:"90%", margin:"auto"}} >
        <div className="col s12">
          <div style={{marginTop:"10%", display:"block"}}>             
            <div className="input-field col s12" style={{maxWidth:"500px", margin:"5% 15%"}}>
              <input type="file" 
              id="autocomplete-description" 
              className="autocomplete"
              name="quiz_qustion"             
              onChange={handleInputs}/>                 
              <a onClick={Create} className="waves-effect btn">Create</a>
            </div>        
          </div>
        </div>
        <div className="row">
    <div className="col s12 m6">
     <AllTest data={data}/>
    </div>
  </div>
      </div>
    </div>
    )
}

export default QuizList
