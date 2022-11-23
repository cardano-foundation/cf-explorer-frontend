import { Col, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { footerMenus } from "../../../../commons/menus";
import { LogoIcon } from "../../../../commons/resources";
import styles from "./index.module.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={styles.container}>
        <Row className={styles.footerMenu} gutter={24}>
          <Col span={24} xl={11} className={styles.info}>
            <img src={LogoIcon} alt="logo" />
            <p>
              We are running the oldest and most featured explorer on Cardano network since Incentivised Testnet ages.
            </p>
            <small className={styles.network}>Networks</small>
            <div className={styles.chain}>
              <small className={styles.mainnet}>Mainnet</small>
              <small className={styles.preprod}>Preprod</small>
              <small className={styles.preview}>Preview</small>
              <small className={styles.testnet}>Testnet (legacy)</small>
            </div>
          </Col>
          <Col span={24} xl={13} className={styles.menu}>
            <Row gutter={27}>
              {footerMenus.map(level_1 => {
                const { title, children } = level_1;
                return (
                  <Col span={24} md={8}>
                    <h3>{title}</h3>
                    <ul>
                      {children?.map(level_2 => {
                        const { href, title } = level_2;
                        const target =
                          href && (href.search("http://") >= 0 || href.search("https://") >= 0) ? "_blank" : null;
                        return (
                          <li>
                            {href ? (
                              target ? (
                                <a href={href} target={target} rel="noreferrer" title={title}>
                                  <span>{title}</span>
                                </a>
                              ) : (
                                <NavLink to={href}>
                                  <span>{title}</span>
                                </NavLink>
                              )
                            ) : (
                              <span className={styles.title}>{title}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
      <div className={styles.copyright}>
        <div className={styles.container}>
          <Row gutter={24}>
            <Col span={24} xl={12}>
              <span> © 2022 Cardano Foundation. All rights reserved v1.0</span>
            </Col>
            <Col span={24} xl={12} className={styles.term}>
              <a href="/" target="_blank" rel="noreferrer" title="Terms of Service">
                <span>Terms of Service</span>
              </a>
              <i />
              <a href="/" target="_blank" rel="noreferrer" title="Privacy Policy">
                <span>Privacy Policy</span>
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
