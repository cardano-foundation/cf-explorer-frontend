import React from "react";
import { Route, Switch } from "react-router-dom";
import { routers } from "./commons/routers";
import Home from "./pages/Home";
import BlockList from "./pages/BlockList";
import BlockDetail from "./pages/BlockDetail";
import TransactionList from "./pages/TransactionList";
import TransactionDetail from "./pages/TransactionDetail";
import NotFound from "./pages/NotFound";
import Epoch from "./pages/Epoch";
import EpochDetail from "./pages/EpochDetail";
import DelegationPools from "./pages/DelegationPools";
import DelegationDetail from "./pages/DelegationDetail";
import RegistrationPools from "./pages/RegistrationPools";
import Tokens from "./pages/Token";
import TokenDetail from "./pages/TokenDetail";
import Stake from "./pages/Stake";
import StakeDetail from "./pages/StakeDetail";
import AddressWalletDetail from "./pages/AddressWalletDetail";
import PolicyDetail from "./pages/PolicyDetail";
import ContractList from "./pages/ContractList";
import ContractDetail from "./pages/ContractDetail";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={routers.HOME} exact component={Home} />
      <Route path={routers.BLOCK_LIST} exact component={BlockList} />
      <Route path={routers.BLOCK_DETAIL} component={BlockDetail} />
      <Route path={routers.TRANSACTION_LIST} exact component={TransactionList} />
      <Route path={routers.TRANSACTION_DETAIL} exact component={TransactionDetail} />
      <Route path={routers.EPOCH_LIST} exact component={Epoch} />
      <Route path={routers.EPOCH_DETAIL} exact component={EpochDetail} />
      <Route path={routers.DELEGATION_POOLS} exact component={DelegationPools} />
      <Route path={routers.DELEGATION_POOL_DETAIL} exact component={DelegationDetail} />
      <Route path={routers.REGISTRATION_POOLS} exact component={RegistrationPools} />
      <Route path={routers.TOKEN_LIST} exact component={Tokens} />
      <Route path={routers.TOKEN_DETAIL} exact component={TokenDetail} />
      <Route path={routers.STAKE_LIST} exact component={Stake} />
      <Route path={routers.STAKE_DETAIL} exact component={StakeDetail} />
      <Route path={routers.CONTRACT_LIST} exact component={ContractList} />
      <Route path={routers.CONTRACT_DETAIL} exact component={ContractDetail} />
      <Route path={routers.ADDRESS_DETAIL} exact component={AddressWalletDetail} />
      <Route path={routers.POLICY_DETAIL} exact component={PolicyDetail} />
      <Route path={routers.NOT_FOUND} component={NotFound} />
    </Switch>
  );
};

export default Routes;
