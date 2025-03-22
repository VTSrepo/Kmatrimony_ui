import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';


@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss']
})
export class profileTableComponent implements OnInit {
  @Input()
  set profileTableData(value: any) {
    console.log(value);
    this.dataSource.data = value;   
  }
  @Input() isAdmin:boolean = false;
  @Output() updateEmit = new EventEmitter();

  dataSource = new MatTableDataSource(this.profileTableData);
  constructor(private router:Router, private us:UtilityService){}
  ngOnInit(): void {
   console.log(this.isAdmin)
  }


  formatDate(date:any){
    return this.us.convertTodayTostrDDMMYYYY(date)
  }

  displayedColumns: string[] = ['profile_name', 'gendar','dob','marriage_status', 'citizenship','subscription_end_date', 'primary_contact', 'action'];


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  edit_apt(value: any) {
    //this.router.navigate(['/apt-booking'], { state: value });
  }

  goToConsult(apt: any) {
    //this.router.navigate(['/pet-consultation-home'], { state: apt });
  }
  gotoProfile(profile:any){
    this.router.navigate(['/profiles/create-profile'],{ state: profile });
  }

}
