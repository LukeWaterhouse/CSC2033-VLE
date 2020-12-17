import React from 'react'
import {db,auth} from './firebase'
import StudentNavBar from "./Student/NavBar/StudentNavBar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import StudentHome from "./Student/StudentHome";
import Modules from "./Student/Modules";

class App extends React.Component {


    render() {
        return (
            <Router>

            <div className="App">
                <StudentNavBar/>
                <Route path="/StudentHome" component={StudentHome}/>
                <Route path={"/Modules"} component={Modules}/>

            </div>
            </Router>
        );
    }
}

export default App
