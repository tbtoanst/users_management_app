import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth';
import { PROFILE } from 'src/app/models/auth';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser!: Promise<PROFILE | null>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.userProfile();
  }
  logOut() {
    this.authService.logOut();
  }

}
