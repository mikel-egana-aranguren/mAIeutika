// authentication.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = "http://127.0.0.1:8000";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    const currentUser = this.currentUserSubject.value;
    if (currentUser === null) {
      return null;
    }
    if (Object.keys(currentUser).length === 0) {
      return null;
    } else {
      return currentUser;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.apiUrl+"/login", {"username": username, "password": password}).pipe(
      map((response: any) => {
        console.log('POST request successful:', response);
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify({ username: username }));
          this.currentUserSubject.next({ username: username });
        }
        return response;
      }),
      catchError((error: any) => {
        console.error('Error during POST request:', error);
        return of(false);
      })
    );
  }

  logout() {
    // Remove user details from localStorage and set currentUser to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post(this.apiUrl+"/register", {"username": username, "password": password}).pipe(
      map((response: any) => {
        console.log('POST request successful:', response);
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify({ username: username }));
          this.currentUserSubject.next({ username: username });
        }
        return response;
      }),
      catchError((error: any) => {
        console.error('Error during POST request:', error);
        // Handle errors if needed
        return of(false);
      })
    );
  }
}

