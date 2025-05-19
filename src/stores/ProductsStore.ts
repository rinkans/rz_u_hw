import { makeAutoObservable, runInAction } from "mobx";
import { Api, type ProductSnippet } from "../Api";
import type { MultiSelectItems } from "../components/MultiSelect";
import debounce from "lodash/debounce";

export class ProductsStore {
  public state: "loading" | "error" | "ready" = "loading";
  public searchText = "";
  public products: ProductSnippet[] = [];

  public productLineMultiSelectData: MultiSelectItems = [];

  public debouncedFetchFilteredProducts: () => void;

  public get numberOfResults() {
    return this.products.length;
  }

  public setProductLineMultiSelectData = (
    productLineMultiSelectData: MultiSelectItems
  ) => {
    this.productLineMultiSelectData = productLineMultiSelectData;
    this.debouncedFetchFilteredProducts();
  };

  public setSearchText = (searchText: string) => {
    this.searchText = searchText;
    this.debouncedFetchFilteredProducts();
  };

  public get filteredProductLines() {
    return this.productLineMultiSelectData
      .filter((item) => item.checked)
      .map((item) => item.title);
  }

  public constructor() {
    makeAutoObservable(this);

    Api.fetchAllProductLines()
      .then((productLineNames) => {
        runInAction(() => {
          this.productLineMultiSelectData = productLineNames.map(
            (productLineName) => ({
              id: productLineName,
              title: productLineName,
              checked: false,
            })
          );

          this.state = "ready";
        });
      })
      .catch(() => {
        this.state = "error";
      });

    this.debouncedFetchFilteredProducts = debounce(
      this.fetchFilteredProducts,
      500
    );
    this.fetchFilteredProducts();
  }

  public async fetchFilteredProducts() {
    try {
      const newProducts = await Api.fetchAllProducts({
        productName: this.searchText,
        productLines: this.filteredProductLines,
      });
      runInAction(() => {
        this.products = newProducts;
      });
    } catch (err) {
      this.state = "error";
      console.warn(err);
    }
  }
}
