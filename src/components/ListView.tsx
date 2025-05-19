import { TableVirtuoso } from "react-virtuoso";
import type { MouseEvent } from "react";

import styles from "./ListView.module.css";
import { ImageBouncer } from "./ImageBouncer";
import { observer } from "mobx-react-lite";
import type { ProductsStore } from "../stores/ProductsStore";

export type ListViewProps = {
  store: ProductsStore;
  onClick: (id: string) => void;
};

export const ListView: React.FC<ListViewProps> = observer(
  ({ store, onClick }) => {
    const handleClick = (e: MouseEvent<HTMLTableRowElement>) => {
      if (e.currentTarget.dataset.index) {
        onClick(e.currentTarget.dataset.index);
      }
    };

    return (
      <div className={styles.container}>
        <TableVirtuoso
          data={store.products}
          fixedHeaderContent={() => (
            <tr>
              <th style={{ width: "40px" }}>
                <span />
              </th>
              <th style={{ width: "40%" }}>Product Line</th>
              <th>Name</th>
            </tr>
          )}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            TableRow: ({ item, children, ...props }) => (
              <tr tabIndex={0} role="link" onClick={handleClick} {...props}>
                {children}
              </tr>
            ),
          }}
          itemContent={(_, item) => (
            <>
              <td>
                <ImageBouncer src={item.thumbnailImageUrl} />
              </td>
              <td className={styles.mainCell}>{item.line.name}</td>
              <td>{item.product.name}</td>
            </>
          )}
        />
      </div>
    );
  }
);
