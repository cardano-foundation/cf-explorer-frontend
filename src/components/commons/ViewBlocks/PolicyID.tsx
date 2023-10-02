import { Typography, useTheme } from "@mui/material";
import { useRef } from "react";

import { Polygon, PoundSign } from "src/commons/resources";
import PopContent from "src/components/Contracts/common/PopContent";

import { CircleBox, PolygonContainer, PolygonContent } from "./styles";
import PopperStyled from "../PopperStyled";

interface PolicyIDProps {
  hash?: string;
  detail?: (href: string) => string;
}

const PolicyID: React.FC<PolicyIDProps> = ({ hash, detail }) => {
  const anchorEl = useRef();
  const theme = useTheme();
  return (
    <PopperStyled
      placement="top"
      render={({ handleClick }) => (
        <PolygonContainer ref={anchorEl}>
          <Polygon />
          <PolygonContent>
            <Typography whiteSpace={"nowrap"} fontWeight={500} color={theme.palette.primary.main}>
              Policy ID
            </Typography>
            <CircleBox
              onClick={() =>
                typeof anchorEl !== "function" && anchorEl?.current && handleClick(anchorEl.current as HTMLElement)
              }
            >
              <PoundSign />
            </CircleBox>
          </PolygonContent>
        </PolygonContainer>
      )}
      content={<PopContent hash={hash || ""} detail={detail} />}
    />
  );
};

export default PolicyID;
