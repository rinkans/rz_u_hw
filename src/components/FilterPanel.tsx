import styles from "./FilterPanel.module.css";
import { Input } from "./Input";
import GridIcon from "../assets/icons/grid_icon.svg?react";
import ListIcon from "../assets/icons/list_icon.svg?react";
import SearchIcon from "../assets/icons/search_icon.svg?react";
import { Button } from "./Button";
import { MultiSelect } from "./MultiSelect";
import { observer } from "mobx-react-lite";
import type { ProductsStore } from "../stores/ProductsStore";

export const FilterPanel: React.FC<{ store: ProductsStore }> = observer(
  ({ store }) => {
    return (
      <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.searchContainer}>
            <Input
              icon={<SearchIcon />}
              placeholder="Search"
              value={store.searchText}
              onChange={store.setSearchText}
            />
          </div>
          <p className={styles.searchResults}>
            {store.numberOfResults} Devices
          </p>
        </div>
        <div className={styles.block}>
          <Button active title={<ListIcon />} />
          <Button title={<GridIcon />} />
          <MultiSelect
            title="Filter"
            items={store.productLineMultiSelectData}
            onChange={store.setProductLineMultiSelectData}
          />
        </div>
      </div>
    );
  }
);
