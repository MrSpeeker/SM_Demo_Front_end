import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ICv } from '../model/matching/cv.interface';


@Injectable({
  providedIn: 'root',
})
export class CvService {
  constructor(private http: HttpClient) {}

  public getUploadedCvs(): Observable<ICv[]> {
    const url = `${environment.apiUrl}/get_uploaded_cvs`;
    return this.http.get<ICv[]>(url);
  }

  public uploadCvs(cvs: ICv[]): Observable<object> {
    const url = `${environment.apiUrl}/upload_cvs`;
    return this.http.post(url, cvs);
  }

  public deleteUploadedCV(cv_id: string): Observable<object> {
    const url = `${environment.apiUrl}/delete_uploaded_cv/${cv_id}`;
    return this.http.delete(url);
  }
}
