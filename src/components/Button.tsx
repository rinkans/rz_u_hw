import type { ReactNode } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

export type ButtonProps = {
  onClick?: () => void;
  title: string | ReactNode;
  active?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  title,
  active = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.button, { [styles.active]: active })}
    >
      {title}
    </button>
  );
};
