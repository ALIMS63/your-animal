
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Navigation from '../Navigation/Navigation';
import PersonalPage from '../PersonalPage/PersonalPage';
import Logout from '../Logout/Logout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Secret from '../Secret/Secret';
import Filter from '../Filter/Filter'
import { Button } from 'antd';
import NewAnimal from '../NewAnimal/NewAnimal';
import ModalFilter from '../Filter/ModalFilter';
import Anketa from '../Anketa';
import HomeRoute from '../HomeRoute/HomeRoute';
import UpdateAnimal from '../UpdateAnimal/UpdateAnimal';
import AnimalCard from '../AnimalCard/AnimalCard';
import OneAnimal from '../OneAnimal/OneAnimal';
import CleanFilter from '../Filter/CleanFilter'

import { useDispatch } from 'react-redux'
import { startAnimals } from '../../redux/actions'
import { Waypoint } from 'react-waypoint';

let video = document.getElementById('myVideo')
let waypointScrollY;
let scrollHandler = (event) => {

  if (waypointScrollY) {
    const diff = window.scrollY - waypointScrollY;
    const opacity = (window.innerHeight - diff) / (2 * window.innerHeight);

    video.style.opacity = opacity;
  }
};
function handlePositionChange(pos) {

  if (document.querySelector('.anketa')) {
    window.removeEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', scrollHandler);
    if (pos.currentPosition === 'inside' && pos.previousPosition === 'below') {
      waypointScrollY = window.scrollY;
      video.classList.add('video-toggle');
      video.style.top = waypointScrollY + 'px'
    }
    else if (pos.currentPosition === 'below' && pos.previousPosition === 'inside') {
      video.classList.remove('video-toggle')
      video.style.top = 0;
    }

  } 
}

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startAnimals())
  }, [])


  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <br />
            <ModalFilter />
            <CleanFilter />
            <Anketa />
            <Waypoint
              onPositionChange={handlePositionChange}
            />
            <AnimalCard />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/registration" exact>
            <Registration />
          </Route>

          <Route path="/logout" exact>
            <Logout />
          </Route>

          <HomeRoute path="/personalPage" exact>
            <PersonalPage />
          </HomeRoute>

          <Route path="/oneAnimal/:id" exact>
            <OneAnimal />
          </Route>

          <Route path="/update/:id" exact>
            <UpdateAnimal />
          </Route>

          <PrivateRoute path="/secret">
            <NewAnimal />
          </PrivateRoute>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
