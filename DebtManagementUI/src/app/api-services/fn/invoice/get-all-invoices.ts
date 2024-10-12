/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { InvoiceResponse } from '../../models/invoice-response';

export interface GetAllInvoices$Params {
}

export function getAllInvoices(http: HttpClient, rootUrl: string, params?: GetAllInvoices$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<InvoiceResponse>>> {
  const rb = new RequestBuilder(rootUrl, getAllInvoices.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<InvoiceResponse>>;
    })
  );
}

getAllInvoices.PATH = '/invoices';