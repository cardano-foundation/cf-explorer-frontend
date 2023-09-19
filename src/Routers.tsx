import { changeLanguage } from "i18next";
import React, { useEffect } from "react";
import { Redirect, Route, RouteProps, Switch, useHistory } from "react-router-dom";
import { useAsync, useLocalStorage } from "react-use";

import useAuth from "./commons/hooks/useAuth";
import { routers } from "./commons/routers";
import { APP_LANGUAGES, NETWORK, NETWORK_TYPES, SUPPORTED_LANGUAGES } from "./commons/utils/constants";
import { handleChangeLanguage } from "./commons/utils/helper";
import { getAllBookmarks } from "./commons/utils/userRequest";
import AccountLayout from "./components/commons/Layout/AccountLayout";
import i18n from "./i18n";
import AddressWalletDetail from "./pages/AddressWalletDetail";
import BlockDetail from "./pages/BlockDetail";
import BlockList from "./pages/BlockList";
import Bookmark from "./pages/Bookmark";
import ContractDetail from "./pages/ContractDetail";
import ContractList from "./pages/ContractList";
import DelegationDetail from "./pages/DelegationDetail";
import DelegationPools from "./pages/DelegationPools";
import DelegatorLifecycle from "./pages/DelegatorLifecycle";
import Epoch from "./pages/Epoch";
import EpochDetail from "./pages/EpochDetail";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import InstantRewards from "./pages/InstantRewards";
import MyProfile from "./pages/MyProfile";
import NotFound from "./pages/NotFound";
import PolicyDetail from "./pages/PolicyDetail";
import ProtocolParameter from "./pages/ProtocolParameter";
import FAQ from "./pages/Refference/FAQ";
import Policy from "./pages/Refference/Policy";
import TermOfServices from "./pages/Refference/TermOfServices";
import RegistrationPools, { POOL_TYPE } from "./pages/RegistrationPools";
import ReportGeneratedPoolDetail from "./pages/ReportGeneratedPoolDetail";
import ReportGeneratedStakingDetail from "./pages/ReportGeneratedStakingDetail";
import ResetPassword from "./pages/ResetPassword";
import SPOLifecycle from "./pages/SPOLifecycle";
import SearchResult from "./pages/SearchResult";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Stake, { STAKE_ADDRESS_TYPE } from "./pages/Stake";
import StakeDelegations from "./pages/StakeDelegations";
import StakeDetail from "./pages/StakeDetail";
import StakingLifecycle from "./pages/StakingLifecycle";
import Tokens from "./pages/Token";
import TokenDetail from "./pages/TokenDetail";
import TopAddresses from "./pages/TopAddresses";
import TopDelegators from "./pages/TopDelegators";
import TransactionDetail from "./pages/TransactionDetail";
import TransactionList from "./pages/TransactionList";
import VerifyEmail from "./pages/VerifyEmail";
import { setOpenSyncBookmarkModal } from "./stores/user";

const StakeAddressRegistration = () => <Stake stakeAddressType={STAKE_ADDRESS_TYPE.REGISTRATION} />;
const StakeAddressDeregistration = () => <Stake stakeAddressType={STAKE_ADDRESS_TYPE.DEREREGISTRATION} />;

const PoolsCertificate = () => <RegistrationPools poolType={POOL_TYPE.REGISTRATION} />;
const PoolsDeregistration = () => <RegistrationPools poolType={POOL_TYPE.DEREREGISTRATION} />;

