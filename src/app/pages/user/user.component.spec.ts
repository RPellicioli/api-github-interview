import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalService } from 'app/services/global.service';
import { RouterTestingModule } from '@angular/router/testing';

import { UserComponent } from './user.component';
import { UserModule } from './user.module';
import { ApiModule } from 'app/services/api/api.module';
import { SEOService } from 'app/services/seo.service';

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                UserModule,
                RouterTestingModule,
                ApiModule,
                TranslateModule.forRoot()
            ],
            providers: [
                GlobalService,
                SEOService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: {
                            subscribe: (fn: (value: Params) => void) => fn({
                                userName: "RPellicioli",
                            }),
                        }
                    }
                }
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('html should user section', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        const el = compiled.querySelector(".user");

        expect(el).toBeTruthy();
    }));
});
