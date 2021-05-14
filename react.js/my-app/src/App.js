import React from 'react';
import Sample from './Sample/Sam.jsx';
//import Test from './Test/Movie.jsx';
import Calculator from './Calculator/Test.jsx';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom';

function App() {
    const hello = < h1 > hello world11 </h1>;
    const hello1 = < h2 > hello world111 </h2>;
    return ( 
    <div className = "App" > { hello } { hello1 } <hr/>
    <div className="Router">
    <Router>
        <div className="Links">
            <Link to="/calc">Calculator</Link><br/>
            <Link to="/sample">Sample</Link>
        </div>
        <Route path="/calc" component={Calculator} />
        <Route path="/sample" component={Sample} />
    </Router>
     </div>
    </div>
    );

}


    export default App;