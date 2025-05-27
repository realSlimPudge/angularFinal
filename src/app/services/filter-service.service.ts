import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterServiceService {
  private baseUrl = 'http://localhost:1452/api/';

  constructor(private http: HttpClient) { }

  getProducts(params?: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`, { params });
  }
  getFilters(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/filters`);
  }
}
