import { app } from "../express";
import request from "supertest";
import { Sequelize } from "sequelize-typescript";

import ProductModel from "../../../modules/checkout/repository/product.model";
import OrderModel from "../../../modules/checkout/repository/order.model";

import { default as OrderClientModel } from "../../../modules/checkout/repository/client.model";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import { default as StoreProductModel } from "../../../modules/store-catalog/repository/product.model";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import * as CheckStockUseCase from "../../../modules/product-adm/usecase/check-stock/check-stock.usecase";
import * as CheckoutRepository from "../../../modules/checkout/repository/checkout.repository";
import { ClientModel } from "../../client-adm/repository/client.model";
import { InvoiceModel } from "../../invoice/repository/invoice.model";
import GenerateInvoiceUseCase from "../../invoice/usecase/generate/generate.usecase";
import {InvoiceItemModel} from "../../invoice/repository/item.model";

describe("E2E test for checkout", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: console.log, // Habilitar logs
      sync: { force: true },
    });

    sequelize.addModels([
      ProductModel,
      OrderModel,
      ClientModel,
      OrderClientModel,
      TransactionModel,
      StoreProductModel,
      InvoiceModel,
      InvoiceItemModel      
    ]);

    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    //await sequelize.close();
  });

  beforeEach(async () => {
    await sequelize.addModels([ProductModel,
      OrderModel,
      ClientModel,
      OrderClientModel,
      TransactionModel,
      StoreProductModel,
      InvoiceModel,
      InvoiceItemModel]);
    await sequelize.sync({ force: true });
    });

  it("should create a placeorder", async () => {
    const invoiceId = new Id()
    // @ts-ignore
    jest.spyOn(CheckStockUseCase, 'default').mockImplementation(() => ({
      execute: jest.fn(({ productId }: { productId: string }) =>
        Promise.resolve({
          productId,
          stock: 10,
        })
      ),
    }))
    

    jest.spyOn(CheckoutRepository, 'default').mockImplementation(() => ({
      // @ts-ignore
      addOrder: jest.fn((order) => Promise.resolve({
        id: new Id(),
        status: "approved",
        total: 100,
        products: [{
          productId: new Id(),
        }]
      })),
    }))

    await ClientModel.create({
      id: "1",
      name: "test",
      email: "test@test.com",
      document: "test",
      street: "16 avenue",
      number: "123",
      complement: "Ap 400",
      city: "My city",
      state: "State",
      zipCode: "89777310",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    await StoreProductModel.create({
      id: "1",
      name: "test",
      description: "test",
      salesPrice: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "1" }],
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined()
    expect(response.body.invoiceId).toBeDefined()
    expect(response.body.status).toBe("approved")
    expect(response.body.total).toBe(100)
    expect(response.body.products.length).toBe(1)
    expect(response.body.products[0].productId).toBe("1")
    
  });

});