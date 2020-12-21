import React from 'react'
import {db,auth} from './firebase'
import StudentNavBar from "./Student/NavBar/StudentNavBar";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import StudentHome from "./Student/pages/StudentHome";
import StudentModules from "./Student/pages/StudentModules";
import LoginHome from "./Login-Register/LoginHome";
import StudentDeadlines from "./Student/pages/StudentDeadlines"
import StudentResults from "./Student/pages/Student Results"
import StudentFAQ from "./Student/pages/StudentFAQ";
import AdminHome from "./Admin/pages/AdminHome";
import AdminAnalytics from "./Admin/pages/AdminAnalytics";
import AdminClasses from "./Admin/pages/AdminClasses";
import AdminFAQ from "./Admin/pages/AdminFAQ";
import Test from "./Student/pages/Test";




class App extends React.Component {

    render() {
        return (
            <div>

                <Router>
                    <Switch>
                        <Route component={LoginHome} exact path="/"/>
                        <Route component={LoginHome} path="/LoginHome"/>
                        <Route component={StudentModules} path="/StudentModules"/>
                        <Route component={StudentDeadlines} path="/StudentDeadlines"/>
                        <Route component={StudentHome} path="/StudentHome"/>
                        <Route component={StudentResults} path="/StudentResults"/>
                        <Route component={StudentFAQ} path="/StudentFAQ"/>
                        <Route component={AdminHome} path="/AdminHome"/>
                        <Route component={AdminAnalytics} path="/AdminAnalytics"/>
                        <Route component={AdminClasses} path="/AdminClasses"/>
                        <Route component={AdminFAQ} path="/AdminFAQ"/>
                        <Route component={Test} path="/Test"/>

                    </Switch>
                </Router>
            </div>


        );
    }
}

export default App
