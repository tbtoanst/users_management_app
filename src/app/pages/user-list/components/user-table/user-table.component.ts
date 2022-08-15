import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalDataService } from 'src/app/core/services/common';
import { PROFILE } from 'src/app/models/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})

export class UserTableComponent implements OnInit {
  private readonly userRoles = environment?.userRoles;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;
  @Input() users: PROFILE[] | null;
  @Output() update = new EventEmitter<PROFILE>();
  @Output() delete = new EventEmitter<PROFILE>();
  displayedColumns: string[] = ['update', 'delete', 'fullname', 'username', 'role'];
  data: any =  []
  dataSource: any
  constructor(private globalData: GlobalDataService) {
    this.users = []
  }
  ngOnInit(): void {
    this.initTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initTable();
  }

  visualizeUserRole(roleIndex: number | undefined): string {
    return this.userRoles[roleIndex ? roleIndex : 0];
  }
  // AVOID TO DELETE CURRENT USER
  isOwner(user: PROFILE): boolean {
    return this.globalData.currentUser$.getValue()?.id === user?.id;
  }
  // FOR LOOP PERFORMANCE
  trackByFn(index: number, user: PROFILE): number {
    return user?.id;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  initTable(){
    this.data = this.users;
    this.dataSource = new MatTableDataSource<PROFILE>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }
}
