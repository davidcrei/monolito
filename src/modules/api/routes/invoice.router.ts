
import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import { FindInvoiceUseCaseInputDTO } from "../../invoice/usecase/find/find.usecase.dto";
export const invoicesRoute = express.Router();

invoicesRoute.get("/:id", async (request: Request, response: Response) => {
  const facade = InvoiceFacadeFactory.create();

  try {
    const input: FindInvoiceUseCaseInputDTO = {
      id: request.params.id,
    };

    const invoice = await facade.find(input.id);

    response.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    response.status(400).send(error);
  }
});