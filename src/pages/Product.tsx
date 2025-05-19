import { useEffect, useState } from "react";
import { useParams } from "react-router";

import styles from "./Product.module.css";
import { Api, type ProductOverview } from "../Api";
import { OverlayView } from "../components/OverlayView";

export const Product: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );
  const [product, setProduct] = useState<ProductOverview | undefined>();
  const params = useParams();
  const id = params.id ? parseInt(params.id, 10) : -1;

  useEffect(() => {
    Api.fetchProductByIndex(id)
      .then((data) => {
        setProduct(data);
        setStatus("ready");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [id]);

  return (
    <div className={styles.container}>
      {product && <InternalProductOverview product={product} />}
      <OverlayView show={status === "loading"} title="Loading..." />
      <OverlayView
        show={status === "error"}
        title="Something went wrong with data fetching"
      />
    </div>
  );
};

const InternalProductOverview: React.FC<{ product: ProductOverview }> = ({
  product,
}) => (
  <div className={styles.productContainer}>
    <div className={styles.imageContainer}>
      <img src={product.defaultImageUrl} />
    </div>
    <div className={styles.dataSheetContainer}>
      <h1>{product.product.name}</h1>
      <p>{product.line.name}</p>

      <table>
        <tbody>
          <tr>
            <td>Product Line</td>
            <td>{product.line.name}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{product.line.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{product.product.name}</td>
          </tr>
          <tr>
            <td>Short Name</td>
            <td>{product.shortnames}</td>
          </tr>
          <tr>
            <td>Max. Power</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Number of Ports</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
