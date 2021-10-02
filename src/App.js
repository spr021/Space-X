import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/pages/Home";
import LaunchesList from "./views/pages/launches-list/LaunchesList"
import NotFound404 from "./views/pages/not-found-404/NotFound404"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/all-launches">
          <LaunchesList />
        </Route>
        <Route exact path="/past-launches">
          <LaunchesList type="past" />
        </Route>
        <Route exact path="/upcoming-launches">
          <LaunchesList type="upcoming" />
        </Route>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
