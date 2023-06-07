import { useSelector } from "react-redux";

import { RootState } from "src/stores/types";

const useAuth = () => {
  const { userData } = useSelector(({ user }: RootState) => user);
  return {
    isLoggedIn: userData?.email || userData?.address || userData?.wallet
  };
};

export default useAuth;
