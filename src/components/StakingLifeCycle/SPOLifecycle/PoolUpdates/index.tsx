import { useState } from "react";
import { Box } from "@mui/material";

import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";

import { PoolUpdatesDraw } from "./PoolUpdatesDraw";
import PoolUpdateModal from "./PoolUpdateModal";
import RecentPoolUpdates from "./RecentPoolUpdates";

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
      <RecentPoolUpdates onSelect={handleSelect} setShowBackButton={setShowBackButton} />
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
