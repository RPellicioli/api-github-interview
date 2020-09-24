import { Component, OnInit, Input, Type } from '@angular/core';
import { GlobalService } from 'app/services/global.service';

@Component({
    selector: 'list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
    @Input() public type: ListItemsComponent.Type;
    @Input() public items: any[] = [];

    public types = ListItemsComponent.Type;

    constructor(
        public globalService: GlobalService
    ) { }

    public ngOnInit(): void {

    }
}

export namespace ListItemsComponent {
    export enum Type {
        User,
        Repository
    }
}