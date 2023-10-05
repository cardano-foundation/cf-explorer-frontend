import { Box, BoxProps, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Settings } from "react-slick";

import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";
import { CalenderPaleIcon, SliderRight } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import { formatDateTime, getHostname } from "src/commons/utils/helper";
import { CARDANO_NEWS_URL } from "src/commons/utils/constants";
import breakpoints from "src/themes/breakpoints";
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
  StyledSlider,
  PrevSwiper
} from "./style";

declare interface SlickArrowProps extends BoxProps {
  currentSlide?: number;
  slideCount?: number;
}

const LIMIT = 20;

const LatestStories = () => {
  const { t } = useTranslation();
  const drag = useRef<boolean>(false);
  const [data, setData] = useState<Story[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const { data: dataNews, loading } = useFetch<Articles>(API.STORIES({ limit: LIMIT, offset }));

  useEffect(() => {
    setData((data) => [...data, ...(dataNews?.articles || [])]);
    setTotal(dataNews?.total || 0);
  }, [setData, dataNews]);

  const onAfterChange: Settings["afterChange"] = (currentSlide) => {
    drag.current = false;
    if (currentSlide >= data.length - 4 && data.length < total && !loading) {
      setOffset(data.length);
    }
  };

  const getAuthorName = (urlAuthor: string) => {
    const [authorName = ""] = urlAuthor.match(/\|.+~~~/) || [];
    return authorName.replace("|", "").replace("~~~", "");
  };

  const SlickArrowLeft = ({ currentSlide = 0, slideCount = 0, ...props }: SlickArrowProps) => {
    if (currentSlide < 4 || !slideCount) return null;
    return (
      <PrevSwiper {...props}>
        <SliderRight />
      </PrevSwiper>
    );
  };

  const SlickArrowRight = ({ currentSlide = 0, slideCount = 0, ...props }: SlickArrowProps) => {
    if (currentSlide >= slideCount - 4) return null;
    return (
      <NextSwiper {...props}>
        <SliderRight />
      </NextSwiper>
    );
  };

  return (
    <LatestStoriesContainer data-testid="home-latest-stories">
      <Header>
        <Title>{t("common.latestStories")}</Title>
        <ViewAllButtonExternal to={CARDANO_NEWS_URL as string} tooltipTitle={t("common.viewAll")} />
      </Header>
      <StyledSlider
        dots={false}
        prevArrow={<SlickArrowLeft />}
        nextArrow={<SlickArrowRight />}
        infinite={false}
        autoplay={false}
        draggable
        slidesToShow={4}
        slidesToScroll={4}
        beforeChange={() => (drag.current = true)}
        afterChange={onAfterChange}
        responsive={[
          { breakpoint: breakpoints.values.lg, settings: { slidesToShow: 2, slidesToScroll: 2 } },
          { breakpoint: breakpoints.values.sm, settings: { slidesToShow: 1.5, slidesToScroll: 1 } }
        ]}
      >
        {data.map(({ meta_image, banner_image, title, news_item_content, resource_href }) => {
          const { date, default_content, author } = news_item_content;

          const authorName = getAuthorName(author);

          return (
            <a
              key={date}
              href={resource_href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => drag.current && e.preventDefault()}
            >
              <Item>
                <Image src={meta_image || banner_image} alt={title} />
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
          );
        })}
        {(loading || !data.length) &&
          new Array(4).fill(0).map((_, index) => (
            <Item key={index}>
              <Box component={Skeleton} variant="rectangular" borderRadius={2} height={132} />
              <Box component={Skeleton} variant="rectangular" borderRadius={2} height={15} mt={1} width="70%" />
              <Box component={Skeleton} variant="rectangular" borderRadius={2} height={15} mt={1} width="80%" />
              <Box component={Skeleton} variant="rectangular" borderRadius={2} height={80} mt={1} />
              <FooterCard>
                <Box component={Skeleton} variant="rectangular" borderRadius={2} height={20} width="60%" />
              </FooterCard>
            </Item>
          ))}
      </StyledSlider>
    </LatestStoriesContainer>
  );
};

export default LatestStories;
