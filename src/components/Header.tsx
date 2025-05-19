import { Logo } from "./Logo";

import styles from "./Header.module.css";

export type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo />
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div>
        <h2 className={styles.author}>Rinalds Zukulis</h2>
      </div>
    </div>
  );
};
