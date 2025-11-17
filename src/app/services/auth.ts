import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  token: string | null = localStorage.getItem('token');
  private baseUrl:string  = 'https://localhost:7200/api/authentication/authenticate';

  async logIn(email: string, password: string) {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    console.log(res);


    this.token = await res.text();
    localStorage.setItem('token', this.token || '');
  }

}
