import React from 'react'
import {db,auth} from './firebase'
import StudentNavBar from "./Student/NavBar/StudentNavBar";
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StudentHome from "./Student/pages/StudentHome";
import StudentModules from "./Student/pages/StudentModules";



class App extends React.Component {

    render() {
        return (
            <Router>
            <div className="App">
                <StudentNavBar/>
                <h1>I think all the components are pretty much meant to be imported into App.js</h1>
                <Route path="/StudentHome" component={StudentHome}/>
                <Route path="/StudentModules" component={StudentModules}/>
                <Route path="/StudentDeadlines" component={StudentHome}/>

            </div>
            </Router>
        );
    }
}

export default App
