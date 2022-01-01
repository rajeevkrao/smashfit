import React,{Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import { Route, Routes } from'react-router-dom';

import Hit from'./workouts/hit.js';
import BalTrain from'./workouts/baltrain.js';
import MuscleTraining from "./workouts/muscletraining.js"

render((
<BrowserRouter>
  <Routes>
    <Route path="/workouts/hit" element={<Hit />} />
	  <Route path="/workouts/baltrain" element={<BalTrain />} />
    <Route path="/workouts/muscletraining" element={<MuscleTraining />} />
  </Routes>
</BrowserRouter> 
), document.getElementById('App'));