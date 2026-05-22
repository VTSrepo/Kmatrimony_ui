import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../shared/models/profile';
import { HomeService } from '../home/home.service';
import { AuthService } from '../shared/services/auth.service';
import { RefType, CommonService } from '../shared/services/common.service';
import { UtilityService } from '../shared/services/utility.service';

export interface PublicSearchProfile {
  caste_sect: string;
  subsect: string;
  star_paadam: string;
  gothram: string;
  star: string;
  rasi: string;
  age_pref_from: 0;
  age_pref_to: 0;
  annual_income: 0;
  job_location: string;
  gendar: string;
}

@Component({
  selector: 'app-public-search',
  templateUrl: './public-search.component.html',
  styleUrls: ['./public-search.component.scss'],
})
export class PublicSearchComponent {
  @Input() profile!: Profile;
  @Output() backToHome = new EventEmitter();

  myProfiles = [];
  isAdmin: boolean = false;
  searchProfile!: PublicSearchProfile;
  gothramList = [] as RefType[];
  sectList = [] as RefType[];
  subsectList = [] as RefType[];
  rasiList = [] as RefType[];
  starList = [] as RefType[];
  starPadamList = ['', 1, 2, 3, 4];
  gendarList = ['Boys', 'Girls'];

  matchedList: Profile[] = [];

  filteredLocations!: string[];

  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private commonService: CommonService,
    private us: UtilityService
  ) {}

  ngOnInit(): void {
    // this.homeService.profilesBySubscriberId().subscribe((res) => {
    //   this.myProfiles = res;
    // });
    this.authService.isAdmin$.subscribe((isAdmin) => {
      if (isAdmin) {
        this.isAdmin = isAdmin;
      } else {
        this.isAdmin = this.authService.validateAdmin();
      }
    });

    this.searchProfile = {
      caste_sect: '',
      subsect: '',
      star_paadam: '',
      gothram: '',
      star: '',
      rasi: '',
      age_pref_from:0,
      age_pref_to: 0,
      annual_income: 0,
      job_location: '',      
      gendar: this.gendarList[0],
    };

    this.commonService.getReferenceData('Gothram').subscribe((gothramList) => {
      this.gothramList = gothramList;
      console.log(this.gothramList)
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
    // this.matchprofilesSearch();
  }

  matchprofilesSearch() {
    const params = {
      gendar: this.profile.gendar,
      age: this.us.getAge(this.profile.dob),
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

  tableData: any[] = [];

  search() {
    const param = {
      //annual_income: this.searchProfile.annual_income,
      gothram: this.searchProfile.gothram,
      star: this.searchProfile.star,      
      rasi: this.searchProfile.rasi, 
      subsect: this.searchProfile.subsect,
      caste_sect: this.searchProfile.caste_sect,
      gendar: this.searchProfile.gendar === "Boys" ? 'M' : 'F',
    };
   this.homeService
      .publicSearch(param)
      .subscribe((res) => {
        this.tableData = res;
      });
  }

  clearFilters() {
    this.subsectList = [];
    this.searchProfile = {
      caste_sect: '',
      subsect: '',
      gothram: '',
      star: '',
      star_paadam: '',
      rasi: '',      
      age_pref_from: 0,
      age_pref_to: 0,      
      job_location: '',
      annual_income:0,
      gendar: this.gendarList[0],
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
