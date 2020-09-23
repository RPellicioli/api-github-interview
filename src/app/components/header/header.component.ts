import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/services/global.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        public globalService: GlobalService
    ) { }

    public ngOnInit(): void {
    }


    public onChangeDarkMode(): void {
        this.globalService.darkMode = !this.globalService.darkMode;
    }
}
