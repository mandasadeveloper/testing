import { BrowserRouter} from "react-router-dom";
import Routing from "./Admin/routing";
import Front_Routing from "./front-page/routing";
function App() {
  var url = window.location.pathname;
  var splitUrl = url.split('/');   
  const uid = splitUrl[1];
  return (
 <BrowserRouter>
 {
   uid=='home'? 
<Front_Routing/>
:<Routing/>
 }
 </BrowserRouter>
  );
}
export default App;
