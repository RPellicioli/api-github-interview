import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data, Params, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApiModule } from 'app/services/api/api.module';
import { GlobalService } from 'app/services/global.service';
import { SearchService } from 'app/services/search.service';

import { ResultsComponent } from './results.component';
import { ResultsModule } from './results.module';

describe('ResultsComponent', () => {
    let component: ResultsComponent;
    let fixture: ComponentFixture<ResultsComponent>;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ResultsModule,
                ApiModule,
                TranslateModule.forRoot()
            ],
            providers: [
                GlobalService,
                SearchService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: {
                            subscribe: (fn: (value: Params) => void) => fn({
                                q: "teste",
                            }),
                        }
                    }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
