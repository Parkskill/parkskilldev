import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes it globally available in the app
})
export class ApicallService {
  private apiUrl = ''; //

  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl;
  }

  getValues(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching data', error);
        return throwError(error); // Handle errors here
      })
    );
  }

  // Example method to fetch data from your API
  getNewTiles() {
    return this.http.get('/api/tiles-list'); // The request will be proxied to http://localhost:8080/users
  }

  getNewFilteredTiles(filter: any) {
    return this.http.get(`/api/tiles-list/${filter}`); // The request will be proxied to http://localhost:8080/users
  }

  getTileCollection() {
    return this.http.get('/api/tiles-collection'); // The request will be proxied to http://localhost:8080/users
  }

  getFilteredRoomScenes(filter: any) {
    return this.http.get(`/api/room-scenes/${filter}`); // The request will be proxied to http://localhost:8080/users
  }

  // Example method to fetch data from your API
  getNewRoomScenes(pageSize:any, pageIndex: any) {
    return this.http.get(`/api/room-scenes/?&page=${pageIndex}`); // The request will be proxied to http://localhost:8080/users
  }

  // Example method to get search results from your API
  getSearchAPI(searchTerm: any,pageSize:any, pageIndex: any) {
    console.log(searchTerm,pageSize,pageIndex)
    return this.http.get(`/api/searchApi?query=${searchTerm ? (searchTerm?.reg ? searchTerm?.reg : searchTerm) : ''}?&page=${pageIndex}`);

  }

  // Example method to get search results from your API
  getSearchAPIFacetFilters() {
    return this.http.get(`/api/api/taxonomies`);
  }

  // Example method to fetch data from your API
  getData2(): Observable<any> {
    return this.http.get(`${this.apiUrl}weatherforecast`);
  }
  getConfiguration(): Observable<any> {
    return this.http.get(`${this.apiUrl}configuration`);
  }
  getAllTiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}tiles`);
  }

  // getRoomScenes(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}tiles/getroomscene`);
  // }
  // getFilters(): Observable<any> {
  //   ///Tiles/GetTiles
  //   return this.http.get(`${this.apiUrl}tiles/getfilters`);
  // }
  getWelcomeImage(guid: string): Observable<any> {
    return this.http.get(`${this.apiUrl}configuration/GetById?guid=` + guid);
  }
}
