import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Route,Routes, BrowserRouter as Router} from "react-router-dom";
import CurriculumList from './CurriculumList';
import EventCalendar from './Calendar';

//const CurriculumList = React.lazy(() => import("./CurriculumList"));
function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<CurriculumList />}/>
        <Route path = "/curriculumlist" element = {<CurriculumList />}/>
        <Route path = "/calendar" element = {<EventCalendar />}/>
        <Route path = "/calendar/:cohort" element = {<EventCalendar />}/>
      </Routes>
    </Router>
  );
}

export default App;
