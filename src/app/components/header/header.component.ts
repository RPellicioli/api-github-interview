import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'app/services/global.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public placeholder: string;

    constructor(
        public globalService: GlobalService,
        public translateService: TranslateService
    ) { }

    public ngOnInit(): void {
        this.placeholder = this.translateService.instant('Header.Search');
    }

    public onChangeDarkMode(): void {
        this.globalService.darkMode = !this.globalService.darkMode;
    }
}
