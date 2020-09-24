import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'app/services/global.service';

@Component({
    selector: 'list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
    @Input() public items: any[] = [];

    constructor(
        public globalService: GlobalService
    ) { }

    public ngOnInit(): void {

    }
}