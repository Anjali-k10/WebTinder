import {BrowserRouter,Route,Routes} from "react-router-dom"
import Body from './components/Body';
import SignIn from './components/SignIn';
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Request from "./components/Request";
import Connections from "./components/Connections";
const App = () => {
  return (
    <>
    <Provider store={appStore}>
     <BrowserRouter basename="/">
     <Routes>
     
      <Route path="/" element={<Body/>} >
      <Route path="/login" element={<SignIn/>} />
      <Route path="/feed" element={<Feed/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/connections" element={<Connections/>} />
      <Route path="/requests" element={<Request/>} />
      
      </Route>
     </Routes>
     </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
