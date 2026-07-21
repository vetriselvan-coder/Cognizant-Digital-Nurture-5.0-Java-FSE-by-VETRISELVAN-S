import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Hardcoded login status for Hands-on
  isLoggedIn = false;

  constructor() {}

}