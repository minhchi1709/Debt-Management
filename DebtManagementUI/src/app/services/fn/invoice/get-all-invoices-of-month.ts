/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Invoice } from '../../models/invoice';

export interface GetAllInvoicesOfMonth$Params {
  year: number;
  month: number;
}

export function getAllInvoicesOfMonth(http: HttpClient, rootUrl: string, params: GetAllInvoicesOfMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Invoice>>> {
  const rb = new RequestBuilder(rootUrl, getAllInvoicesOfMonth.PATH, 'get');
  if (params) {
    rb.path('year', params.year, {});
    rb.path('month', params.month, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Invoice>>;
    })
  );
}

getAllInvoicesOfMonth.PATH = '/invoices/years/{year}/months/{month}';
