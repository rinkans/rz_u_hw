import { useMemo } from "react";
import { FilterPanel } from "../components/FilterPanel";
import { ListView } from "../components/ListView";
import { useNavigate } from "react-router";
import { ProductsStore } from "../stores/ProductsStore";
import { OverlayView } from "../components/OverlayView";

import styles from "./Products.module.css";
import { observer } from "mobx-react-lite";

export const Products: React.FC = observer(() => {
  // Another option would've been to use Context and not prop drill the store
  const store = useMemo(() => new ProductsStore(), []);
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles.container}>
      <FilterPanel store={store} />
      <ListView store={store} onClick={handleClick} />
      <OverlayView show={store.state === "loading"} title="Loading..." />
      <OverlayView
        show={store.state === "error"}
        title="Something went wrong with data fetching"
      />
    </div>
  );
});
