import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeService } from '../home.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Profile } from 'src/app/shared/models/profile';
import { CommonService, RefType } from 'src/app/shared/services/common.service';

interface SearchProfile {
  caste_sect: string;
  subsect: string;
  star_paadam: string;
  gothram: string;
  star: string;
  rasi: string;
  age_pref_from: 0;
  age_pref_to: 0;
  height_pref_from: string;
  height_pref_to: string;
  salary_preference: 0;
  job_location: string;
}

@Component({
  selector: 'app-subscriber-search',
  templateUrl: './subscriber-search.component.html',
  styleUrls: ['./subscriber-search.component.scss'],
})
export class SubscriberSearchComponent implements OnInit {
  @Input() profile!: Profile;
  @Output() backToHome = new EventEmitter();

  myProfiles = [];
  isAdmin: boolean = false;
  searchProfile!: SearchProfile;
  gothramList = [] as RefType[];
  sectList = [] as RefType[];
  subsectList = [] as RefType[];
  rasiList = [] as RefType[];
  starList = [] as RefType[];
  starPadamList = ['', 1, 2, 3, 4];

  matchedList: Profile[] = [];

  filteredLocations!: string[];

  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    // this.homeService.profilesBySubscriberId().subscribe((res) => {
    //   this.myProfiles = res;
    // });
    this.authService.isAdmin$.subscribe((isAdmin) => {
      if(isAdmin){
        this.isAdmin = isAdmin;
      } else {
        this.isAdmin = this.authService.validateAdmin()
      }
    });

    this.searchProfile = {
      caste_sect: '',
      subsect: '',
      star_paadam: '',
      gothram: '',
      star: '',
      rasi: '',
      age_pref_from: this.profile.age_pref_from,
      age_pref_to: this.profile.age_pref_to,
      height_pref_from: this.profile.height_pref_from,
      height_pref_to: this.profile.height_pref_to,
      salary_preference: 0,
      job_location: '',
    };

    this.commonService.getReferenceData('Gothram').subscribe((gothramList) => {
      this.gothramList = gothramList;
    });
    this.commonService.getReferenceData('Sect').subscribe((sect) => {
      this.sectList = sect;
    });
    this.commonService.getReferenceData('Rasi').subscribe((rasi) => {
      this.rasiList = rasi;
    });
    this.commonService.getReferenceData('Star').subscribe((star) => {
      this.starList = star;
    });
    this.matchprofilesSearch();
  }

  matchprofilesSearch() {
    const params = {
      gendar: this.profile.gendar,
      age: this.profile.age,
      star: this.profile.star,
      profile_code: this.profile.profile_code,
    };
    this.homeService.matchProfiles(params).subscribe((res) => {
      this.matchedList = res;
      this.tableData = res;

      this.filteredLocations = [
        ...new Set(this.matchedList.map((item) => item.job_location ?? '')),
      ]; // [ 'A', 'B']

      this.search();
    });
  }

  changeSect(sect: string) {
    this.commonService.getReferenceData(sect).subscribe((subsect) => {
      this.subsectList = subsect;
    });
  }

  tableData: Profile[] = [];

  search() {
    const filteredResult = this.matchedList.filter((item) => {    

      return (
        (this.searchProfile.gothram === '' || 
          item.gothram?.toLowerCase() ===
            this.searchProfile.gothram.toLowerCase()) &&
        (this.searchProfile.rasi === '' ||
          item.rasi?.toLowerCase() === this.searchProfile.rasi.toLowerCase()) &&
        (this.searchProfile.star === '' ||
          item.star?.toLowerCase() === this.searchProfile.star.toLowerCase()) &&
        (this.searchProfile.caste_sect === '' ||
          item.caste_sect?.toLowerCase() ===
            this.searchProfile.caste_sect.toLowerCase()) &&
        (this.searchProfile.subsect === '' ||
          item.subsect?.toLowerCase() ===
            this.searchProfile.subsect.toLowerCase()) &&
        (this.searchProfile.star_paadam === '' ||
          item.star_paadam?.toLowerCase() ===
            this.searchProfile.star_paadam.toLowerCase()) &&
        (this.searchProfile.salary_preference === 0 ||
          item.salary_preference === this.searchProfile.salary_preference) &&
        (this.searchProfile.job_location === '' ||
          item.job_location === this.searchProfile.job_location) &&
        (this.searchProfile.height_pref_from === '' ||
          this.searchProfile.height_pref_from === null ||
          parseFloat(item.height) >=
            parseFloat(this.searchProfile.height_pref_from)) &&
        (this.searchProfile.height_pref_to === '' ||
          this.searchProfile.height_pref_to === null ||
          parseFloat(item.height) <=
            parseFloat(this.searchProfile.height_pref_to)) &&
        (this.searchProfile.age_pref_from === 0 ||
          this.searchProfile.age_pref_from === null ||
          (this.profile.gendar === 'M'
            ? item.age <= this.profile.age - this.searchProfile.age_pref_from
            : item.age >=
              this.profile.age + this.searchProfile.age_pref_from)) &&
        (this.searchProfile.age_pref_to === 0 ||
          this.searchProfile.age_pref_to === null ||
          (this.profile.gendar === 'M'
            ? item.age >= this.profile.age - this.searchProfile.age_pref_to
            : item.age <= this.profile.age + this.searchProfile.age_pref_to))
      );

      // Add more fields as needed
    });
    this.tableData = filteredResult;
  }

  clearFilters() {
    this.searchProfile = {
      caste_sect: '',
      subsect: '',
      gothram: '',
      star: '',
      star_paadam: '',
      rasi: '',
      age_pref_from: 0,
      age_pref_to: 0,
      height_pref_from: '',
      height_pref_to: '',
      salary_preference: 0,
      job_location: '',
    };
    this.tableData = this.matchedList;
  }

  home() {
    this.backToHome.emit();
  }

  shortListProfile(shortListParam: any) {
    if (shortListParam.shortList) {
      const params = {
        src_profile_source: this.profile.profile_source,
        src_profile_code: this.profile.profile_code,
        tgt_profile_source: shortListParam.profile_source,
        tgt_profile_code: shortListParam.profile_code,
        status: shortListParam.shortList ? 'S' : null,
      };
      this.homeService.shortListProfile(params).subscribe((res) => {
        this.matchprofilesSearch();
      });
    } else {
      this.removeShortListProfile(shortListParam);
    }
  }

  removeShortListProfile(shortListParam: any) {
    const params = {
      src_profile_code: this.profile.profile_code,
      tgt_profile_code: shortListParam.profile_code,
    };
    this.homeService.removeShortListProfile(params).subscribe((res) => {
      this.matchprofilesSearch();
    });
  }
}
