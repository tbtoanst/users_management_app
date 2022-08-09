import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth';
import { PROFILE } from 'src/app/models/auth';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  currentUser!: Promise<PROFILE | null>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.userProfile();
  }
  logOut() {
    this.authService.logOut();
  }

}
