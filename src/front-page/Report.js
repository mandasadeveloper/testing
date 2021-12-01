const Report=({score})=>{ 
    return (   
      <div className="row">        
    <div className="col s12 m6">
      <div className="card darken-1">
      <div className="row" style={{padding:"10px"}}>
        <h2>Your Report</h2>
      <div className="row">
        <div className="input-field col s6">
        <p>Your Score={score.score} of {score.pageCount}</p>
        </div>
        <div className="input-field col s6">
          <p>Attempt Qustions={score.attempt}</p>          
      </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <p>Unattempt Qustions={score.unattempt}</p>         
        </div>
        <div className="input-field col s12">
        <p>Wrong Answer ={score.wrong}</p>                  
        </div>
      </div>                  
  </div>    
      </div>
    </div>
  </div>   
     
    )
}

export default Report
