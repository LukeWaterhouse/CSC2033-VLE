import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StudentHome from "./Student/pages/StudentHome";
import StudentModules from "./Student/pages/StudentModules";
import Signup from "./Login-Register/Signup";
import StudentDeadlines from "./Student/pages/StudentDeadlines";
import StudentResults from "./Student/pages/StudentResults";
import StudentThreads from "./Student/pages/StudentThreads";
import StudentDiscussionBoard from "./Student/pages/StudentDiscussionBoard";
import AdminHome from "./Admin/pages/AdminHome";
import AdminAnalytics from "./Admin/pages/AdminAnalytics";
import AdminClasses from "./Admin/pages/AdminClasses";
import AdminDiscussionBoard from "./Admin/pages/AdminDiscussionBoard";
import ViewFeedbackModuleList from "./Admin/pages/ViewFeedbackModuleList";
import AdminThreads from "./Admin/pages/AdminThreads";
import GiveFeedbackModuleList from "./Student/pages/GiveFeedbackModuleList";
import ViewFeedbackPage from "./Admin/pages/ViewFeedbackPage";
import GiveFeedbackPage from "./Student/pages/GiveFeedbackPage";
import AdminAssignments from "./Admin/pages/AdminAssignments";
import ViewAssignments from "./Admin/pages/ViewAssignments";
import AssignmentDetails from "./Admin/pages/AssignmentDetails";
import StudentAssignment from "./Student/pages/StudentAssignment";
import StudentAssignmentView from "./Student/pages/StudentAssignmentView";
import StudentAssignmentDetails from "./Student/pages/StudentAssignmentDetails";

/**
 * Created by: Luke Waterhouse
 * This file contains the root of our project as well as imports and handles all the urls for the different routes
 * and which components they are specific to. All team members have added routes and urls to their pages as the project
 * has developed
 */

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route component={Signup} exact path="/" />
            <Route component={Signup} exact path="/Signup" />
            <Route component={StudentModules} path="/StudentModules" />
            <Route component={StudentDeadlines} path="/StudentDeadlines" />
            <Route component={StudentHome} path="/StudentHome" />
            <Route component={StudentAssignment} path="/StudentAssignment" />
            <Route
              component={StudentAssignmentView}
              path="/StudentAssignmentView/:module"
            />
            <Route
              component={StudentAssignmentDetails}
              path="/StudentAssignmentDetails/:module/:details"
            />
            <Route component={StudentResults} path="/StudentResults" />
            <Route component={StudentThreads} path="/StudentThreads" />
            <Route component={GiveFeedbackModuleList} path="/StudentFeedback" />
            <Route
              component={GiveFeedbackPage}
              path="/GiveFeedbackPage/:module"
            />

            <Route
              component={StudentDiscussionBoard}
              path="/StudentDiscussion/:thread"
            />

            <Route component={AdminHome} path="/AdminHome" />
            <Route component={AdminAnalytics} path="/AdminAnalytics" />
            <Route component={AdminClasses} path="/AdminClasses" />
            <Route
              component={AdminDiscussionBoard}
              path="/AdminDiscussion/:thread"
            />
            <Route component={AdminAssignments} path="/AdminAssignments" />
            <Route
              component={ViewAssignments}
              path="/ViewAssignments/:module"
            />
            <Route
              component={AssignmentDetails}
              path="/AssignmentDetails/:module/:details"
            />
            <Route component={AdminThreads} path="/AdminThreads" />
            <Route
              component={ViewFeedbackModuleList}
              path="/ViewFeedbackModuleList"
            />
            <Route
              component={ViewFeedbackPage}
              path="/ViewFeedbackPage/:module"
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
