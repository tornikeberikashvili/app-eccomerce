import {inject, Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";




@Injectable({
  providedIn: 'root'
})

export class ApiService{
  apiUrl = environment.firebaseUrl

  http:HttpClient = inject(HttpClient)


  get<T>(path: string, params?: HttpParams):Observable<T> {

    const httpParams = new HttpParams({
      fromObject:params as any
    })

    return this.http.get<T>(`${this.apiUrl}/${path}`, {
      params: httpParams

    })
  }
  post<T>(path: string, body: any):Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, body)
  }

  put<T>(path: string, body: any):Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${path}`, body)
  }

  delete<T>(path: string,params?: any):Observable<T> {
    const httpParams = new HttpParams({
      fromObject:params
    })
    return this.http.delete<T>(`${this.apiUrl}/${path}`,{
      params: new HttpParams()
    })
  }

}

