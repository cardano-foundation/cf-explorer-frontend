import { Box } from "@mui/material";
import { useState } from "react";

import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import PoolUpdateModal from "./PoolUpdateModal";
import { PoolUpdatesDraw } from "./PoolUpdatesDraw";
import PoollUpdatesList from "./RecentPoolUpdates";

const PoollUpdates = () => {
  const [selected, setSelected] = useState<PoolUpdateItem | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { data } = useFetch<PoolUpdateDetail>(
    selected?.poolUpdateId ? API.SPO_LIFECYCLE.POOL_UPDATE_DETAIL(selected.poolUpdateId) : ""
  );

  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const handleSelect = (pool: PoolUpdateItem | null) => {
    setSelected(pool);
  };

  const handleToggleModal = () => setOpenModal((state) => !state);

  return (
    <Box>
      <PoolUpdateModal data={data} onClose={handleToggleModal} open={openModal} />
      <PoollUpdatesList onSelect={handleSelect} setShowBackButton={setShowBackButton} />
      {selected && (
        <PoolUpdatesDraw
          poolUpdates={selected}
          data={data}
          toggleModal={handleToggleModal}
          showBackButton={showBackButton}
        />
      )}
    </Box>
  );
};
export default PoollUpdates;
