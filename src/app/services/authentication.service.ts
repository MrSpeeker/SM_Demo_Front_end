import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isLoggedIn = false;

  constructor(private msalService: MsalService) {}

  public async setActiveAcount() {
    await this.msalService.instance.handleRedirectPromise().then((res) => {
      if (res != null && res.account != null) {
        this.msalService.instance.setActiveAccount(res.account);
        this.isLoggedIn = true;
      }
    });
  }

  public verifyLogin() {
    this.isLoggedIn = this.msalService.instance.getActiveAccount() != null;
  }

  public login() {
    this.msalService.loginRedirect();
  }

  public logout() {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: environment.redirectUri,
    });
    this.isLoggedIn = false;
  }
}
