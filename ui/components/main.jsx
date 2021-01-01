import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './home'
import Colleges from "./colleges/colleges";
import Students from "./students/students";
import ViewCollege from "./colleges/viewCollege";
import CollegeByState from "./colleges/collegeByState";
import ViewStudent from "./students/viewStudent";

function Main() {
  return (
      <Router>
        <Switch>
          <Route exact path="/app/ts-dashboard/home" component={Home}/>
          <Route exact path="/app/ts-dashboard/colleges" component={Colleges}/>
          <Route exact path="/app/ts-dashboard/college/:college_id" component={ViewCollege}/>
          <Route exact path="/app/ts-dashboard/state/:state" component={CollegeByState}/>
          <Route exact path="/app/ts-dashboard/students" component={Students}/>
          <Route exact path="/app/ts-dashboard/student/:student_id" component={ViewStudent}/>
        </Switch>
      </Router>
  )
}

export default Main
