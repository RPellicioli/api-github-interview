import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingModule } from './loading.module';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LoadingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});