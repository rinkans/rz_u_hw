import type { ChangeEvent, ReactNode } from "react";
import styles from "./Input.module.css";

export type InputProps = {
  icon?: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  icon,
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <input
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
