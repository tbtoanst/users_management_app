import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PROFILE } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  currentUser$ = new BehaviorSubject<PROFILE | null>(null);
  constructor() { }
}
