import { memo, type ChangeEvent } from "react";

import styles from "./Checkbox.module.css";

import CheckboxIcon from "../assets/checkbox_icon.svg?react";

export type CheckBoxProps = {
  id?: string;
  title: string;
  checked: boolean;
  onChange: (checked: boolean, id?: string) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = memo(
  ({ id, title, checked, onChange }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked, e.target.dataset.id);
    };

    return (
      <label className={styles.container} key={id}>
        <input
          type="checkbox"
          className={styles.hiddenCheckBox}
          onChange={handleChange}
          data-id={id}
          checked={checked}
        />
        <div className={styles.checkBox}>
          <CheckboxIcon />
        </div>
        <span>{title}</span>
      </label>
    );
  }
);
