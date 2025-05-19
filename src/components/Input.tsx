import styles from "./Input.module.css";
import SearchIcon from "../assets/search_icon.svg?react";

export type InputProps = {
  placeholder: string;
};

export const Input: React.FC<InputProps> = ({ placeholder }) => {
  return (
    <div className={styles.container}>
      <SearchIcon className={styles.icon} />
      <input placeholder={placeholder} className={styles.input} />
    </div>
  );
};
