import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();
const dataSource = new ExternalServices();
const productId = getParam("products");
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();