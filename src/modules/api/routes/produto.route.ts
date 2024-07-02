import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../product-adm/facade/product-adm.facade.interface";

export const productRoute = express.Router();

productRoute.post("/", async (request: Request, response: Response) => {
  const facade = ProductAdmFacadeFactory.create();

  try {
    const { id, name, description, purchasePrice,stock } = request.body;

    const productDto: AddProductFacadeInputDto = {
      id,
      name,
      description,
      purchasePrice,
      stock,
      
    };

    await facade.addProduct(productDto);

    response.status(200).send();
  } catch (error) {
    response.status(400).send(error);
  }
});