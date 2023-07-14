import { Box, Grid, Skeleton } from "@mui/material";

import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";
import { CalenderPaleIcon } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import { formatDateTime, getHostname } from "src/commons/utils/helper";
import { CARDANO_NEWS_URL } from "src/commons/utils/constants";
import CustomTooltip from "src/components/commons/CustomTooltip";

import {
  Author,
  Description,
  Detail,
  FooterCard,
  Header,
  Image,
  Item,
  ItemTitle,
  LatestStoriesContainer,
  ResourceHref,
  Time,
  TimeIcon,
  Title
} from "./style";

const LatestStories = () => {
  const numberOfItems = 4;
  const { data, loading } = useFetch<Story[]>(`${API.STORIES}?amount=${numberOfItems}`);

  if (loading) {
    return (
      <Grid container spacing={2}>
        {new Array(numberOfItems).fill(0).map((_, index) => (
          <Grid key={index} md={3} sm={6} xs={12} item>
            <Box component={Skeleton} variant="rectangular" borderRadius={"12px"} height={120} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <LatestStoriesContainer data-testid="home-latest-stories">
      <Header>
        <Title>Latest Stories</Title>
        <ViewAllButtonExternal to={CARDANO_NEWS_URL as string} />
      </Header>
      <Grid container spacing={2}>
        {(data || []).map(({ resource_href, main_image, main_image_alt, title, published_on, entity, blurb }) => {
          return (
            <Grid key={published_on} lg={3} md={12} item sx={{ width: "100%" }}>
              <Box onClick={() => window.open(resource_href, "_blank")} sx={{ display: "inline-flex", width: "100%" }}>
                <Item>
                  <Image src={main_image} alt={main_image_alt} />
                  <Detail>
                    <CustomTooltip title={entity}>
                      <Author>{entity}</Author>
                    </CustomTooltip>
                    <ResourceHref>{getHostname(resource_href)}</ResourceHref>
                    <ItemTitle>{title} </ItemTitle>
                    <Description>{blurb}</Description>
                    <FooterCard>
                      <Time>
                        <TimeIcon src={CalenderPaleIcon} alt="calender pale" />
                        {formatDateTime(published_on)}
                      </Time>
                    </FooterCard>
                  </Detail>
                </Item>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </LatestStoriesContainer>
  );
};

export default LatestStories;
