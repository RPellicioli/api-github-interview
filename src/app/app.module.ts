import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, Route } from '@angular/router';
import { DirectivesModule } from './directives/directives.module';
import { ApiModule } from './services/api/api.module';
import { WindowScrollService } from './services/window-scroll.service';
import { GlobalService } from './services/global.service';
import { SEOService } from './services/seo.service';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { GlobalErrorHandler } from './services/global-error-handler';
import "app/extensions/number.extensions";
import "app/extensions/date.extensions";
import { HeaderModule } from './components/header/header.module';
import { MenuModule } from './components/menu/menu.module';
import { TranslateModule } from '@ngx-translate/core';
import { locale as localePtBr } from './i18n/pt-BR';
import { locale as localeEnUs } from './i18n/en-US';
import { locale as localeEsPy } from './i18n/es-PY';
import { TranslationLoaderService } from './services/translation-loader.service';
import { CultureService } from './services/culture.service';
import { CaseInsensitiveMatcher } from './utils/case-insensitive-matcher';
import { SearchService } from './services/search.service';

const ptBrUrls = localePtBr.data.URLs,
    esPyUrls = localeEsPy.data.URLs,
    enUsUrls = localeEnUs.data.URLs;

const MY_DATE_FORMATS: MatDateFormats = {
    parse: {
      dateInput: 'DD/MM/YYYY'
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    }
};

registerLocaleData(localePt, 'pt');

export const commonRoutes: Routes = [
    <Route>{
        matcher: CaseInsensitiveMatcher.matcher,
        matcherPath: [ptBrUrls.Results.Url, esPyUrls.Results.Url, enUsUrls.Results.Url],
        loadChildren: () => import('./pages/results/results.module').then(m => m.ResultsModule)
    },
    <Route>{
        matcher: CaseInsensitiveMatcher.matcher,
        matcherPath: [ptBrUrls.User.Url, esPyUrls.User.Url, enUsUrls.User.Url],
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
    },
    { path: '**', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }
];

export function appInitializer(seoService: SEOService, globalService: GlobalService) {
    return () => {
        seoService.setTitle("Api Github Interview");
        seoService.setUrl(window.location.origin);
        seoService.setFavicon("");
        seoService.setImage("")
        seoService.setDescription("Teste desenvolvido em AngularJs Versão 10");

        return new Promise<void>(async (resolve) => {
            await globalService.init();

            resolve();
        });
    }
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        DirectivesModule,
        ApiModule,
        HeaderModule,
        MenuModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot(commonRoutes)
    ],
    providers: [
        WindowScrollService,
        GlobalService,
        SEOService,
        SearchService,
        TranslationLoaderService,
        CultureService,
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        { provide: LOCALE_ID, useValue: "pt" },
        { provide: APP_INITIALIZER, useFactory: appInitializer, deps: [SEOService, GlobalService], multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
