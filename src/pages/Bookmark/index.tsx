import React, { useEffect } from "react";

const Bookmark = () => {

  useEffect(() => { 
    document.title = `Bookmarks | Cardano Explorer`;
  }, []);

  return <div>Bookmark</div>;
};

export default Bookmark;
