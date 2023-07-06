import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IValidationSummary } from '../model/matching/validation-summary.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationSummaryService {
  constructor(private http: HttpClient) {}

  public getValidationSet(): Observable<IValidationSummary[]> {
    const url = environment.apiUrl + '/validation_summary';
    return this.http.get<IValidationSummary[]>(url);
  }
}
