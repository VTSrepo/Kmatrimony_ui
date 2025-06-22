import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Profile } from 'src/app/shared/models/profile';
import { CommonService, RefType } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriber-home',
  templateUrl: './subscriber-home.component.html',
  styleUrls: ['./subscriber-home.component.scss'],
})
export class SubscriberHomeComponent implements OnInit {
  myProfiles: Profile[] = [];
  shortlistings: Profile[] = [];
  isAdmin: boolean = false;
  showMatchTable = false;
  profile!: Profile;

  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.homeService.profilesBySubscriberId().subscribe((res) => {
      this.myProfiles = res;
      if (history.state && history.state.retainSearch) {
        this.profile = this.myProfiles[0];
        this.showMatchTable = true;
      }
      this.homeService
        .shortlistings({ profile_code: this.myProfiles[0].profile_code })
        .subscribe((res) => {
          this.shortlistings = res;
        });
    });

    this.authService.isAdmin$.subscribe((isAdmin) => {
      if (isAdmin) {
        this.isAdmin = isAdmin;
      } else {
        this.isAdmin = this.authService.validateAdmin();
      }
    });
  }

  gotoProfile() {
    this.router.navigate(['/profiles/create-profile']);
  }

  reloadHome() {
    this.homeService
      .shortlistings({ profile_code: this.myProfiles[0].profile_code })
      .subscribe((res) => {
        this.shortlistings = res;
        this.showMatchTable = false;
      });
  }

  matchEmitter(profile: any) {
    this.showMatchTable = true;
    this.profile = profile;
  }

  // changeSect(sect: string) {
  //   this.commonService.getReferenceData(sect).subscribe((subsect) => {
  //     this.subsectList = subsect;
  //   });
  // }
}
