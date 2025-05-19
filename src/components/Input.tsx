import styles from "./Input.module.css";
import SearchIcon from "../assets/search_icon.svg?react";

export type Input = {
  placeholder: string;
};

export const Input: React.FC<Input> = ({ placeholder }) => {
  return (
    <div className={styles.container}>
      <SearchIcon className={styles.icon} />
      <input placeholder={placeholder} className={styles.input} />
    </div>
  );
};
