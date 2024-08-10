import {BrowserRouter,Route,Routes} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = '/signup' element = {<Signup />}></Route>
        <Route path = '/signin' element = {<Signin />}></Route>
        {/* <Route path = '/dashboard' element = {<Dashboard />}></Route>
        <Route path = '/send' element = {<SendMoney />}></Route> */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
