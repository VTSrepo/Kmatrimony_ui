import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ProfileService } from '../profile.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from 'src/app/shared/info-dialog/info-dialog.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonService, RefType } from 'src/app/shared/services/common.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss'],
})
export class ProfileCreateComponent implements OnInit {
  profile: any = {
    profile_source: '',
    profile_name: '',
    gendar: '',
    profile_type: '',
    dob: '',
    age: 0,
    caste_sect: '',
    subsect: '',
    add_subsect: '',
    gothram: '',
    star_paadam: '',
    rasi: '',
    birth_time: '',
    birth_place: '',
    education: '',
    occupation: '',
    annual_income: 0,
    job_location: '',
    job_country: '',
    height: '',
    weight: '',
    father_detail: '',
    mother_detail: '',
    sibling_detail: '',
    contact_relation: '',
    primary_contact: 0,
    secondary_contact: 0,
    email_id: '',
    brief_detail: '',
    expectation: '',
    other_info: ' ',
    agree_inform_marriage: 'Y',
    agree_inform_exit: 'Y',
    self_declaration: 'Y',
    star: '',
    age_pref_from: 0,
    age_pref_to: 0,
    height_pref_from: '',
    height_pref_to: '',
    marriage_status: '',
    profile_for: '',
    created_by: JSON.parse(localStorage.getItem('user') || '{}').subscriber_id,
    updated_by: JSON.parse(localStorage.getItem('user') || '{}').subscriber_id,
    salary_currency: '',
    father_name: '',
    mother_name: '',
    mother_tongue: '',
    citizenship: '',
    subscriber_id: '',
    subscription_end_date: new Date(),
  };

