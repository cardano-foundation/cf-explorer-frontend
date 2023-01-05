import React from "react";
import { useSelector } from "react-redux";
import NotFound from "../../../../pages/NotFound";
import { RootState } from "../../../../stores/types";

interface Props {
  children: React.ReactNode;
}

const AccountLayout: React.FC<Props> = ({ children }) => {
  const { userData } = useSelector(({ user }: RootState) => user);
//   if (!userData) return <NotFound />;
  return <div>
    <div>Account Layout</div>
    {children}</div>;
};

export default AccountLayout;
