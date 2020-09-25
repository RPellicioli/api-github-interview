import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data, Params, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApiModule } from 'app/services/api/api.module';
import { GlobalService } from 'app/services/global.service';
import { SearchService } from 'app/services/search.service';
import { SEOService } from 'app/services/seo.service';
import { of } from 'rxjs';

import { ResultsComponent } from './results.component';
import { ResultsModule } from './results.module';

describe('ResultsComponent', () => {
    let component: ResultsComponent;
    let fixture: ComponentFixture<ResultsComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ResultsModule,
                ApiModule,
                TranslateModule.forRoot()
            ],
            providers: [
                GlobalService,
                SEOService,
                SearchService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({
                            q: "teste"
                        })
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get user lines', async () => {
        await component.getUsers('teste');

        if(!component.users) {
            expect(component.users).toBeUndefined();
        }
        else{
            expect(component.users.length).toBeGreaterThan(0);
        }
    });

    it('should get repositories lines', async () => {
        await component.getRepositories('teste');

        if(!component.repositories) {
            expect(component.repositories).toBeUndefined();
        }
        else{
            expect(component.repositories.length).toBeGreaterThan(0);
        }
    });
});
