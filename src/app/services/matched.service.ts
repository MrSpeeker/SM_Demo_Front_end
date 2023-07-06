import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchedService {
  constructor(private http: HttpClient) {}

  public matchOpportunity(
    id: string,
    useUploaded: boolean,
    uploaded_opportunity: boolean
  ): Observable<string> {
    const url = `${environment.apiUrl}/matchOpportunity/${id}/${useUploaded}/${uploaded_opportunity}`;
    return this.http.get<string>(url);
  }
}
