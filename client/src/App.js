import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import MainPage from './components/MainPage/mainPage';
import Query from './components/query/query.js';
import { DogDetail } from './components/dogDetail/dogDetail';


function App () {
  return (
    <React.Fragment>
          <Route exact path="/" component={MainPage}/>
           <Route path="/dogs" component={Query}/> 
           <Route path="/dog/:breedId" component={DogDetail}/> 
           
      </React.Fragment>
  );
}

export default App;
