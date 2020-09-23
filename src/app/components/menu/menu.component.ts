import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'app/services/global.service';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    public galleryBuilderUrl: string;
    public navigations: MenuComponent.Nav[];
    
    constructor(
        public globalService: GlobalService,
        private translateService: TranslateService
    ) { 
        this.galleryBuilderUrl = this.translateService.instant('URLs.Repos.Url');

        this.navigations = [
            {
                icon: "wallpaper",
                title: this.translateService.instant('URLs.Repos.Description'),
                url: this.translateService.instant('URLs.Repos.Url'),
                active: true
            }
        ];
    }

    public ngOnInit(): void {
    }

}

export namespace MenuComponent {
    export interface Nav {
        icon: string,
        title: string,
        url: string,
        active: boolean
    }
}