const Routes: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [, setBookmark] = useLocalStorage<Bookmark[]>("bookmark", []);
  const history = useHistory();

  useAsync(async () => {
    if (isLoggedIn) {
      if (
        (((JSON.parse(localStorage.getItem("bookmark") || "[]") as Bookmark[]) || [])?.filter((r) => !r.id) || [])
          .length > 0
      ) {
        setOpenSyncBookmarkModal(true);
      } else {
        const { data } = await getAllBookmarks(NETWORK_TYPES[NETWORK]);
        if (data) {
          setBookmark(data);
        }
      }
    }
  }, []);

  useEffect(() => {
    const pattern = /^\/([a-z]{2})\//;
    const currentLanguage = window.location.pathname.match(pattern)?.[1];
    if (!currentLanguage || !SUPPORTED_LANGUAGES.includes(currentLanguage)) {
      changeLanguage(APP_LANGUAGES.ENGLISH);
      handleChangeLanguage(APP_LANGUAGES.ENGLISH, currentLanguage as APP_LANGUAGES);
    } else if (SUPPORTED_LANGUAGES.includes(currentLanguage) && i18n.language !== currentLanguage) {
      changeLanguage(currentLanguage);
    }
  }, [history, i18n]);

  return (
    <Switch>
      <Route path={routers.SIGN_IN} exact component={SignIn} />
      <Route path={routers.SIGN_UP} exact component={SignUp} />
      <Route path={routers.VERIFY_EMAIL} exact component={VerifyEmail} />
      <Route path={routers.FORGOT_PASSWORD} exact component={ForgotPassword} />
      <Route path={routers.RESET_PASSWORD} exact component={ResetPassword} />
      <Route path={routers.HOME} exact component={Home} />
      <Route path={routers.BLOCK_LIST} exact component={BlockList} />
      <Route path={routers.BLOCK_DETAIL} component={BlockDetail} />
      <Route path={routers.TRANSACTION_LIST} exact component={TransactionList} />
      <Route path={routers.TRANSACTION_DETAIL} component={TransactionDetail} />
      <Route path={routers.EPOCH_LIST} exact component={Epoch} />
      <Route path={routers.EPOCH_DETAIL} exact component={EpochDetail} />
      <Route path={routers.DELEGATION_POOLS} exact component={DelegationPools} />
      <Route path={routers.DELEGATION_POOL_DETAIL} exact component={DelegationDetail} />
      <Route path={routers.POOL_CERTIFICATE} exact component={PoolsCertificate} />
      <Route path={routers.POOL_DEREGISTRATION} exact component={PoolsDeregistration} />
      <Route path={routers.TOKEN_LIST} exact component={Tokens} />
      <Route path={routers.TOKEN_DETAIL} exact component={TokenDetail} />
      <Route path={routers.STAKE_ADDRESS_REGISTRATION} exact component={StakeAddressRegistration} />
      <Route path={routers.STAKE_ADDRESS_DEREGISTRATION} exact component={StakeAddressDeregistration} />
      <Route path={routers.STAKE_DETAIL} exact component={StakeDetail} />
      <Route path={routers.CONTRACT_LIST} exact component={ContractList} />
      <Route path={routers.CONTRACT_DETAIL} exact component={ContractDetail} />
      <Route path={routers.ADDRESS_DETAIL} exact component={AddressWalletDetail} />
      <Route path={routers.POLICY_DETAIL} exact component={PolicyDetail} />
      <Route path={routers.ADDRESS_LIST} exact component={TopAddresses} />
      <Route path={routers.TOP_DELEGATOR} exact component={TopDelegators} />
      <Route path={routers.STAKING_LIFECYCLE} exact component={StakingLifecycle} />
      <PrivateRoute path={routers.REPORT_GENERATED_STAKING_DETAIL} exact component={ReportGeneratedStakingDetail} />
      <PrivateRoute path={routers.REPORT_GENERATED_POOL_DETAIL} exact component={ReportGeneratedPoolDetail} />
      <Route path={routers.PROTOCOL_PARAMETER} exact component={ProtocolParameter} />
      <Route path={routers.SEARCH} exact component={SearchResult} />
      <Route path={routers.DELEGATOR_LIFECYCLE} exact component={DelegatorLifecycle} />
      <Route path={routers.SPO_LIFECYCLE} exact component={SPOLifecycle} />
      <Route path={routers.STAKE_ADDRESS_DELEGATIONS} exact component={StakeDelegations} />
      <Route path={routers.INSTANTANEOUS_REWARDS} exact component={InstantRewards} />
      <Route path={routers.FAQ} exact component={FAQ} />
      <Route path={routers.POLICY} exact component={Policy} />
      <Route path={routers.TERMS_OF_SERVICE} exact component={TermOfServices} />
      <Route path={routers.NOT_FOUND} component={NotFound} />
      <Route path={routers.ACCOUNT}>
        <AccountLayout>
          <Switch>
            <Route path={routers.ACCOUNT} exact component={() => <Redirect to={routers.MY_PROFILE} />} />
            <Route path={routers.MY_PROFILE} exact component={MyProfile} />
            <Route path={routers.BOOKMARK} exact component={Bookmark} />
            <Route path={routers.NOT_FOUND} component={NotFound} />
          </Switch>
        </AccountLayout>
      </Route>
    </Switch>
  );
};

interface PrivateRouteProps {
  component: React.ComponentType<RouteProps>;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Routes;
