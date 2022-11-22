import { Col, Row } from "antd";
import React from "react";
import { browse, community, resource } from "../../../../commons/menus";
import {
  FacebookIcon,
  GithubIcon,
  LinkedInIcon,
  LogoIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../../../commons/resources";
import styles from "./index.module.scss";

interface Props {}

const socials = [
  { href: "https://fb.me", title: "Facebook", icon: FacebookIcon },
  { href: "https://twitter.com", title: "Twitter", icon: TwitterIcon },
  { href: "https://reddit.com", title: "Reddit", icon: RedditIcon },
  { href: "https://telegram.com", title: "Telegram", icon: TelegramIcon },
  { href: "https://linkedin.com", title: "Linked In", icon: LinkedInIcon },
  { href: "https://github.com", title: "Github", icon: GithubIcon },
  { href: "https://youtube.com", title: "Youtube", icon: YoutubeIcon },
];

const Footer: React.FC<Props> = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.footerMenu}>
          <Row className={styles.Row}>
            <Col span={12} className={styles.left}>
              <img src={LogoIcon} alt="logo" />
              <p>
                We are running the oldest and most featured explorer on Cardano network since Incentivised Testnet ages.
              </p>
              <div className={styles.network_list}>
                <h4>Networks</h4>
                <div className={styles.chain}>
                  <div className={styles.mainnet}>Mainnet</div>
                  <div className={styles.preprod}>Preprod</div>
                  <div className={styles.preview}>Preview</div>
                  <div className={styles.testnet}>Testnet (legacy)</div>
                </div>
              </div>
            </Col>
            <Col span={12} className={styles.right}>
              <Row className={styles.parentRow}>
                <Col span={8} className={`${styles.col} ${styles.col_1}`}>
                  <div className={styles.title}>
                    <span>Browser</span>
                    <ul className={styles.list_menu_footer}>
                      {browse.map((item: any) => {
                        return (
                          <li onClick={() => window.open(item.href)} key={item.title}>
                            {item.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Col>
                <Col className={`${styles.col} ${styles.col_1}`} span={8}>
                  <div className={styles.title}>
                    <span>Browser</span>
                    <ul className={styles.list_menu_footer}>
                      {community.map((item: any) => {
                        return (
                          <li onClick={() => window.open(item.href)} key={item.title}>
                            {item.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Col>
                <Col className={`${styles.col}`} span={8}>
                  <div className={styles.title}>
                    <span>Browser</span>
                    <ul className={styles.list_menu_footer}>
                      {resource.map((item: any) => {
                        return (
                          <li onClick={() => window.open(item.href)} key={item.title}>
                            {item.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className={styles.container}>
          <span>© 2022 Cardano. All rights reserved</span>
          <ul>
            {socials.map(social => {
              return (
                <li key={social.title}>
                  <a href={social.href} target="_blank" rel="noreferrer" title={social.title}>
                    <img src={social.icon} alt={social.title} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
