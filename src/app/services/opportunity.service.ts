import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IOpportunity } from '../model/matching/opportunity.interface';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  constructor(private http: HttpClient) {}

  public getOpportunities(): Observable<IOpportunity[]> {
    const url = `${environment.apiUrl}/get_validation_set`;
    return this.http.get<IOpportunity[]>(url);
  }

  public getUploadedOpportunities(): Observable<IOpportunity[]> {
    const url = `${environment.apiUrl}/get_uploaded_oppertunities`;
    return this.http.get<IOpportunity[]>(url);
  }

  public uploadOpportunities(opportunities: IOpportunity[]): Observable<IOpportunity> {
    const url = environment.apiUrl + '/upload_opportunities';
    return this.http.post<IOpportunity>(url, opportunities);
  }

  public deleteUploadedOpportunity(opportunity_name: string): Observable<IOpportunity> {
    const url = `${environment.apiUrl}/delete_uploaded_opportunity/${opportunity_name}`;
    return this.http.delete<IOpportunity>(url);
  }
}
