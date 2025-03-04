import { FC, ReactNode } from 'react';
import { IoIosAlert } from 'react-icons/io';
import { useStream } from '@contexts/StreamContext';
import styles from './Layout.module.css';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { error } = useStream();

  return (
    <div className={styles.Layout}>
      <Navigation />
      {error && (
        <div className={styles.error}>
          <IoIosAlert className={styles.errorIcon} />
          {error}
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
