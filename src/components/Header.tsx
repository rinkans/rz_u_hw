import LogoIcon from "../assets/logo.svg?react";
import styles from "./Header.module.css";

export type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <a href="/" className={styles.logo}>
          <LogoIcon />
        </a>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div>
        <h2 className={styles.author}>Rinalds Zukulis</h2>
      </div>
    </div>
  );
};
