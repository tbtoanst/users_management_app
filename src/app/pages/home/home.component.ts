import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth';
import { GlobalDataService } from 'src/app/core/services/common';
import { PROFILE } from 'src/app/models/auth';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly userRoles: string[] = environment.userRoles;
  currentUser$: Observable<PROFILE | null> =
    this.globalData.currentUser$.asObservable();
  constructor(
    private globalData: GlobalDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  logOut() {
    this.authService.logOut();
  }

}

