import react from "react";
import './App.css';
import Tumorboard from './components/Tumorboardinterface';
import Patient from './Componentspatient/Patientinterface';
import {BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div id="header">
          <div id="sub_header">
            <div id="header_sec_1">   
            </div>
            <div id="header_sec_2">
              <div id="header_buttons">
               <Link to="/tumorboardinterface"><button id="tumorboard">Tumorboard</button></Link> 
                <Link to="/patient"><button id="patients">Patients</button></Link>
              </div>
            </div>
            <div id="header_sec_3">
              <i className="fas fa-user" />
            </div>
          </div>
        </div>
        <Route path="/tumorboardinterface" component={Tumorboard}></Route>
        <Route path="/patient" component={Patient}></Route>  
      </Router>
     
    </div>
  );
}

export default App;
