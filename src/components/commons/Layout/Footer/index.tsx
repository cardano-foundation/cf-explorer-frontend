import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

import { footerMenus } from "../../../../commons/menus";
import { LogoIcon } from "../../../../commons/resources";
import { NETWORKS } from "../../../../commons/utils/constants";
import { isExtenalLink } from "../../../../commons/utils/helper";
import styles from "./index.module.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={styles.container}>
        <Grid className={styles.footerMenu} columns={24} container>
          <Grid item className={styles.info} xs={24} xl={11}>
            <img src={LogoIcon} alt="logo" />
            <p>
              We are running the oldest and most featured explorer on Cardano network since Incentivised Testnet ages.
            </p>
            <small className={styles.network}>Networks</small>
            <div className={styles.chain}>
              {Object.entries(NETWORKS).map(([network, name]) => (
                <small key={network} className={styles[network]}>
                  {name}
                </small>
              ))}
            </div>
          </Grid>
          <Grid item className={styles.menu} xs={24} xl={13}>
            <Grid container columns={24}>
              {footerMenus.map(level_1 => {
                const { title, children } = level_1;
                return (
                  <Grid item key={title} xs={24} md={8} sm={12}>
                    <h3>{title}</h3>
                    <ul>
                      {children?.map(level_2 => {
                        const { href, title } = level_2;
                        return (
                          <li key={title}>
                            {href ? (
                              isExtenalLink(href) ? (
                                <a href={href} target="_blank" rel="noreferrer" title={title}>
                                  <span>{title}</span>
                                </a>
                              ) : (
                                <Link to={href}>
                                  <span>{title}</span>
                                </Link>
                              )
                            ) : (
                              <span className={styles.title}>{title}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={styles.copyright}>
        <div className={styles.container}>
          <Grid container columns={24} alignItems="center" >
            <Grid item xs={24} lg={12} >
              <span> © 2022 Cardano Foundation. All rights reserved v1.0</span>
            </Grid>
            <Grid className={styles.term} item xs={24} lg={12}>
              <a href="/" target="_blank" rel="noreferrer" title="Terms of Service">
                <span>Terms of Service</span>
              </a>
              <i />
              <a href="/" target="_blank" rel="noreferrer" title="Privacy Policy">
                <span>Privacy Policy</span>
              </a>
            </Grid>
          </Grid>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
