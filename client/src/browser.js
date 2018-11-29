import React from "react";
import { render } from "react-dom";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storeFactory from "./store/storeFactory";
//import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
//import createBrowserHistory from 'history/createBrowserHistory';
//import StudentHome from './components/ui/student/question/StudentHome';
//import createBrowserHistory from 'history/createBrowserHistory';
//import Student from "./components/ui/student/Student";
import Login from "./components/Login";
import Home from "./components/Home";
import AnalystReportContainer from "./components/ui/analyst/AnalystReportContainer";
import "./stylesheets/main.scss";

//const history = createBrowserHistory();
//export default history;

//const history = createBrowserHistory();
// return a middleware enhanced store
const store = storeFactory();
let persistor = persistStore(store);
render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router basename="/">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/analyst-report/:id" component={AnalystReportContainer} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
