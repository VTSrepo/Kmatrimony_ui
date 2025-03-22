import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetProfile } from '../shared/enums/getProfile';
// import { Config } from '../config/app.config';

@Injectable({
    providedIn: 'root'
  })

export class ProfileService {

    constructor(public http: HttpClient) {}

    
    public getProfiles(fetchType: GetProfile): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.get(environment.localUrl + 'getprofiles?filter='+fetchType,
        { headers: headers})
    }   

    public saveProfile(profile: any): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      if(profile.profile_code){
        return this.http.put(environment.localUrl + 'updateProfile', profile, {
          headers: headers,
        });
      } else {
        return this.http.post(environment.localUrl + 'createProfile', profile, {
          headers: headers,
        });
      }
      
    }
}