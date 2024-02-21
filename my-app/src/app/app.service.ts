import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  sendOrder(data: any) {
    return this.http.post('https://testologia.site/burgers-order', data);
  }
}
