import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_FORM_DATA, PROFILE, REGISTER_FORM_DATA } from 'src/app/models/auth';
import { HTTP_REQ } from 'src/app/models/common';
import { v4 as uuidv4 } from 'uuid';
import { ApiService, GlobalDataService } from '../common';
import { SnackMessageService } from '../notification';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService,
    private snackMessage: SnackMessageService,
    private globalDataService: GlobalDataService
  ) {}
  // register service
  async register(formData: REGISTER_FORM_DATA) {
    delete formData.passwordConfirm;
    // ! JSON SERVER NOT RETURN ID VALUE
    const userUUID = uuidv4();
    const httpData: HTTP_REQ = {
      url: 'register',
      body: {
        email: formData.email,
        password: formData.password,
        id: userUUID,
      },
    };
    const { success, data, error } = await this.apiService.post(httpData);

    if (success && data?.accessToken) {
      this.setCookies(data?.accessToken, formData?.email);

      const profileHttpData: HTTP_REQ = {
        url: 'profiles',
        body: {
          userId: userUUID,
          email: formData.email,
          fullName: formData.fullName,
          role: 1,
        },
      };
      const profileResult = await this.apiService.post(profileHttpData);
      if (profileResult?.success) {
        this.router.navigate(['']);
      }
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during register',
      });
    }
  }
  // login service
  async login(formData: LOGIN_FORM_DATA) {
    const httpData: HTTP_REQ = { url: 'login', body: formData };
    const { success, data, error } = await this.apiService.post(httpData);
    if (success && data?.accessToken) {
      this.setCookies(data?.accessToken, formData?.email);
      this.router.navigate(['']);
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during login',
      });
    }
  }
  async userProfile(): Promise<PROFILE | null> {
    const userMail = this.cookieService.get('email');
    const httpData: HTTP_REQ = { url: 'profiles', params: { email: userMail } };
    const { success, error, data } = await this.apiService.get(httpData);
    if (success && data?.length > 0) {
      const userInfo: PROFILE = data[0];
      this.globalDataService.currentUser$.next(userInfo);
      return userInfo;
    } else {
      this.snackMessage.show({
        message: error?.message || 'Failure during get profile',
      });
      return null;
    }
  }
  logOut() {
    this.cookieService.deleteAll();
    this.globalDataService.currentUser$.next(null);
    this.router.navigate(['/auth']);
  }
  private setCookies(oAuthToken: string, email: string) {
    const expires = this.expireTime1Hour;
    this.cookieService.set('authToken', oAuthToken, {
      path: '/',
      expires,
    });
    this.cookieService.set('email', email, { path: '/', expires });
  }
  private get expireTime1Hour() {
    const dNow = new Date();
    let dTime = dNow.getTime();
    dTime += 3600 * 1000;
    dNow.setTime(dTime);
    return dNow;
  }
}
