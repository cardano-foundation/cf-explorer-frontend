import { Box } from "@mui/material";

import DynamicEllipsisText from "src/components/DynamicEllipsisText";

import { StyledAddress, StyledSubNameTab } from "./styles";

const data = [
  "addr1q82l4tz757tg24d35m3rgty38va55c6pk404696hjg7jlvdg0rj4tr52ftal8ussc7xm9r62c0dnfae8gykz6t7xl57qmdya9p",
  "addr1h62l4tz757tg24d35m3rgty38va55c6pk204696hjg9jlvdg0rj4tr52ftal8ussc3xm1r62c0dnfae3gykz6t7xl57qhjgu6s",
  "addr1q82l4tz757tg24d35m3rgty38va55c6pk404696hjg7jlvdg0rj4tr52ftal8ussc7xm9r62c0dnfae8gykz6t7xl57qmdya9p",
  "addr1h62l4tz757tg24d35m3rgty38va55c6pk204696hjg9jlvdg0rj4tr52ftal8ussc3xm1r62c0dnfae3gykz6t7xl57qhjgu6s",
  "addr1q82l4tz757tg24d35m3rgty38va55c6pk404696hjg7jlvdg0rj4tr52ftal8ussc7xm9r62c0dnfae8gykz6t7xl57qmdya9p",
  "addr1h62l4tz757tg24d35m3rgty38va55c6pk204696hjg9jlvdg0rj4tr52ftal8ussc3xm1r62c0dnfae3gykz6t7xl57qhjgu6s",
  "addr1q82l4tz757tg24d35m3rgty38va55c6pk404696hjg7jlvdg0rj4tr52ftal8ussc7xm9r62c0dnfae8gykz6t7xl57qmdya9p",
  "addr1h62l4tz757tg24d35m3rgty38va55c6pk204696hjg9jlvdg0rj4tr52ftal8ussc3xm1r62c0dnfae3gykz6t7xl57qhjgu6s"
];

const TabAssociated = () => {
  return (
    <Box>
      <StyledSubNameTab>Associated Addresses:</StyledSubNameTab>
      <Box>
        {data.map((address: string, i: number) => (
          <StyledAddress key={address + i}>
            <DynamicEllipsisText value={address} />
          </StyledAddress>
        ))}
      </Box>
    </Box>
  );
};

export default TabAssociated;
