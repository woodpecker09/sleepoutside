import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();
const dataSource = new ProductData();
const productId = getParam("products");
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();