  gender = [
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female',
    },
    {
      value: 'O',
      label: 'Other',
    },
  ];
  type = [
    {
      value: 'Indian',
      label: 'Indian',
    },
    {
      value: 'NRI',
      label: 'NRI',
    },
  ];

  caste = [
    {
      value: 'IYER',
      label: 'IYER',
    },
    {
      value: 'IYENGAR',
      label: 'IYENGAR',
    },
  ];

  subcaste = [
    {
      value: 'VADAMA',
      label: 'VADAMA',
    },
    {
      value: 'VATHIMA',
      label: 'VATHIMA',
    },
  ];
  profileFor = [] as RefType[];
  gothramList = [] as RefType[];
  sectList = [] as RefType[];
  subsectList = [] as RefType[];
  rasiList = [] as RefType[];
  starList = [] as RefType[];
  starPadamList = ['', 1, 2, 3, 4];

  marriageStatus = [
    {
      value: 'Re-Marriage',
      label: 'Re-Marriage',
    },
    {
      value: 'UnMarried',
      label: 'UnMarried',
    },
  ];

  subscriberIdList = [
    { subscriber_id: '' },
    { subscriber_name: '' },
    { subscription_upto: new Date() },
  ];

  currencies = [
    { label: 'AED', symbol: '\u062f.\u0625;', value: 'UAE dirham' },
    { label: 'AFN', symbol: 'Afs', value: 'Afghan afghani' },
    { label: 'ALL', symbol: 'L', value: 'Albanian lek' },
    { label: 'AMD', symbol: 'AMD', value: 'Armenian dram' },
    { label: 'ANG', symbol: 'NA\u0192', value: 'Netherlands Antillean gulden' },
    { label: 'AOA', symbol: 'Kz', value: 'Angolan kwanza' },
    { label: 'ARS', symbol: '$', value: 'Argentine peso' },
    { label: 'AUD', symbol: '$', value: 'Australian dollar' },
    { label: 'AWG', symbol: '\u0192', value: 'Aruban florin' },
    { label: 'AZN', symbol: 'AZN', value: 'Azerbaijani manat' },
    {
      label: 'BAM',
      symbol: 'KM',
      value: 'Bosnia and Herzegovina konvertibilna marka',
    },
    { label: 'BBD', symbol: 'Bds$', value: 'Barbadian dollar' },
    { label: 'BDT', symbol: '\u09f3', value: 'Bangladeshi taka' },
    { label: 'BGN', symbol: 'BGN', value: 'Bulgarian lev' },
    { label: 'BHD', symbol: '.\u062f.\u0628', value: 'Bahraini dinar' },
    { label: 'BIF', symbol: 'FBu', value: 'Burundi franc' },
    { label: 'BMD', symbol: 'BD$', value: 'Bermudian dollar' },
    { label: 'BND', symbol: 'B$', value: 'Brunei dollar' },
    { label: 'BOB', symbol: 'Bs.', value: 'Bolivian boliviano' },
    { label: 'BRL', symbol: 'R$', value: 'Brazilian real' },
    { label: 'BSD', symbol: 'B$', value: 'Bahamian dollar' },
    { label: 'BTN', symbol: 'Nu.', value: 'Bhutanese ngultrum' },
    { label: 'BWP', symbol: 'P', value: 'Botswana pula' },
    { label: 'BYR', symbol: 'Br', value: 'Belarusian ruble' },
    { label: 'BZD', symbol: 'BZ$', value: 'Belize dollar' },
    { label: 'CAD', symbol: '$', value: 'Canadian dollar' },
    { label: 'CDF', symbol: 'F', value: 'Congolese franc' },
    { label: 'CHF', symbol: 'Fr.', value: 'Swiss franc' },
    { label: 'CLP', symbol: '$', value: 'Chilean peso' },
    { label: 'CNY', symbol: '\u00a5', value: 'Chinese/Yuan renminbi' },
    { label: 'COP', symbol: 'Col$', value: 'Colombian peso' },
    { label: 'CRC', symbol: '\u20a1', value: 'Costa Rican colon' },
    { label: 'CUC', symbol: '$', value: 'Cuban peso' },
    { label: 'CVE', symbol: 'Esc', value: 'Cape Verdean escudo' },
    { label: 'CZK', symbol: 'K\u010d', value: 'Czech koruna' },
    { label: 'DJF', symbol: 'Fdj', value: 'Djiboutian franc' },
    { label: 'DKK', symbol: 'Kr', value: 'Danish krone' },
    { label: 'DOP', symbol: 'RD$', value: 'Dominican peso' },
    { label: 'DZD', symbol: '\u062f.\u062c', value: 'Algerian dinar' },
    { label: 'EEK', symbol: 'KR', value: 'Estonian kroon' },
    { label: 'EGP', symbol: '\u00a3', value: 'Egyptian pound' },
    { label: 'ERN', symbol: 'Nfa', value: 'Eritrean nakfa' },
    { label: 'ETB', symbol: 'Br', value: 'Ethiopian birr' },
    { label: 'EUR', symbol: '\u20ac', value: 'European Euro' },
    { label: 'FJD', symbol: 'FJ$', value: 'Fijian dollar' },
    { label: 'FKP', symbol: '\u00a3', value: 'Falkland Islands pound' },
    { label: 'GBP', symbol: '\u00a3', value: 'British pound' },
    { label: 'GEL', symbol: 'GEL', value: 'Georgian lari' },
    { label: 'GHS', symbol: 'GH\u20b5', value: 'Ghanaian cedi' },
    { label: 'GIP', symbol: '\u00a3', value: 'Gibraltar pound' },
    { label: 'GMD', symbol: 'D', value: 'Gambian dalasi' },
    { label: 'GNF', symbol: 'FG', value: 'Guinean franc' },
    { label: 'GQE', symbol: 'CFA', value: 'Central African CFA franc' },
    { label: 'GTQ', symbol: 'Q', value: 'Guatemalan quetzal' },
    { label: 'GYD', symbol: 'GY$', value: 'Guyanese dollar' },
    { label: 'HKD', symbol: 'HK$', value: 'Hong Kong dollar' },
    { label: 'HNL', symbol: 'L', value: 'Honduran lempira' },
    { label: 'HRK', symbol: 'kn', value: 'Croatian kuna' },
    { label: 'HTG', symbol: 'G', value: 'Haitian gourde' },
    { label: 'HUF', symbol: 'Ft', value: 'Hungarian forint' },
    { label: 'IDR', symbol: 'Rp', value: 'Indonesian rupiah' },
    { label: 'ILS', symbol: '\u20aa', value: 'Israeli new sheqel' },
    { label: 'INR', symbol: '\u20B9', value: 'Indian rupee' },
    { label: 'IQD', symbol: '\u062f.\u0639', value: 'Iraqi dinar' },
    { label: 'IRR', symbol: 'IRR', value: 'Iranian rial' },
    { label: 'ISK', symbol: 'kr', value: 'Icelandic kr\u00f3na' },
    { label: 'JMD', symbol: 'J$', value: 'Jamaican dollar' },
    { label: 'JOD', symbol: 'JOD', value: 'Jordanian dinar' },
    { label: 'JPY', symbol: '\u00a5', value: 'Japanese yen' },
    { label: 'KES', symbol: 'KSh', value: 'Kenyan shilling' },
    { label: 'KGS', symbol: '\u0441\u043e\u043c', value: 'Kyrgyzstani som' },
    { label: 'KHR', symbol: '\u17db', value: 'Cambodian riel' },
    { label: 'KMF', symbol: 'KMF', value: 'Comorian franc' },
    { label: 'KPW', symbol: 'W', value: 'North Korean won' },
    { label: 'KRW', symbol: 'W', value: 'South Korean won' },
    { label: 'KWD', symbol: 'KWD', value: 'Kuwaiti dinar' },
    { label: 'KYD', symbol: 'KY$', value: 'Cayman Islands dollar' },
    { label: 'KZT', symbol: 'T', value: 'Kazakhstani tenge' },
    { label: 'LAK', symbol: 'KN', value: 'Lao kip' },
    { label: 'LBP', symbol: '\u00a3', value: 'Lebanese lira' },
    { label: 'LKR', symbol: 'Rs', value: 'Sri Lankan rupee' },
    { label: 'LRD', symbol: 'L$', value: 'Liberian dollar' },
    { label: 'LSL', symbol: 'M', value: 'Lesotho loti' },
    { label: 'LTL', symbol: 'Lt', value: 'Lithuanian litas' },
    { label: 'LVL', symbol: 'Ls', value: 'Latvian lats' },
    { label: 'LYD', symbol: 'LD', value: 'Libyan dinar' },
    { label: 'MAD', symbol: 'MAD', value: 'Moroccan dirham' },
    { label: 'MDL', symbol: 'MDL', value: 'Moldovan leu' },
    { label: 'MGA', symbol: 'FMG', value: 'Malagasy ariary' },
    { label: 'MKD', symbol: 'MKD', value: 'Macedonian denar' },
    { label: 'MMK', symbol: 'K', value: 'Myanma kyat' },
    { label: 'MNT', symbol: '\u20ae', value: 'Mongolian tugrik' },
    { label: 'MOP', symbol: 'P', value: 'Macanese pataca' },
    { label: 'MRO', symbol: 'UM', value: 'Mauritanian ouguiya' },
    { label: 'MUR', symbol: 'Rs', value: 'Mauritian rupee' },
    { label: 'MVR', symbol: 'Rf', value: 'Maldivian rufiyaa' },
    { label: 'MWK', symbol: 'MK', value: 'Malawian kwacha' },
    { label: 'MXN', symbol: '$', value: 'Mexican peso' },
    { label: 'MYR', symbol: 'RM', value: 'Malaysian ringgit' },
    { label: 'MZM', symbol: 'MTn', value: 'Mozambican metical' },
    { label: 'NAD', symbol: 'N$', value: 'Namibian dollar' },
    { label: 'NGN', symbol: '\u20a6', value: 'Nigerian naira' },
    { label: 'NIO', symbol: 'C$', value: 'Nicaraguan c\u00f3rdoba' },
    { label: 'NOK', symbol: 'kr', value: 'Norwegian krone' },
    { label: 'NPR', symbol: 'NRs', value: 'Nepalese rupee' },
    { label: 'NZD', symbol: 'NZ$', value: 'New Zealand dollar' },
    { label: 'OMR', symbol: 'OMR', value: 'Omani rial' },
    { label: 'PAB', symbol: 'B./', value: 'Panamanian balboa' },
    { label: 'PEN', symbol: 'S/.', value: 'Peruvian nuevo sol' },
    { label: 'PGK', symbol: 'K', value: 'Papua New Guinean kina' },
    { label: 'PHP', symbol: '\u20b1', value: 'Philippine peso' },
    { label: 'PKR', symbol: 'Rs.', value: 'Pakistani rupee' },
    { label: 'PLN', symbol: 'z\u0142', value: 'Polish zloty' },
    { label: 'PYG', symbol: '\u20b2', value: 'Paraguayan guarani' },
    { label: 'QAR', symbol: 'QR', value: 'Qatari riyal' },
    { label: 'RON', symbol: 'L', value: 'Romanian leu' },
    { label: 'RSD', symbol: 'din.', value: 'Serbian dinar' },
    { label: 'RUB', symbol: 'R', value: 'Russian ruble' },
    { label: 'SAR', symbol: 'SR', value: 'Saudi riyal' },
    { label: 'SBD', symbol: 'SI$', value: 'Solomon Islands dollar' },
    { label: 'SCR', symbol: 'SR', value: 'Seychellois rupee' },
    { label: 'SDG', symbol: 'SDG', value: 'Sudanese pound' },
    { label: 'SEK', symbol: 'kr', value: 'Swedish krona' },
    { label: 'SGD', symbol: 'S$', value: 'Singapore dollar' },
    { label: 'SHP', symbol: '\u00a3', value: 'Saint Helena pound' },
    { label: 'SLL', symbol: 'Le', value: 'Sierra Leonean leone' },
    { label: 'SOS', symbol: 'Sh.', value: 'Somali shilling' },
    { label: 'SRD', symbol: '$', value: 'Surinamese dollar' },
    { label: 'SYP', symbol: 'LS', value: 'Syrian pound' },
    { label: 'SZL', symbol: 'E', value: 'Swazi lilangeni' },
    { label: 'THB', symbol: '\u0e3f', value: 'Thai baht' },
    { label: 'TJS', symbol: 'TJS', value: 'Tajikistani somoni' },
    { label: 'TMT', symbol: 'm', value: 'Turkmen manat' },
    { label: 'TND', symbol: 'DT', value: 'Tunisian dinar' },
    { label: 'TRY', symbol: 'TRY', value: 'Turkish new lira' },
    { label: 'TTD', symbol: 'TT$', value: 'Trinidad and Tobago dollar' },
    { label: 'TWD', symbol: 'NT$', value: 'New Taiwan dollar' },
    { label: 'TZS', symbol: 'TZS', value: 'Tanzanian shilling' },
    { label: 'UAH', symbol: 'UAH', value: 'Ukrainian hryvnia' },
    { label: 'UGX', symbol: 'USh', value: 'Ugandan shilling' },
    { label: 'USD', symbol: 'US$', value: 'United States dollar' },
    { label: 'UYU', symbol: '$U', value: 'Uruguayan peso' },
    { label: 'UZS', symbol: 'UZS', value: 'Uzbekistani som' },
    { label: 'VEB', symbol: 'Bs', value: 'Venezuelan bolivar' },
    { label: 'VND', symbol: '\u20ab', value: 'Vietnamese dong' },
    { label: 'VUV', symbol: 'VT', value: 'Vanuatu vatu' },
    { label: 'WST', symbol: 'WS$', value: 'Samoan tala' },
    { label: 'XAF', symbol: 'CFA', value: 'Central African CFA franc' },
    { label: 'XCD', symbol: 'EC$', value: 'East Caribbean dollar' },
    { label: 'XDR', symbol: 'SDR', value: 'Special Drawing Rights' },
    { label: 'XOF', symbol: 'CFA', value: 'West African CFA franc' },
    { label: 'XPF', symbol: 'F', value: 'CFP franc' },
    { label: 'YER', symbol: 'YER', value: 'Yemeni rial' },
    { label: 'ZAR', symbol: 'R', value: 'South African rand' },
    { label: 'ZMK', symbol: 'ZK', value: 'Zambian kwacha' },
    { label: 'ZWR', symbol: 'Z$', value: 'Zimbabwean dollar' },
  ];

  previousUrl = '';
  currentUrl = '';

  isAdmin: boolean = false;
  routeToSearchMatch = false;
  isEditable: boolean = true;

  constructor(
    private utility: UtilityService,
    private profileService: ProfileService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.routeToSearchMatch =
      this.route.snapshot.queryParamMap.get('match') === 'true';
  }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      if (isAdmin) {
        this.isAdmin = isAdmin;
      } else {
        this.isAdmin = this.authService.validateAdmin();
      }
    });

    this.commonService.getReferenceData('Pfor').subscribe((pfor) => {
      this.profileFor = pfor;
    });
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
    this.profile.created_by = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).OrgId;
    this.profile.updated_by = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).OrgId;
    this.profile.profile_source = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).OrgId;
    this.profile.agree_inform_exit = 'Y';
    this.profile.agree_inform_marriage = 'Y';
    this.profile.self_declaration = 'Y';

    if (history.state && history.state.profile_code) {
      this.profile = history.state;
      this.profile.dob = this.utility.convertTodayTostr(this.profile.dob);
      this.profile.age = this.utility.getAge(this.profile.dob);
      this.changeSect(this.profile.caste_sect);

      //enable/disable form
      const loggedinSubcriber = JSON.parse(
        localStorage.getItem('user') || '{}'
      ).subscriber_id;
      this.isEditable =
        this.profile.subscriber_id === loggedinSubcriber ? true : false;
    } else {
      this.profile.marriage_status = 'UnMarried';
      this.profile.mother_tongue = 'Tamil';
      this.profile.citizenship = 'Indian';
      this.profile.salary_currency = 'INR';
      this.profile.caste_sect = 'Iyer';
      this.changeSect('Iyer');
    }

    this.commonService.getSubscriberIds().subscribe((response) => {
      this.subscriberIdList = response.data;
      if (!this.profile.subscriber_id) {
        this.profile.subscriber_id = this.subscriberIdList[0].subscriber_id;
        this.profile.subscription_end_date =
          this.subscriberIdList[0].subscription_upto;
      }
    });
  }

  setAge(dob: string) {
    this.profile.age = this.utility.getAge(dob);
  }

  setSubscriberDetails(subscriber: any) {
    const sub = this.subscriberIdList.find(
      (item) => item.subscriber_id === subscriber
    );
    this.profile.subscription_end_date = sub?.subscription_upto;
  }

  changeSect(sect: string) {
    this.commonService.getReferenceData(sect).subscribe((subsect) => {
      this.subsectList = subsect;
    });
  }

  save() {
    this.profile.profile_source = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).subscriber_source;
    this.profile.created_by = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).subscriber_id;
    this.profile.updated_by = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).subscriber_id;
    this.checkForEmpty();
    if (this.profile.primary_contact === '') {
      this.profile.primary_contact = null;
    }
    this.profileService.saveProfile(this.profile).subscribe((data) => {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '500px',
        data: 'Profile Saved',
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (this.isAdmin) {
          this.router.navigate(['/profiles/home']);
        } else {
          this.router.navigate(['/home']);
        }
      });
    });
  }

  goBack() {
    if (this.authService.previousUrl.includes('profiles')) {
      this.router.navigate(['/profiles/home']);
    } else if (
      this.authService.previousUrl.includes('home') &&
      this.routeToSearchMatch
    ) {
      this.router.navigate(['/home'], {state: {retainSearch:true}});
    } else {
      this.router.navigate(['/home']);
    }
  }

  checkForEmpty() {
    for (let key in this.profile) {
      if (this.profile[key] === '') {
        this.profile[key] = null;
      }
    }
  }
}
