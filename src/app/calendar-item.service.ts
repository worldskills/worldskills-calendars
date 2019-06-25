import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../environments/environment';
import { CalendarItemList } from './calendar-item-list';
import { CalendarItem } from './calendar-item';

@Injectable({
  providedIn: 'root'
})
export class CalendarItemService {

  constructor(private http: HttpClient) { }

  getItems(name: string, country: number, offset: number, limit: number): Observable<CalendarItemList> {
    let url = `${environment.apiEndpoint}/calendars/items`;
    let params = {
      l: 'en',
      calendar: '1',
      offset: `${offset}`,
      limit: `${limit}`,
    };
    if (name) {
      params['name'] = name;
    }
    if (country) {
      params['country'] = `${country}`;
    }
    return this.http.get<CalendarItemList>(url, { params: params });
  }

  getItem(id: number): Observable<CalendarItem> {
    let url = `${environment.apiEndpoint}/calendars/items/${id}`;
    return this.http.get<CalendarItem>(url);
  }

  addItem(item: CalendarItem): Observable<CalendarItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let url = `${environment.apiEndpoint}/calendars/items`;
    return this.http.post<CalendarItem>(url, item, httpOptions);
  }

  updateItem(item: CalendarItem): Observable<CalendarItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let url = `${environment.apiEndpoint}/calendars/items/${item.id}`;
    return this.http.put<CalendarItem>(url, item, httpOptions);
  }

  cloneItem(id: number): Observable<CalendarItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let url = `${environment.apiEndpoint}/calendars/items/${id}/clone`;
    return this.http.post<CalendarItem>(url, httpOptions);
  }

  deleteItem(id: number): Observable<{}> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let url = `${environment.apiEndpoint}/calendars/items/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
