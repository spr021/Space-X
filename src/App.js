import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/pages/Home";
import AllLaunches from "./views/pages/all-launches/AllLaunches"
import PastLaunches from "./views/pages/past-launches/PastLaunches"
import UpcomingLaunches from "./views/pages/upcoming-launches/UpcomingLaunches"
import NotFound404 from "./views/pages/not-found-404/NotFound404"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/all-launches">
          <AllLaunches />
        </Route>
        <Route exact path="/past-launches">
          <PastLaunches />
        </Route>
        <Route exact path="/upcoming-launches">
          <UpcomingLaunches />
        </Route>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
