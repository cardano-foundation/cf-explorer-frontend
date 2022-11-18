import React from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { routers } from "./commons/routers";
import Home from "./pages/Home";
import BlockList from "./pages/BlockList";
import BlockDetail from "./pages/BlockDetail";
import NotFound from "./pages/NotFound";

const Routes: React.FC<RouteComponentProps> = () => {
  return (
    <Switch>
      <Route path={routers.HOME} exact component={Home} />
      <Route path={routers.BLOCK_LIST} exact component={BlockList} />
      <Route path={routers.BLOCK_LIST_DETAIL} component={BlockDetail} />
      <Route path={routers.NOT_FOUND} exact component={NotFound} />
    </Switch>
  );
};

export default withRouter(Routes);
