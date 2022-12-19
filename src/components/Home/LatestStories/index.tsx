import moment from "moment";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CalenderPaleIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import Temp from "../../../commons/resources/temp/Rectangle 31.png";
import {
  Author,
  Detail,
  Header,
  Image,
  Item,
  ItemTitle,
  LatestStoriesContainer, 
  StyledSlider,
  Time,
  TimeIcon,
  Title,
} from "./style";
import ViewAllButton from "../../commons/ViewAllButton";

interface Props {}

const data: Story[] = [
  {
    id: "1",
    title: "Cardano Foundation Partners with Georgian National Wine Agency",
    author: "Cardano Academy",
    image: Temp,
    createdDate: "10/10/2022",
  },
  {
    id: "2",
    title: "Cardano Foundation Partners with Georgian National Wine Agency with Georgian National Wine Agency",
    author: "Cardano Academy",
    image: Temp,
    createdDate: "10/10/2022",
  },
  {
    id: "3",
    title: "Cardano Foundation Partners",
    author: "Cardano Academy",
    image: Temp,
    createdDate: "10/10/2022",
  },
  {
    id: "4",
    title: "Cardano Foundation Partners",
    author: "Cardano Academy",
    image: Temp,
    createdDate: "10/10/2022",
  },
];

const LatestStories: React.FC<Props> = () => {
  const drag = useRef<boolean>(false);
  return (
    <LatestStoriesContainer>
      <Header>
        <Title>Latest Stories</Title> 
        <ViewAllButton to={routers.STORY_LIST} />
      </Header>
      <StyledSlider
        dots
        arrows={false}
        autoplay={true}
        infinite={true}
        draggable={true}
        slidesToShow={4}
        beforeChange={() => (drag.current = true)}
        afterChange={() => (drag.current = false)}
        responsive={[
          { breakpoint: 1170, settings: { slidesToShow: 2, slidesToScroll: 2, dots: true } },
          { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } },
        ]}
      >
        {data.map(({ id, image, author, title, createdDate }) => {
          return (
            <Link
              key={id}
              to={routers.STORY_DETAIL.replace(":storyId", `${id}`)}
              title={title}
              onClick={e => drag.current && e.preventDefault()}
            >
              <Item>
                <Image src={image} alt={title} />
                <Detail>
                  <Author>{author}</Author>
                  <ItemTitle>{title}</ItemTitle>
                  <Time>
                    <TimeIcon src={CalenderPaleIcon} alt="calender pale" />
                    {moment(createdDate).format("MM/DD/YYYY")}
                  </Time>
                </Detail>
              </Item>
            </Link>
          );
        })}
      </StyledSlider> 
    </LatestStoriesContainer>
  );
};

export default LatestStories;
