import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import MainPage from './components/mainPage';


function App () {
  return (
    <React.Fragment>
          <Route exact path="/" component={MainPage}/>
      </React.Fragment>
  );
}

export default App;
