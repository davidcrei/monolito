import express,{Express} from "express"
import { Sequelize } from "sequelize-typescript";
import { clientRoute } from "./routes/client.route";
import { ClientModel } from "../client-adm/repository/client.model";
import { InvoiceModel } from "../invoice/repository/invoice.model";
import { invoicesRoute } from "./routes/invoice.router";
import { InvoiceItemModel } from "../invoice/repository/item.model";
import { productRoute } from "./routes/produto.route";
import { checkoutRoute } from "./routes/checkout.route";
import OrderModel from "../../modules/checkout/repository/order.model";

import { ProductModel as AdmProductModel } from  "../product-adm/repository/product.model";
import ProductModel from "../../modules/checkout/repository/product.model";
import { default as StoreProductModel } from "../../modules/store-catalog/repository/product.model";

export const app: Express = express();
app.use(express.json());
app.use("/client",clientRoute);
app.use("/invoice",invoicesRoute);
app.use("/products",productRoute);
app.use("/checkout",checkoutRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });

  sequelize.addModels([
    ClientModel,
    InvoiceModel,
    InvoiceItemModel, 
    OrderModel,
    AdmProductModel,
    ProductModel,
    StoreProductModel
]);

  await sequelize.sync();
}

setupDb();