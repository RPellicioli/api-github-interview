import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CultureService } from 'app/services/culture.service';
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
        public router: Router,
        private cultureService: CultureService
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

    public langIsActive = (language: string): boolean => ((this.translateService.currentLang === language) || (!this.translateService.currentLang && language === 'pt-BR'));

    public setLanguage(language: 'pt-BR' | 'en-US' | 'es-PY'): void {
        this.cultureService.setCurrentCulture(language);
    }

}
