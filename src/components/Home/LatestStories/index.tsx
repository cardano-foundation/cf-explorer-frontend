import moment from "moment";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CalenderPaleIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import styles from "./index.module.scss";
import Temp from "../../../commons/resources/temp/Rectangle 31.png";
import Temp1 from "../../../commons/resources/temp/Rectangle 31 (1).png";
import Temp2 from "../../../commons/resources/temp/Rectangle 31 (2).png";
import Temp3 from "../../../commons/resources/temp/Rectangle 31 (3).png";
import {
  Author,
  Header,
  Image,
  Item,
  ItemTitle,
  LatestStoriesContainer,
  SeemoreButton,
  SeemoreText,
  StyledSlider,
  Time,
  TimeIcon,
  Title,
} from "./style";

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
    image: Temp1,
    createdDate: "10/10/2022",
  },
  {
    id: "3",
    title: "Cardano Foundation Partners",
    author: "Cardano Academy",
    image: Temp2,
    createdDate: "10/10/2022",
  },
  {
    id: "4",
    title: "Cardano Foundation Partners",
    author: "Cardano Academy",
    image: Temp3,
    createdDate: "10/10/2022",
  },
];

const LatestStories: React.FC<Props> = () => {
  const drag = useRef<boolean>(false);
  return (
    <LatestStoriesContainer>
      <Header>
        <Title>Latest Stories</Title>
        <SeemoreButton to={routers.STORY_LIST}>
          <SeemoreText>See All</SeemoreText>
        </SeemoreButton>
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
          { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2, dots: true } },
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
                <Author>{author}</Author>
                <ItemTitle>{title}</ItemTitle>
                <Time>
                  <TimeIcon src={CalenderPaleIcon} alt="calender pale" />
                  {moment(createdDate).format("MM/DD/YYYY")}
                </Time>
              </Item>
            </Link>
          );
        })}
      </StyledSlider>
      <SeemoreButton to={routers.STORY_LIST} mobile>
        <SeemoreText>See All</SeemoreText>
      </SeemoreButton>
    </LatestStoriesContainer>
  );
};

export default LatestStories;
