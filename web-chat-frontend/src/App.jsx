import {BrowserRouter,Route,Routes} from "react-router-dom"
import Body from './components/Body';
import SignIn from './components/SignIn';
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
const App = () => {
  return (
    <>
    <Provider store={appStore}>
     <BrowserRouter basename="/">
     <Routes>
     
      <Route path="/" element={<Body/>} >
      <Route path="/login" element={<SignIn/>} />
      </Route>
     </Routes>
     </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
