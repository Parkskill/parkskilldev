// File: shared/api-resolver.service.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApicallService } from './apicall.service';  // Adjust path if necessary

@Injectable({
  providedIn: 'root'
})
export class ApiResolver  {

  constructor(private apiService: ApicallService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.apiService.getData2();
    
  }
  getCongifuration(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.apiService.getConfiguration();

  }
}
