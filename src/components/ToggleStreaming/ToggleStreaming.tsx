import { useStream } from '@contexts/StreamContext';
import classNames from 'classnames';
import styles from './ToggleStreaming.module.css';

const ToggleStreaming = () => {
  const { streaming, isLoading, toggleStreaming } = useStream();

  const buttonClass = classNames({
    [styles.active]: streaming,
    [styles.inactive]: !streaming,
    [styles.loading]: isLoading,
  });

  const buttonText = isLoading
    ? 'Connecting...'
    : streaming
      ? 'Stop Stream'
      : 'Start Stream';

  return (
    <button
      onClick={toggleStreaming}
      className={buttonClass}
      disabled={isLoading}
    >
      {isLoading && <span className={styles.spinner}></span>}
      {buttonText}
    </button>
  );
};

export default ToggleStreaming;
