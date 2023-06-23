import { Box, Grid, Skeleton } from "@mui/material";

import { CalenderPaleIcon } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import { formatDateTime } from "src/commons/utils/helper";
import CustomTooltip from "src/components/commons/CustomTooltip";

import { Author, Detail, Header, Image, Item, ItemTitle, LatestStoriesContainer, Time, TimeIcon, Title } from "./style";

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
    <LatestStoriesContainer>
      <Header>
        <Title>Latest Stories</Title>
      </Header>
      <Grid container spacing={2}>
        {(data || []).map(({ resource_href, main_image, main_image_alt, title, published_on, entity }) => {
          return (
            <Grid key={published_on} md={3} sm={6} xs={12} item>
              <Box onClick={() => window.open(resource_href, "_blank")}>
                <Item>
                  <Image src={main_image} alt={main_image_alt} />
                  <Detail>
                    <Box>
                      <CustomTooltip title={entity}>
                        <Author>{entity}</Author>
                      </CustomTooltip>
                      <ItemTitle>{title}</ItemTitle>
                    </Box>
                    <Time>
                      <TimeIcon src={CalenderPaleIcon} alt="calender pale" />
                      {formatDateTime(published_on)}
                    </Time>
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
