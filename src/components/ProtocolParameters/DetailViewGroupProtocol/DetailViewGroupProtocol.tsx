import { CgClose } from "react-icons/cg";
import { isArray } from "lodash";
import { Box } from "@mui/material";

import {
  CloseButton,
  ContainerContent,
  ContainerDetail,
  ContainerTitle,
  Description,
  Header,
  Line,
  SubTitleDetailChildren,
  TitleDetail,
  ViewDetailContainer,
  ViewDetailDrawer,
  ViewDetailScroll
} from "./styles";
import {
  NetworkParameters,
  EconomicParameters,
  TechnicalParameters,
  GovernanceParameters,
  ExplanationDetailEconomic,
  ExplanationDetailNetwork,
  ExplanationDetailTechnical,
  ExplanationDetailGovernance
} from "../ExplainerText";

type Props = {
  open: boolean;
  onClose: () => void;
  groupType: string;
};
type Data = {
  data:
    | {
        title: string;
        children?: {
          title: string;
        }[];
      }[]
    | null;
};

type PropsExpainer = {
  items:
    | {
        label?: string;
        explanation?: string;
        description?: string;
        children?:
          | {
              description: string;
            }[];
      }[]
    | null;
  level?: number;
};

function DetailViewGroupProtocol({ open, onClose, groupType }: Props) {
  const getViewHeaderExplainer = (typeGroup: string) => {
    let data = null;
    switch (typeGroup) {
      case "network":
        data = NetworkParameters;
        break;
      case "economic":
        data = EconomicParameters;
        break;
      case "technical":
        data = TechnicalParameters;
        break;
      case "governance":
        data = GovernanceParameters;
        break;
    }
    return data;
  };

  const getViewDetailExplainer = (typeGroup: string) => {
    let data = null;
    switch (typeGroup) {
      case "network":
        data = ExplanationDetailNetwork;
        break;
      case "economic":
        data = ExplanationDetailEconomic;
        break;
      case "technical":
        data = ExplanationDetailTechnical;
        break;
      case "governance":
        data = ExplanationDetailGovernance;
        break;
    }
    return data;
  };

  const getTitleGroupProtocol = (type: string) => {
    let titleCard = null;
    switch (type) {
      case "network":
        titleCard = "Network group";
        break;
      case "economic":
        titleCard = "Economic Group";
        break;
      case "technical":
        titleCard = "Technical Group";
        break;
      case "governance":
        titleCard = "Governance Group";
        break;
    }
    return titleCard;
  };

  const renderContent = () => {
    return (
      <>
        <ViewDetailContainer>
          <CloseButton onClick={onClose}>
            <CgClose />
          </CloseButton>
          <ViewDetailScroll>
            <ContainerContent>
              <ContainerTitle>
                <Header component="h2">{getTitleGroupProtocol(groupType)}</Header>
                <Description component="p">
                  <HeaderLevelExplainer data={getViewHeaderExplainer(groupType)} />
                </Description>
              </ContainerTitle>
              <ContainerDetail>
                <ExplainerProtocol items={getViewDetailExplainer(groupType)} />
              </ContainerDetail>
            </ContainerContent>
          </ViewDetailScroll>
        </ViewDetailContainer>
      </>
    );
  };
  return (
    <ViewDetailDrawer onClose={onClose} anchor="right" open={open} variant="temporary">
      {renderContent()}
    </ViewDetailDrawer>
  );
}

const HeaderLevelExplainer = ({ data }: Data) => {
  if (data === null) return;
  return (
    <Box>
      {data.map((parent, i) => {
        return (
          <Box style={{ textAlign: "left" }} key={i}>
            {
              <Box component="p" style={{ textAlign: "left", lineHeight: "1.25" }}>
                {parent.title}
              </Box>
            }
            <Box style={{ paddingLeft: "10px" }}>
              {parent.children && <HeaderLevelExplainer data={parent.children} />}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
const getStylesText = (level: number) => {
  let style = {};
  switch (level) {
    case 0:
      style = {
        listStyle: "none",
        marginTop: "32px"
      };
      break;
    case 1:
      style = {
        listStyle: "disc",
        marginTop: "8px"
      };
      break;
    case 2:
      style = {
        listStyle: "circle",
        marginTop: "8px"
      };
      break;
  }
  return style;
};
const Member = ({ name, level }: { name: string; level: number }) => (
  <SubTitleDetailChildren style={getStylesText(level)}>{name}</SubTitleDetailChildren>
);

const ExplainerProtocol = ({ items, level = 0 }: PropsExpainer) => {
  if (items === null) return;
  return (
    <Box>
      {items.map((parentItem, i) => (
        <Box key={i}>
          {parentItem.label && <TitleDetail>{parentItem.label}</TitleDetail>}
          {parentItem.explanation && <TitleDetail>{`(${parentItem.explanation})`}</TitleDetail>}
          <Member name={parentItem.description ?? ""} level={level} />
          <Box marginLeft={"16px"}>
            {isArray(parentItem.children) && <ExplainerProtocol items={parentItem.children} level={level + 1} />}
          </Box>
          {level === 0 && <Line />}
        </Box>
      ))}
    </Box>
  );
};

export default DetailViewGroupProtocol;
