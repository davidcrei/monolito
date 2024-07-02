import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PlaceOrderUseCase from "../../checkout/usecase/pace-order/place-order.usecase";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "../../checkout/usecase/pace-order/place-order.dto";
import CheckoutRepository from "../../checkout/repository/checkout.repository";



export const checkoutRoute = express.Router();
const repository = new CheckoutRepository();

checkoutRoute.post("/", async (request: Request, response: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductAdmFacadeFactory.create();
  const catalogFacade = StoreCatalogFacadeFactory.create();
  const paymentFacade = PaymentFacadeFactory.create();
  const invoiceFacade = InvoiceFacadeFactory.create();
  
  const usecase = new PlaceOrderUseCase(
    clientFacade,
    productFacade,
    catalogFacade,
    repository,
    invoiceFacade,
    paymentFacade,
  );

  try {
    const { clientId, products } = request.body;

    const orderDto: PlaceOrderInputDto = {
      clientId,
      products,
    };

    const output: PlaceOrderOutputDto = await usecase.execute(orderDto);

    response.status(200).send(output);
  } catch (error) {
    console.error(error);
    response.status(400).send(error);
  }
});