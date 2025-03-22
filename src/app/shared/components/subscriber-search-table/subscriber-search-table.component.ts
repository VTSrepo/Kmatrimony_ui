import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriber-match-table',
  templateUrl: './subscriber-search-table.component.html',
  styleUrls: ['./subscriber-search-table.component.scss'],
})
export class SubscriberSearchTableComponent implements OnInit {
  @Input()
  set profileTableData(value: any) {
    console.log(value);
    this.dataSource.data = value;
  }
  @Input() showListingAction = false;
  @Output() shortlistEmit = new EventEmitter();
  @Output() matchEmit = new EventEmitter();

  dataSource = new MatTableDataSource(this.profileTableData);
  constructor(private router: Router, private us:UtilityService) {}
  ngOnInit(): void {}

  displayedColumns: string[] = [
    'profile_name',    
    'dob',
    'age',
    'gothram',
    'caste_sect',
    'subsect',
    'star',
    'star_paadam',
    'rasi',
    'education',
    'job_location',
    'action',
    'sortlist',
  ];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  } 

  shortList(profile: any) {
    this.shortlistEmit.emit({
      profile_source: profile.profile_source,
      profile_code: profile.profile_code,
      shortList: true,
    });
  }

  delist(profile: any) {
    this.shortlistEmit.emit({
      profile_source: profile.profile_source,
      profile_code: profile.profile_code,
      shortList: false,
    });
  }

  gotoProfile(profile: any) {
    this.router.navigate(['/profiles/create-profile'], { state: profile });
  }

  loadMatch(profile: any) {
    this.matchEmit.emit(profile);
  }

  formatDate(date:any){
    return this.us.convertTodayTostrDDMMYYYY(date)
  }
}
