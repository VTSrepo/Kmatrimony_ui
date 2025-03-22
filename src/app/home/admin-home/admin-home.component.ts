import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/profiles/profile.service';
import { GetProfile } from 'src/app/shared/enums/getProfile';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  
  last10daysexpiringprofiles=[];
  last7dayscreatedprofiles=[];
  constructor(private profileService:ProfileService){

  }

  ngOnInit(): void {
    this.profileService.getProfiles(GetProfile.LAST10DAYSUBS).subscribe((res) => {
      this.last10daysexpiringprofiles = res;
    });
    this.profileService.getProfiles(GetProfile.LAST7DAYSCREATION).subscribe((res) => {
      this.last7dayscreatedprofiles = res;
    });
  }



}
