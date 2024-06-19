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
  SubTitleDetail,
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
    | (
        | {
            label: string;
            explanation: string;
            description: string;
            children?: undefined;
          }
        | {
            label: string;
            explanation: string;
            description: string;
            children?: {
              description: string;
            }[];
          }
      )[]
    | null;
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
          <ViewDetailScroll>
            <CloseButton onClick={onClose}>
              <CgClose />
            </CloseButton>
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

const ExplainerProtocol = ({ items }: PropsExpainer) => {
  if (items === null) return;
  return (
    <Box>
      {items.map((parentItem, i) => (
        <Box key={i}>
          <TitleDetail>{parentItem.label}</TitleDetail>
          <TitleDetail>{`(${parentItem.explanation})`}</TitleDetail>
          <SubTitleDetail>{parentItem.description}</SubTitleDetail>
          {isArray(parentItem.children) && (
            <Box component="ul">
              {parentItem.children.map((childItem, i) => (
                <SubTitleDetailChildren key={i}>{childItem.description}</SubTitleDetailChildren>
              ))}
            </Box>
          )}
          <Line />
        </Box>
      ))}
    </Box>
  );
};

export default DetailViewGroupProtocol;
