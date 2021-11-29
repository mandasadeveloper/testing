import React from 'react'

function AllTest({data,answer}) {
const CheckAnswer = (option,ans,click)=>{            
    if(option==ans){
    if(ans==click){
        return {background:"blueviolet"}
        }
    return {background:"green"}
    }
    
    else if(option==click){
    if(click!=ans){
        return {background:"red"}
    }
    }  
     
}
return (    
        <div>
            <h4>Answer Sheet</h4>
             {
         data&&data.map((user)=>{                                                 
            return(
                    <ul className="collection with-header" key={user.test_id}>
                    <li className="collection-header"><h6>{user.quiztest}</h6></li>
                    <li className="collection-item" style={CheckAnswer(user.option_1[0],user.answer[0],answer[user.test_id])}>{user.option_1}</li>
                    <li className="collection-item" style={CheckAnswer(user.option_2[0],user.answer[0],answer[user.test_id])}>{user.option_2}</li>    
                    <li className="collection-item" style={CheckAnswer(user.option_3[0],user.answer[0],answer[user.test_id])}>{user.option_3}</li>
                    <li className="collection-item" style={CheckAnswer(user.option_4[0],user.answer[0],answer[user.test_id])}>{user.option_4}</li>                                                        
                    </ul>  
            )           
         })         
         }                             
        </div>
    )
}

export default AllTest
