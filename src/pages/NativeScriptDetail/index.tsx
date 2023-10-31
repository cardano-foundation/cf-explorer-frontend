import React from "react";

import NativeScriptsDetail from "src/components/NativeScriptsDetail";
import NativeScriptProvider from "src/components/NativeScriptsDetail/Tabs";

const NativeScriptsDetailPage: React.FC = () => {
  return (
    <NativeScriptProvider>
      <NativeScriptsDetail />
    </NativeScriptProvider>
  );
};

export default NativeScriptsDetailPage;
