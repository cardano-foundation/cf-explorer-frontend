import React from 'react';
import { FacebookIcon, GithubIcon, LinkedInIcon, RedditIcon, TelegramIcon, TwitterIcon, YoutubeIcon } from '../../../../commons/resources';
import styles from './index.module.scss';

interface Props { }

const socials = [
  { href: "https://fb.me", title: "Facebook", icon: FacebookIcon },
  { href: "https://twitter.com", title: "Twitter", icon: TwitterIcon },
  { href: "https://reddit.com", title: "Reddit", icon: RedditIcon },
  { href: "https://telegram.com", title: "Telegram", icon: TelegramIcon },
  { href: "https://linkedin.com", title: "Linked In", icon: LinkedInIcon },
  { href: "https://github.com", title: "Github", icon: GithubIcon },
  { href: "https://youtube.com", title: "Youtube", icon: YoutubeIcon },
]

const Footer: React.FC<Props> = () => {

  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.footerMenu}>
          Footer Menu
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
  )

}

export default Footer;