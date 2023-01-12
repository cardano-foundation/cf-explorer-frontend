import React, { useEffect } from "react";

const PrivateNotes = () => {

  useEffect(() => {
    window.history.replaceState({}, document.title);
    document.title = `My Notes | Cardano Explorer`;
  }, []);
  
  return <div>Private Notes</div>;
};

export default PrivateNotes;
