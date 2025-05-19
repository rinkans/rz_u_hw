import styles from "./FilterPanel.module.css";
import { Input } from "./Input";
import GridIcon from "../assets/grid_icon.svg?react";
import RowIcon from "../assets/row_icon.svg?react";
import { Button } from "./Button";

export const FilterPanel: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <Input placeholder="Search" />
        <p>123 Devices</p>
      </div>
      <div className={styles.block}>
        <Button title={<GridIcon />} />
        <Button title={<RowIcon />} />
        <Button title="Filter" />
      </div>
    </div>
  );
};
