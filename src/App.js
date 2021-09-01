import { React, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './pages/Homepage';
import Property from './pages/Property'
import Backdrop from './components/Backdrop';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar';
//import NavbarUser from './components/NavbarUser'
import Dashboard from './pages/Dashboard';
import Confirmation from './components/Confirmation';
import Forent from './pages/Forent';
import AddNewProperty from './pages/AddNewProperty';
//import Loader from './components/Loader';

import Loader from './components/Loader';




function App() {
  const [isShowSignUp, setIsShowSignUp] = useState(false)
  const [isShowSigIn, setIsShowSigIn] = useState(false)
  const [confirmation,setConfirmation] = useState(false)


  const hide = () => {
    setIsShowSignUp(false)
    setIsShowSigIn(false)
    setConfirmation(false)
  }
   
  const showSignUp = () => {
    setIsShowSignUp(true)
    setIsShowSigIn(false)
  }
   const showSignIn = () => {
    setIsShowSignUp(false)
     setIsShowSigIn(!isShowSigIn)
     setConfirmation(false)
   }
  const showConfirmation = () => {
    setIsShowSignUp(false)
    setConfirmation(true)
    
  }
  return (
    <Router>
    <div className="App">
      <NavBar clickeventIn={showSignIn} />
        <Backdrop showUp={isShowSignUp} showIn={isShowSigIn} showConfirm={confirmation} clickevent={hide} />
        <Signup showSignUp={isShowSignUp} clickeventIn={showSignIn} showConfirmation={showConfirmation} />
        <SignIn showSignIn={isShowSigIn} clickeventUp={showSignUp} setIsShowSigIn={setIsShowSigIn} />
        <Confirmation confirmation={ confirmation} clickeventIn={showSignIn}/>
        <main>
          <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route exact path="/properties/:id" component={Property} />
            <Route exact path="/dashboard/:id" component={Dashboard}/>
            <Route exact path="/properties" component={Forent}/>

            <Route exact path="/AddNewProperty" children={<AddNewProperty/>} />

          </Switch>
        </main>
        {/* <NavbarUser />
        <Dashboard /> */}
        {/* <Confirmation /> */}
        {/* <Forent /> */}
        {/* <Property/> */}
       
        </div>
      </Router>
  );
}

export default App;
