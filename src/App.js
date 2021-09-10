import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/all-launches">
          {/* <AllLaunches /> */}
        </Route>
        <Route exact path="/past-launches">
          {/* <PastLaunches /> */}
        </Route>
        <Route exact path="/upcoming-launches">
          {/* <UpcomingLaunches /> */}
        </Route>
        <Route path="*">
          {/* <NotFound404 /> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
