import React from 'react'
import {db,auth} from './firebase'
import StudentNavBar from "./Student/NavBar/StudentNavBar";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import StudentHome from "./Student/pages/StudentHome";
import StudentModules from "./Student/pages/StudentModules";
import LoginHome from "./Login-Register/LoginHome";
import StudentDeadlines from "./Student/pages/StudentDeadlines"
import StudentResults from "./Student/pages/Student Results"
import StudentThreads from "./Student/pages/StudentThreads";
import StudentDiscussionBoard from "./Student/pages/StudentDiscussionBoard";
import AdminHome from "./Admin/pages/AdminHome";
import AdminAnalytics from "./Admin/pages/AdminAnalytics";
import AdminClasses from "./Admin/pages/AdminClasses";
import AdminDiscussionBoard from "./Admin/pages/AdminDiscussionBoard";
import AdminThreads from "./Admin/pages/AdminThreads";
import Test from "./Student/pages/Test";
import {createStore} from 'redux';






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
                        <Route component={StudentThreads} path="/StudentThreads"/>
                        <Route component={StudentDiscussionBoard} path="/StudentDiscussion/:thread"/>
                        <Route component={AdminHome} path="/AdminHome"/>
                        <Route component={AdminAnalytics} path="/AdminAnalytics"/>
                        <Route component={AdminClasses} path="/AdminClasses"/>
                        <Route component={AdminDiscussionBoard} path="/AdminDiscussion/:thread"/>
                        <Route component={AdminThreads} path="/AdminThreads"/>
                        <Route component={Test} path="/Test"/>

                    </Switch>
                </Router>
            </div>


        );
    }
}

export default App
