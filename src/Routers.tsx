import React from "react";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { routers } from "./commons/routers";
import Home from './pages/Home';
import NotFound from './pages/NotFound';


const Routes: React.FC<RouteComponentProps> = () => {
  return (
    <Switch>
      <Route path={routers.HOME} exact component={Home} />
      <Route path={routers.NOT_FOUND} exact component={NotFound} />
    </Switch>
  );
};

export default withRouter(Routes);
