import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes it globally available in the app
})
export class ApicallService {

  private apiUrl = '';  //

  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl;
  }

  getValues(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching data', error);
          return throwError(error);  // Handle errors here
        })
      );
  }


  // Example method to fetch data from your API
  getDrupalData() {
    return this.http.get('/api/tiles'); // The request will be proxied to http://localhost:8080/users
  }

  
  // Example method to fetch data from your API
  getData2(): Observable<any> {
    return this.http.get(`${this.apiUrl}weatherforecast`);
  }
  getConfiguration(): Observable<any> {
    return this.http.get(`${this.apiUrl}configuration`);
  }
  getAllTiles(): Observable<any> {
    ///Tiles/GetTiles
    return this.http.get(`${this.apiUrl}tiles`);
  }
  getRoomScenes(): Observable<any> {
    ///Tiles/GetTiles
    return this.http.get(`${this.apiUrl}tiles/getroomscene`);
  }
  getFilters(): Observable<any> {
    ///Tiles/GetTiles
    return this.http.get(`${this.apiUrl}tiles/getfilters`);
  }
  getWelcomeImage(guid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}configuration/GetById?guid=` + guid);
  }
}
