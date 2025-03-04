import { FC } from 'react';
import { VscGraph } from 'react-icons/vsc';
import { HiBellAlert } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import ToggleStreaming from '../ToggleStreaming/ToggleStreaming';

import styles from './Navigation.module.css';

const Navigation: FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <NavLink to="/">
          <h1 className={styles.title}>Crypto Dashboard</h1>
        </NavLink>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/monitor"
            className={(isActive: boolean) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <span className={styles.navIcon}>
              <VscGraph />
            </span>
            Monitor
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/alerts"
            className={(isActive: boolean) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            <span className={styles.navIcon}>
              <HiBellAlert />
            </span>
            Alerts
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <ToggleStreaming />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
