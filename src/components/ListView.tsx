import { TableVirtuoso } from "react-virtuoso";

import styles from "./ListView.module.css";
import { ImageBouncer } from "./ImageBouncer";
import type { Product } from "../types";

export type ListViewProps = {
  data: Product[];
};

export const ListView: React.FC<ListViewProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <TableVirtuoso
        data={data}
        fixedHeaderContent={() => (
          <tr>
            <th style={{ width: "40px" }}>
              <span />
            </th>
            <th style={{ width: "40%" }}>Product Line</th>
            <th>Name</th>
          </tr>
        )}
        itemContent={(_, item) => (
          <>
            <td>
              <ImageBouncer src={item.thumbnailImage} />
            </td>
            <td>{item.productLine}</td>
            <td>{item.name}</td>
          </>
        )}
      />
    </div>
  );
};
