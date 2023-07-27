import { Box, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";
import { CalenderPaleIcon, SliderRight } from "src/commons/resources";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { CARDANO_NEWS_URL } from "src/commons/utils/constants";
import { useScreen } from "src/commons/hooks/useScreen";
import { formatDateTime, getHostname } from "src/commons/utils/helper";
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
  NextSwiper,
  ResourceHref,
  Time,
  TimeIcon,
  Title,
  WrapHeader,
  CustomGrid,
  PrevSwiper
} from "./style";

enum AMOUNT_OF_NEWS_SHOWING {
  DESKTOP = 4,
  TABLET = 4,
  MOBILE = 2
}

const defaultButtonSwipper = { left: false, right: false };

const LIMIT = 20;

const LatestStories = () => {
  const [offset, setOffset] = useState<number>(0);
  const { data: dataNews, loading } = useFetch<Articles>(`${API.STORIES}?limit=${LIMIT}&offset=${offset}`);
  const data = dataNews?.articles || [];

  const [currentIndexData, setCurrentIndexData] = useState<number>(0);

  const [amountNewsByDevice, setAmountNewsByDevice] = useState<number>(0);
  const [showButtonSwipper, setShowButtonSwipper] = useState(defaultButtonSwipper);

  const { isLaptop, isMobile } = useScreen();

  const [touchStartX, setTouchStartX] = useState<number>(0);

  const handleTouchStart = (event: React.TouchEvent): void => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent): void => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX;

    if (touchDiff < 0) {
      handleNextSwiper();
    } else {
      handlePrevSwiper();
    }
  };

  useEffect(() => {
    setCurrentIndexData(0);
    if (isMobile) {
      setAmountNewsByDevice(AMOUNT_OF_NEWS_SHOWING.MOBILE);
      setShowButtonSwipper(defaultButtonSwipper);
    } else if (isLaptop) {
      setAmountNewsByDevice(AMOUNT_OF_NEWS_SHOWING.TABLET);
      setShowButtonSwipper(defaultButtonSwipper);
    } else {
      setAmountNewsByDevice(AMOUNT_OF_NEWS_SHOWING.DESKTOP);
    }
  }, [isLaptop, isMobile]);

  const handleNextSwiper = async () => {
    let newIndex = currentIndexData + amountNewsByDevice;

    if (isMobile) {
      newIndex = currentIndexData + 1;
    }
    const isHasMore = newIndex < (data?.length || 0) - 1;

    if (isHasMore) {
      setCurrentIndexData(newIndex);
    } else {
      setCurrentIndexData(0);
      setOffset(offset + LIMIT);
    }
  };

  const handlePrevSwiper = async () => {
    let newIndex = currentIndexData - amountNewsByDevice;
    if (isMobile) {
      newIndex = currentIndexData - 1;
    }
    const isHasMore = newIndex > 0;

    if (isHasMore) {
      setCurrentIndexData(newIndex);
    } else {
      setCurrentIndexData(0);
      setOffset(offset - LIMIT);
    }
  };

  if (loading) {
    return (
      <Box>
        <Header>
          <Title>Latest Stories</Title>
          <ViewAllButtonExternal to={CARDANO_NEWS_URL as string} />
        </Header>
        <Grid container spacing={2}>
          {new Array(4).fill(0).map((_, index) => (
            <Grid key={index} lg={3} sm={6} xs={12} item>
              <Box component={Skeleton} variant="rectangular" borderRadius={"12px"} height={280} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const onMouseEnter = () => {
    if (isLaptop || isMobile) return;
    setShowButtonSwipper({ left: true, right: true });
  };

  const onMouseLeave = () => {
    if (isLaptop || isMobile) return;
    setShowButtonSwipper({ left: false, right: false });
  };

  const isNextSwiper = showButtonSwipper.right && Number(dataNews?.total) > data.length + Number(dataNews?.offset);
  const isPrevSwiper = showButtonSwipper.left && Number(dataNews?.offset) > 0;

  const getAuthorName = (name: string) => {
    const indexSymbol = name?.split("|")[1]?.split(" ")[1]?.indexOf("~~~");
    return name?.split("|")[1]?.split(" ")[0] + " " + name?.split("|")[1]?.split(" ")[1]?.slice(0, indexSymbol);
  };

  return (
    <LatestStoriesContainer data-testid="home-latest-stories">
      <Header>
        <Title>Latest Stories</Title>
        <ViewAllButtonExternal to={CARDANO_NEWS_URL as string} />
      </Header>
      <Box position={"relative"} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Grid container spacing={2} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {(data?.slice(currentIndexData, currentIndexData + amountNewsByDevice) || []).map(
            ({ meta_image, title, news_item_content, resource_href }, index) => {
              const { date, default_content, author } = news_item_content;
              const authorName = getAuthorName(author);

              const isRelativeCardMobile = isMobile && index === 1;
              return (
                <CustomGrid key={date} lg={3} sm={6} xs={6} item>
                  <Box sx={{ position: isRelativeCardMobile ? "absolute" : "unset", left: "300px" }}>
                    <a href={resource_href} target="_blank" rel="noreferrer">
                      <Item>
                        <Image src={meta_image} alt={title} />
                        <Detail>
                          <WrapHeader>
                            <CustomTooltip title={authorName}>
                              <Author>{authorName}</Author>
                            </CustomTooltip>
                            <ResourceHref>{getHostname(resource_href)}</ResourceHref>
                          </WrapHeader>
                          <ItemTitle>{title} </ItemTitle>
                          <Description>{default_content}</Description>
                          <FooterCard>
                            <Time>
                              <TimeIcon src={CalenderPaleIcon} alt="calender pale" />
                              {formatDateTime(date)}
                            </Time>
                          </FooterCard>
                        </Detail>
                      </Item>
                    </a>
                  </Box>
                </CustomGrid>
              );
            }
          )}
        </Grid>
        {isPrevSwiper && (
          <PrevSwiper onClick={handlePrevSwiper} className="news-swipper-button">
            <SliderRight />
          </PrevSwiper>
        )}
        {isNextSwiper && (
          <NextSwiper onClick={handleNextSwiper} className="news-swipper-button">
            <SliderRight />
          </NextSwiper>
        )}
      </Box>
    </LatestStoriesContainer>
  );
};

export default LatestStories;
