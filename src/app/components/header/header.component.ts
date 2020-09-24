import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'app/services/global.service';
import { SearchService } from 'app/services/search.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public placeholder: string;

    constructor(
        public globalService: GlobalService,
        public translateService: TranslateService,
        public searchService: SearchService,
        public router: Router
    ) { }

    public ngOnInit(): void {
        this.placeholder = this.translateService.instant('Header.Search');
    }

    public onChangeDarkMode(): void {
        this.globalService.darkMode = !this.globalService.darkMode;
    }

    public callSearch(): void {
		this.router.navigate([this.translateService.instant('URLs.Results.Url')], { queryParams: { q: this.searchService.query } });
    }
}
