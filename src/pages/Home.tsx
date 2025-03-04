import { FC } from 'react';
import styles from './Home.module.css';

const Home: FC = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.content}>
        <p>
          Welcome to the Crypto Dashboard. Navigate to the Monitor page to view
          order books.
        </p>
      </div>
    </div>
  );
};

export default Home;
