import { UserPreference } from './../models/UserPreference';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  basePath = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


constructor(private http: HttpClient) { }
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.log(`An error occurred: ${error.error.message} `);
  }
  else {
    console.error(
      `Backend returned code ${error.status}, body was: ${error.error}`
    );
  }

  return throwError('Something happened with request, please try again later');
}

get_recommendations(){
  return this.http.get<any>(`${this.basePath}/recommendation`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
 post_user_preference(userPreference:UserPreference){
  return this.http.post<any>(`${this.basePath}/userpreference`,JSON.stringify(userPreference) ,this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

 }
 get_user_preferences(){
  return this.http.get<any>(`${this.basePath}/userpreference`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


 }

 
get_teams_by_user(user_id:number){

  return this.http.get<any>(`${this.basePath}/userpreference/${user_id}/team`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
get_recommendation_by_user(user_id:number){
  return this.http.get<any>(`${this.basePath}/recommendation/user/${user_id}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}
delete_user_preference_by_team_name(team_name:string,user_id:number){

  return this.http.delete<any>(`${this.basePath}/userpreference/${user_id}/team/${team_name}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));

}

create_recommendation_by_user_preferences(user_id:number){

  return this.http.post<any>(`${this.basePath}/recommendation/userpreference/${user_id}`, this.httpOptions)
  .pipe(
    retry(2),
    catchError(this.handleError));


}








}
