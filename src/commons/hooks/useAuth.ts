import { useSelector } from "react-redux";
import { RootState } from "~/stores/types";

const useAuth = () => {
  const { userData } = useSelector(({ user }: RootState) => user);
  return {
    isLoggedIn: userData?.username
  };
};

export default useAuth;
