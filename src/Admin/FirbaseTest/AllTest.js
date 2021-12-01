import React from 'react'
import Diagram from './Diagrams/diagram'

function AllTest({data}) {
return (    
        <div>
             {
         data&&data.map((user)=>{           
            return(
                    <ul className="collection with-header" key={user.test_id}>
                    <li className="collection-header"><h6>{user.quiztest}<Diagram id={user.test_id}/></h6></li>
                    <li className="collection-item">{user.option_1}</li>
                    <li className="collection-item">{user.option_2}</li>    
                    <li className="collection-item">{user.option_3}</li>
                    <li className="collection-item">{user.option_4}</li> 
                    </ul>  
            )
            
         })          
         }                             
        </div>
    )
}

export default AllTest
