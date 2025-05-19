import jsonData from "../public/db.json";
import type { Product } from "./types";

export const fetchApi = (): Product[] => {
  return jsonData.devices.map((item) => ({
    productLine: item.line.name,
    name: item.product.name,
    thumbnailImage: `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${item.id}/default/${item.images.default}.png&w=32&q=75`,
  }));
};
