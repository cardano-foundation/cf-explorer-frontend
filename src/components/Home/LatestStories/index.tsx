import { Box, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";
import { CalenderPaleIcon, SliderRight } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import { formatDateTime, getHostname } from "src/commons/utils/helper";
import { CARDANO_NEWS_URL } from "src/commons/utils/constants";
import { useScreen } from "src/commons/hooks/useScreen";
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
  TABLET = 2,
  MOBILE = 2
}

const defaultButtonSwiper = { left: false, right: false };

const LIMIT = 20;

const MIN_SWIPE_DISTANCE = 50;

const LatestStories = () => {
  const [offset, setOffset] = useState<number>(0);
  const { data: dataNews, loading, error } = useFetch<Articles>(`${API.STORIES}?limit=${LIMIT}&offset=${offset}`);
  const data = dataNews?.articles || [];

  const [currentIndexData, setCurrentIndexData] = useState<number>(0);

  const [amountNewsByDevice, setAmountNewsByDevice] = useState<number>(0);
  const [showButtonSwiper, setShowButtonSwiper] = useState(defaultButtonSwiper);

  const { isLaptop, isMobile } = useScreen();

  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);

  useEffect(() => {
    if (error && offset !== 0) {
      setOffset(0);
      setCurrentIndexData(0);
    }
  }, [error, offset]);

  const handleTouchStart = (event: React.TouchEvent): void => {
    setTouchStartX(event.touches[0].clientX);
    setTouchStartY(event.touches[0].clientY);
  };

  const handleTouchEnd = (event: React.TouchEvent): void => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiffX = touchEndX - touchStartX;

    const touchEndY = event.changedTouches[0].clientY;
    const touchDiffY = touchEndY - touchStartY;

    if (touchDiffX < 0) {
      handleNextSwiper();
    } else {
      const isScroll = Math.abs(touchDiffY) > MIN_SWIPE_DISTANCE || (offset === 0 && currentIndexData === 0);
      if (isScroll) {
        return window.scrollTo(window.scrollX, window.scrollY);
      }
      handlePrevSwiper();
    }
  };

  useEffect(() => {
    setCurrentIndexData(0);
    if (isMobile) {
      setAmountNewsByDevice(AMOUNT_OF_NEWS_SHOWING.MOBILE);
      setShowButtonSwiper(defaultButtonSwiper);
    } else if (isLaptop) {
      setAmountNewsByDevice(AMOUNT_OF_NEWS_SHOWING.TABLET);
      setShowButtonSwiper(defaultButtonSwiper);
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
      if (offset + LIMIT >= Number(dataNews?.total)) {
        setCurrentIndexData(0);
        setOffset(0);
        return;
      }
      setCurrentIndexData(0);
      setOffset(offset + LIMIT);
    }
  };

  const handlePrevSwiper = async () => {
    let newIndex = currentIndexData - amountNewsByDevice;
    if (isMobile) {
      newIndex = currentIndexData - 1;
    }
    const isHasMore = newIndex >= 0;

    if (isHasMore) {
      setCurrentIndexData(newIndex);
    } else {
      setCurrentIndexData(LIMIT - amountNewsByDevice);
      setOffset(offset - LIMIT);
    }
  };

  if (!loading) {
    const amountSkeleton = isMobile ? 1 : amountNewsByDevice;
    return (
      <Box>
        <Header>
          <Title>Latest Stories</Title>
          <ViewAllButtonExternal to={CARDANO_NEWS_URL as string} />
        </Header>
        <Grid container spacing={2}>
          {new Array(amountSkeleton).fill(0).map((_, index) => (
            <Grid key={index} lg={3} xs={6} item>
              <Box
                component={Skeleton}
                variant="rectangular"
                borderRadius={"12px"}
                height={280}
                width={isMobile ? "75vw" : "auto"}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const onMouseEnter = () => {
    if (isLaptop || isMobile) return;
    setShowButtonSwiper({ left: true, right: true });
  };

  const onMouseLeave = () => {
    if (isLaptop || isMobile) return;
    setShowButtonSwiper({ left: false, right: false });
  };

  const isNextSwiper = showButtonSwiper.right && Number(dataNews?.total) > data.length + Number(dataNews?.offset);
  const isPrevSwiper = showButtonSwiper.left && (Number(dataNews?.offset) > 0 || currentIndexData > 0);

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
            ({ meta_image, banner_image, title, news_item_content, resource_href }, index) => {
              const { date, default_content, author } = news_item_content;
              const imageCard = meta_image || banner_image;

              const authorName = getAuthorName(author);

              const isRelativeCardMobile = isMobile && index === 1;
              return (
                <CustomGrid key={date} lg={3} xs={6} item>
                  <Box sx={{ position: isRelativeCardMobile ? "absolute" : "unset", left: "300px" }}>
                    <a href={resource_href} target="_blank" rel="noreferrer">
                      <Item>
                        <Image src={imageCard} alt={title} />
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
          <PrevSwiper onClick={handlePrevSwiper}>
            <SliderRight />
          </PrevSwiper>
        )}
        {isNextSwiper && (
          <NextSwiper onClick={handleNextSwiper}>
            <SliderRight />
          </NextSwiper>
        )}
      </Box>
    </LatestStoriesContainer>
  );
};

export default LatestStories;
