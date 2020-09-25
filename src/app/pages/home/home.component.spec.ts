import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { GlobalService } from 'app/services/global.service';
import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let translateService: TranslateService;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HomeModule,
                TranslateModule.forRoot()
            ],
            providers: [
                GlobalService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
        translateService = TestBed.get(TranslateService);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render title in a h1 tag', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h1").textContent).toContain(translateService.instant('Home.Title'));
    }));

    it('should render description page in a .description tag', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector(".decription").textContent).toContain(translateService.instant('Home.Description'));
    }));
});
