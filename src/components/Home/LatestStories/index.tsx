import moment from "moment";
import { useEffect, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";

import { CalenderPaleIcon } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import defaultAxios from "src/commons/utils/axios";

import { Author, Detail, Header, Image, Item, ItemTitle, LatestStoriesContainer, Time, TimeIcon, Title } from "./style";

const LatestStories = () => {
  const [data, setData] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchStory = async () => {
    try {
      setLoading(true);
      const { data } = await defaultAxios.get<Story[]>(`${API.STORIES}?amount=4`);
      setData(data);
    } catch (error) {
      //To do
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStory();
  }, []);

  if (loading) {
    return (
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((i, ii) => (
          <Grid key={ii} md={3} sm={6} xs={12} item>
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
        {data.map(({ resource_href, main_image, main_image_alt, title, published_on, entity }) => {
          return (
            <Grid key={published_on} md={3} sm={6} xs={12} item>
              <Box onClick={() => window.open(resource_href, "_blank")}>
                <Item>
                  <Image src={main_image} alt={main_image_alt} />
                  <Detail>
                    <Box>
                      <Author>{entity}</Author>
                      <ItemTitle>{title}</ItemTitle>
                    </Box>
                    <Time>
                      <TimeIcon src={CalenderPaleIcon} alt="calender pale" />
                      {moment(published_on).format("MM/DD/YYYY")}
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
