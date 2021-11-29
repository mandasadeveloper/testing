const Authentication = ()=>{
return(
    <div className="container-fluid px-4">
    <h1 className="mt-4">Authentication list</h1>
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
            <th scope="col">Identifier</th>           
            <th scope="col">Provide</th>
            <th scope="col">Create</th>                       
            <th scope="col">Signrd</th>
            <th scope="col">User UID</th>                                
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>7023294788</td>
                    <td>1234564656</td>
                    <td>9 number 2021</td>
                    <td>9 number 2021</td>    
                    <td>3ljtglrj;3j;ldjg;fjg</td>                
                </tr>
              {/* <?php $sno=1;            
              ?>           
              @foreach ($result as $item)            
                <tr>
                <th><a href="{{url('patient/'.$item->id)}}">{{$sno++}}</th>
                <td><a href="{{url('patient/'.$item->id)}}">{{$item->name}}</a></td>
                @if (session()->get('STAFF_USER_ID'))
                <td><a href="{{url('patient/'.$item->id)}}">{{$item->mobile}}</a></td>
                <td><a href="{{url('patient/'.$item->id)}}">{{$item->city}}</a></td>
                @endif   
                <td><a href="{{url('patient/'.$item->id)}}">{{date('d-M-Y h:i A', strtotime($item->apointment))}}</a></td>        
              </tr>             
              @endforeach                                */}
            </tbody>
            </table>
            </div>
            </div>
    </div>
  </div>
)
}
export default Authentication