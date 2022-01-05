import React,{Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
//import FacebookLogin from 'react-facebook-login';
//import Routes from './route'

import { Route, Routes } from'react-router-dom';
import Home from'./components/home';
// import VideoSpam from'./pages/VideoSpam';
// import Examp from'./pages/examp';
// import Login from'./pages/Login';
// import Blog from'./Blog/Home';
// import logs from'./chat/logger';
// import dchat from './dchat/chat';

render((
<BrowserRouter>
  <Routes>
    <Route path="/react.html" element={<Home />} />
  </Routes>
</BrowserRouter> 
), document.getElementById('App'));

/*
          <Route exact path='/workout' component={Home}/>
					<Route exact path='/videospam' component={VideoSpam}/> 
          <Route exact path='/login' component={Login}/>
          <Route exact path='/logout' component={Examp}/>
          <Route exact path='/logs' component={logs}/>
          <Route exact path='/dchats/:channel' component={dchat}/>
*/