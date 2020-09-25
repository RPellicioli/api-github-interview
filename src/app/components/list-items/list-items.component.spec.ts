import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalService } from 'app/services/global.service';
import { ListItemsComponent } from './list-items.component';
import { ListItemsModule } from './list-items.module';

describe('ListItemsComponent', () => {
    let component: ListItemsComponent;
    let fixture: ComponentFixture<ListItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ListItemsModule,
                TranslateModule.forRoot()
            ],
            providers: [
                GlobalService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});