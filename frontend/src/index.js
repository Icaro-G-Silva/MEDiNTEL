import React from 'react'
import {render as RenderPage} from 'react-dom'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import { ContextComponent } from './utils/Context'
import Login from './components/Login'
import Register from './components/Register'
import Main from './components/Main'
import UserUpdate from './components/UserUpdate'
import DoctorPatientView from './components/DoctorPatientView'

import './style.css'

RenderPage(
  <React.StrictMode>
    <ContextComponent>
      <Router>
        <Switch>
          <Route path="/login"><Login/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/main"><Main/></Route>
          <Route path="/update/user"><UserUpdate/></Route>
          <Route path="/patient/:rp"><DoctorPatientView/></Route>
        </Switch>
      </Router>
    </ContextComponent>
  </React.StrictMode>,
  document.getElementById('root')
)
