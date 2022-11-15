import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { menus } from '../../../../../commons/menus';
import styles from './index.module.scss';

interface Props { }

const HeaderMenu: React.FC<Props> = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    let target = e.target as Element;
    if (target.parentElement?.tagName === "LI") target = target.parentElement;
    if (target.className && target.className?.search(` ${styles.active}`) >= 0) {
      target.className = target.className.replace(` ${styles.active}`, "");
      const list = document.querySelectorAll(`.${styles.menu} li`);
      for (const element of Array.from(list)) {
        if (target.contains(element) && element.className && element.className?.search(` ${styles.active}`) >= 0) {
          element.className = element.className.replace(` ${styles.active}`, "");
        }
      }
    }
    else {
      const list = document.querySelectorAll(`.${styles.menu} li`);
      for (const element of Array.from(list)) {
        if (!element.contains(target) && element.className && element.className?.search(` ${styles.active}`) >= 0) {
          element.className = element.className.replace(` ${styles.active}`, "");
        }
      }
      target.className += ` ${styles.active}`;
    }
  }

  useEffect(() => {
    const handleClickBody = (e: Event) => {
      const target = e.target as Element;
      if (!ref.current?.contains(target)) {
        const list = document.querySelectorAll(`.${styles.menu} li`);
        for (const element of Array.from(list)) {
          if (element.className && element.className?.search(` ${styles.active}`) >= 0) {
            element.className = element.className.replace(` ${styles.active}`, "");
          }
        }
      }
    };

    document.addEventListener("click", handleClickBody, true);

    return () => {
      document.removeEventListener("click", handleClickBody, true);
    };

  }, []);

  return (
    <div ref={ref}>
      <i className={styles.collapse} />
      <ul className={styles.menu}>
        {menus.map(level_1 => {
          const { href, title, children, mega } = level_1;
          const target = href && (href.search("http://") >= 0 || href.search("https://") >= 0) ? "_blank" : null;
          return (
            <li key={title} className={children ? styles.parent : ""} onClick={handleClick}>
              {href ?
                (target ?
                  <a href={href} target={target} rel="noreferrer" title={title}>
                    <span>{title}</span>
                  </a>
                  :
                  <NavLink to={href}>
                    <span>{title}</span>
                  </NavLink>
                )
                :
                <span>{title}</span>
              }
              {children ?
                <ul className={mega ? styles.mega : ""}>
                  {children.map((level_2: { title: string, href?: string, children?: any[] }) => {
                    const { href, title, children } = level_2;
                    const target = href && (href.search("http://") >= 0 || href.search("https://") >= 0) ? "_blank" : null;
                    return (
                      <li key={title} onClick={handleClick}>
                        {href ?
                          (target ?
                            <a href={href} target={target} rel="noreferrer" title={title}>
                              <span>{title}</span>
                            </a>
                            :
                            <NavLink to={href}>
                              <span>{title}</span>
                            </NavLink>
                          )
                          :
                          <span className={styles.title}>{title}</span>
                        }
                        {children ?
                          <ul>
                            {children.map((level_3: { title: string, href: string }) => {
                              const { href, title } = level_3;
                              const target = href && (href.search("http://") >= 0 || href.search("https://") >= 0) ? "_blank" : null;
                              return (
                                <li key={title}>
                                  {target ?
                                    <a href={href} target={target} rel="noreferrer" title={title}>
                                      <span>{title}</span>
                                    </a>
                                    :
                                    <NavLink to={href}>
                                      <span>{title}</span>
                                    </NavLink>
                                  }
                                </li>
                              );
                            })}
                          </ul>
                          : null}
                      </li>
                    );
                  })}
                </ul>
                : null}
            </li>
          )
        })}
      </ul>
    </div>
  )

}

export default HeaderMenu;