import { Box, Grid } from "@mui/material";

import { NativeScriptCard } from "./Card";

const TabNativeScripts = () => {
  // const { search } = useLocation();
  // const pageInfo = getPageInfo(search);

  // const fetchData = useFetchList<NativeScripts>(API.SCRIPTS.NATIVE_SCRIPTS, pageInfo);

  return (
    <Box data-testid="TabNativeScripts">
      <Box>filter and paging</Box>
      <Box component={Grid} container spacing={2} width={"100%"}>
        <Grid item width={"100%"} lg={3} sm={12}>
          <NativeScriptCard data={fakeData} />
        </Grid>
        <Grid item width={"100%"} lg={3} sm={12}>
          <NativeScriptCard data={fakeData} />
        </Grid>
        <Grid item width={"100%"} lg={3} sm={12}>
          <NativeScriptCard data={fakeData} />
        </Grid>
        <Grid item width={"100%"} lg={3} sm={12}>
          <NativeScriptCard data={fakeData} />
        </Grid>
      </Box>
    </Box>
  );
};

export default TabNativeScripts;

const fakeData = {
  scriptHash: "c72d9ea7066384e2b5f243dded5af3042fee16be1f346553bb04e5fa",
  numberOfTokens: 20,
  numberOfAssetHolders: 12,
  multiSig: true,
  timeLock: "2023/12/19 09:30:43"
};
