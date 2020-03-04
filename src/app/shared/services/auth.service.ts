import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

// env
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators/map";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  onLogin(auth: any): Observable<any> {
    return this._httpClient.post<any>(`${environment.apiUrl}/auth/login`, auth);
  }

  getCourseFilter(): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiUrl}/courses/filters`);
  }
}
