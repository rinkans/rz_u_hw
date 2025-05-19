import styles from "./FilterPanel.module.css";
import { Input } from "./Input";
import GridIcon from "../assets/grid_icon.svg?react";
import ListIcon from "../assets/list_icon.svg?react";
import { Button } from "./Button";
import { MultiSelect } from "./MultiSelect";
import { useState } from "react";

const ddata = [
  { id: "0", title: "ASDASD", checked: false },
  { id: "1", title: "ASDASD", checked: false },
  { id: "2", title: "ASDASD", checked: true },
  { id: "3", title: "ASDASD", checked: false },
  { id: "4", title: "ASDASD", checked: false },
  { id: "5", title: "ASDASD", checked: false },
];

export const FilterPanel: React.FC = () => {
  const [data, setIsData] = useState(ddata);

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.searchContainer}>
          <Input placeholder="Search" />
        </div>
        <p className={styles.searchResults}>123 Devices</p>
      </div>
      <div className={styles.block}>
        <Button active title={<ListIcon />} />
        <Button title={<GridIcon />} />
        <MultiSelect title="Filter" items={data} onChange={setIsData} />
      </div>
    </div>
  );
};
