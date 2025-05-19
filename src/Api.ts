import { z } from "zod";

const API_URL = "https://static.ui.com/fingerprint/ui/public.json";

const generateDefaultImageUrl = (
  id: string,
  defaultImageId: string,
  width: number
) =>
  `https://images.svc.ui.com/?u=https://static.ui.com/fingerprint/ui/images/${id}/default/${defaultImageId}.png&w=${width}&q=75`;

const fetchProductsResponseSchema = z.object({
  devices: z.array(
    z.object({
      id: z.string(),
      shortnames: z.array(z.string()),
      images: z.object({
        default: z.string(),
      }),
      line: z.object({
        id: z.string(),
        name: z.string(),
      }),
      product: z.object({
        name: z.string(),
      }),
    })
  ),
});

type FetchProductsResponseSchema = z.infer<typeof fetchProductsResponseSchema>;

export type ProductSnippet = FetchProductsResponseSchema["devices"][number] & {
  thumbnailImageUrl: string;
};

export type ProductOverview = FetchProductsResponseSchema["devices"][number] & {
  defaultImageUrl: string;
};

export type FetchAllProductsFilter = {
  productName: string;
  productLines: string[];
};

export class Api {
  private static devicesCache:
    | FetchProductsResponseSchema["devices"]
    | undefined;

  private static fetchPromise: Promise<Response> | undefined;

  /*
   * Because I have created a cache for request, I have opted out of
   * using abortController as after first request, everything will come from
   * cache
   */
  private static fetchData = async () => {
    if (Api.devicesCache) {
      return Api.devicesCache;
    }

    if (!Api.fetchPromise) {
      Api.fetchPromise = fetch(API_URL).then((response) => response.json());
    }

    const json = await Api.fetchPromise;

    // As mentioned in instructions, Api might change so this is safety check
    const validatedData = fetchProductsResponseSchema.parse(json);

    Api.devicesCache = validatedData.devices;
    return Api.devicesCache;
  };

  public static fetchAllProducts = async (
    filter: FetchAllProductsFilter
  ): Promise<ProductSnippet[]> => {
    const devices = await Api.fetchData();

    return devices
      .filter((device) => {
        return (
          new RegExp(filter.productName, "gim").test(device.product.name) &&
          (filter.productLines.length === 0 ||
            filter.productLines.includes(device.line.name))
        );
      })
      .map((item) => ({
        ...item,
        thumbnailImageUrl: generateDefaultImageUrl(
          item.id,
          item.images.default,
          32
        ),
      }));
  };

  public static fetchAllProductLines = async () => {
    const devices = await Api.fetchData();
    const productLines = devices.map((item) => item.line.name);
    // Easy solution to getting only unique values
    return [...new Set(productLines)];
  };

  public static fetchProductByIndex = async (
    index: number
  ): Promise<ProductOverview> => {
    const devices = await Api.fetchData();
    return {
      ...devices[index],
      defaultImageUrl: generateDefaultImageUrl(
        devices[index].id,
        devices[index].images.default,
        292
      ),
    };
  };
}
