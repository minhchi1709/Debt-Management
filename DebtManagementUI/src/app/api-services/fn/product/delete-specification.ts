/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteSpecification$Params {
  id: string;
  'specification-id': number;
}

export function deleteSpecification(http: HttpClient, rootUrl: string, params: DeleteSpecification$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, deleteSpecification.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
    rb.path('specification-id', params['specification-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

deleteSpecification.PATH = '/products/{id}/specifications/{specification-id}';