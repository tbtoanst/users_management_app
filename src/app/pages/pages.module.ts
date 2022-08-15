import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { Menubar, Navbar } from '../shared/components';
import { UserForm, UserModal, UserTable } from './user-list/components';
import { UserListComponent as UserListPage } from './user-list/user-list.component';
import { HomeComponent as HomePage } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    PagesComponent,
    Navbar,
    Menubar,
    HomePage,
    UserListPage,
    UserTable,
    UserModal,
    UserForm,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ]
})
export class PagesModule { }
