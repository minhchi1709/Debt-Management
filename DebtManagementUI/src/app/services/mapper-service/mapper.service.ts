import { Injectable } from '@angular/core';
import {Invoice} from "../../api-services/models/invoice";
import {InvoiceRequest} from "../../api-services/models/invoice-request";
import {InvoiceLine} from "../../api-services/models/invoice-line";
import {InvoiceLineRequest} from "../../api-services/models/invoice-line-request";

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  mapToInvoiceRequest(invoice: Invoice) : InvoiceRequest{
    return {
      id: invoice.id,
      date: invoice.date,
      customerId: invoice.customer?.customerId,
      invoiceLines: invoice.invoiceLines?.map(v=> this.mapToInvoiceLineRequest(v))
    }
  }

  mapToInvoiceLineRequest(invoiceLine: InvoiceLine): InvoiceLineRequest {
    return {
      note: invoiceLine.note,
      numberOfBoxes: invoiceLine.numberOfBoxes,
      productId: invoiceLine.product?.productId,
      specificationId: invoiceLine.specification?.id
    }

  }
}
