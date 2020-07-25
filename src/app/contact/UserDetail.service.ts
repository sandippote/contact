import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response, userdetails } from './user-detail.modal';
import { retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserDetailService {

    constructor(
        private _http: HttpClient
    ) { }

    /**
     * 
     * @param searchVal 
     * @param pageNo 
     * @param perPage 
     */
    getDetails(searchVal, pageNo: number, perPage: number): Observable<any> {
        return this._http.get<Response<userdetails[]>>
            ('https://api.github.com/search/users?q=' + searchVal + '&page=' + pageNo + '&per_page=' + perPage).pipe(
                retry(3)
            );
    }

    /**
     * 
     * @param name 
     */
    userInfo(name: string): Observable<any> {
        return this._http.get<Response<any>>('https://api.github.com/users/' + name + '/repos');
    }
}