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
import TransactionList from "./pages/TransactionList";
import TransactionDetail from "./pages/TransactionDetail";
import NotFound from "./pages/NotFound";
// import Epoch from "./pages/Epoch";
// import EpochDetail from "./pages/EpochDetail";

const Routes: React.FC<RouteComponentProps> = () => {
  return (
    <Switch>
      <Route path={routers.HOME} exact component={Home} />
      <Route path={routers.BLOCK_LIST} exact component={BlockList} />
      <Route path={routers.BLOCK_LIST_DETAIL} component={BlockDetail} />
      <Route path={routers.TRANSACTION_LIST} exact component={TransactionList} />
      <Route path={routers.TRANSACTION_DETAIL} exact component={TransactionDetail} />
      {/* <Route path={routers.EPOCH} component={Epoch} />
      <Route path={routers.EPOCH_DETAIL} component={EpochDetail} /> */}
      <Route path={routers.NOT_FOUND} exact component={NotFound} />
    </Switch>
  );
};

export default withRouter(Routes);
