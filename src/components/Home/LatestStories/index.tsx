import moment from "moment";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { CalenderPaleIcon } from "src/commons/resources";
import { details, routers } from "src/commons/routers";
import Temp from "src/commons/resources/temp/Rectangle 31.png";
import { Author, Detail, Header, Image, Item, ItemTitle, LatestStoriesContainer, Time, TimeIcon, Title } from "./style";
import ViewAllButton from "src/components/commons/ViewAllButton";
import { Box, Grid } from "@mui/material";

const data: Story[] = [
  {
    id: "1",
    title: "Cardano Foundation Partners with Georgian National Wine Agency",
    author: "Cardano Academy",
    image: Temp,
    createdDate: "10/10/2022"
  },
  {
    id: "2",
    title: "Cardano Foundation Partners with Georgian National Wine Agency with Georgian National Wine Agency",
    author: "Cardano Academy",
    image: Temp,
    createdDate: "10/10/2022"
  },
  {
    id: "3",
    title: "Cardano Foundation Partners",
    author: "Cardano Academy",
    image: Temp,
    createdDate: "10/10/2022"
  },
  {
    id: "4",
    title: "Cardano Foundation Partners",
    author: "Cardano Academy",
    image: Temp,
    createdDate: "10/10/2022"
  }
];

const LatestStories = () => {
  const drag = useRef<boolean>(false);
  return (
    <LatestStoriesContainer>
      <Header>
        <Title>Latest Stories</Title>
        <ViewAllButton to={routers.STORY_LIST} />
      </Header>
      <Grid container spacing={2}>
        {data.map(({ id, image, author, title, createdDate }) => {
          return (
            <Grid key={id} md={3} sm={6} xs={12} item>
              <Link key={id} to={details.story(id)} title={title} onClick={(e) => drag.current && e.preventDefault()}>
                <Item>
                  <Image src={image} alt={title} />
                  <Detail>
                    <Box>
                      <Author>{author}</Author>
                      <ItemTitle>{title}</ItemTitle>
                    </Box>
                    <Time>
                      <TimeIcon src={CalenderPaleIcon} alt="calender pale" />
                      {moment(createdDate).format("MM/DD/YYYY")}
                    </Time>
                  </Detail>
                </Item>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </LatestStoriesContainer>
  );
};

export default LatestStories;
