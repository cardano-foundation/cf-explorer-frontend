import React, { useEffect } from "react";

const MyProfile = () => {
  useEffect(() => {
    document.title = `My Profile | Cardano Explorer`;
  }, []);

  return <div>MyProfile</div>;
};

export default MyProfile;
