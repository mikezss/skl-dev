import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent} from 'rxjs';
import {map, filter, scan, retry} from 'rxjs/operators';
import {LoginService} from '../login/login.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

const httpuploadOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DevService {

  constructor(private ls: LoginService, private http: HttpClient) {
  }

  getcontrols(): Observable<any> {
    return this.http.get('/assets/controls.json').pipe();
  }

  getbuttons(): Observable<any> {
    return this.http.get('/assets/buttons.json').pipe();
  }

  getpagestyles(): Observable<any> {
    return this.http.get('/assets/pagestyles.json').pipe();
  }

  getcomponentjson(): Observable<any> {

    return this.http.get(this.ls.api_url + '/dev/getcomponenttreejson', httpOptions).pipe();
  }

  savecomponent(formdata, listdata): Observable<any> {
    let newformdata: any = {};
    this.ls.deepCopy(formdata, newformdata);
    newformdata.Buttons = newformdata.Buttons.toString();
    return this.http.post(this.ls.api_url + '/dev/savecomponent', {'Component': newformdata, 'Detail': listdata}, httpOptions).pipe();
  }

  createcomponent(formdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/dev/createcomponent', formdata, httpOptions).pipe();
  }

  deletecomponent(formdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/dev/deletecomponent', formdata, httpOptions).pipe();
  }

  getcomponents(): Observable<any> {
    return this.http.get(this.ls.api_url + '/dev/getallcomponent', httpOptions).pipe();
  }

  getcomponentsoptions(): Observable<any> {
    return this.http.get(this.ls.api_url + '/dev/getallcomponentoptions', httpOptions).pipe();
  }

  getcomponentbyid(componentname): Observable<any> {
    return this.http.post(this.ls.api_url + '/dev/getcomponent', {'Componentname': componentname}, httpOptions).pipe();
  }

}
