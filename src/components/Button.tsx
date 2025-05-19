import type { ReactNode } from "react";
import styles from "./Button.module.css";

export type Button = {
  title: string | ReactNode;
};

export const Button: React.FC<Button> = ({ title }) => {
  return <div className={styles.button}>{title}</div>;
};
