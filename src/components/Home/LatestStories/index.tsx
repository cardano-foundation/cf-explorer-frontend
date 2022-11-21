import { Col, Row } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { CalenderPaleIcon, MarketCapIcon } from "../../../commons/resources";
import { routers } from "../../../commons/routers";
import styles from "./index.module.scss";

interface Props {}

const data: Story[] = [
  {
    id: "1",
    title: "Cardano Foundation Partners with Georgian National Wine Agency",
    author: "Cardano Academy",
    image: MarketCapIcon,
    createdDate: "10/10/2022",
  },
  {
    id: "2",
    title: "Cardano Foundation Partners with Georgian National Wine Agency with Georgian National Wine Agency",
    author: "Cardano Academy",
    image: MarketCapIcon,
    createdDate: "10/10/2022",
  },
  {
    id: "3",
    title: "Cardano Foundation Partners",
    author: "Cardano Academy",
    image: MarketCapIcon,
    createdDate: "10/10/2022",
  },
  {
    id: "4",
    title: "Cardano Foundation Partners",
    author: "Cardano Academy",
    image: MarketCapIcon,
    createdDate: "10/10/2022",
  },
];

const LatestStories: React.FC<Props> = () => {
  return (
    <div className={styles.latestStories}>
      <h3>Latest Stories</h3>
      <Row gutter={20}>
        {data.map(({ id, image, author, title, createdDate }) => {
          return (
            <Col span={24} sm={12} xl={6} key={id}>
              <Link className={styles.box} to={`/artic/${id}`} title={title}>
                <img className={styles.image} src={image} alt={title} />
                <h6>{author}</h6>
                <h4>{title}</h4>
                <small>
                  <img src={CalenderPaleIcon} alt="calender pale" />
                  {moment(createdDate).format("MM/DD/YYYY")}
                </small>
              </Link>
            </Col>
          );
        })}
      </Row>
      <Link to={routers.BLOCK_LIST} className={styles.seemore}>
        <small>See All</small>
      </Link>
    </div>
  );
};

export default LatestStories;
