import { BrowserRouter} from "react-router-dom"
import Front_Routing from "./front-page/routing";
function App() {  
  return (
 <BrowserRouter basename={'/pscadda_2021'}> 
<Front_Routing/>
 </BrowserRouter> 
  );
}
export default App;
