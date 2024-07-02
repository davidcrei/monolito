import Id from "../../@shared/domain/value-object/id.value-object";
import { app, sequelize } from "../express";
import request from "supertest";

import { ProductModel } from "../../product-adm/repository/product.model"

describe("E2E test for product", () => {
    beforeEach(async () => {
      await sequelize.addModels([ProductModel]);
      await sequelize.sync({ force: true });
      });

  afterAll(async () => {
    await sequelize.close();
  });

  it("creates a product", async () => {
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    }

    const response = await request(app)
      .post("/products")
      .send(input);

    expect(response.status).toBe(200);
    
  });
});