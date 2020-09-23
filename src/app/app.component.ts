import { Component } from '@angular/core';
import { NavigationError, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CultureService } from './services/culture.service';
import { TranslationLoaderService } from './services/translation-loader.service';
import { locale as localePtBr } from './i18n/pt-BR';
import { locale as localeEnUs } from './i18n/en-US';
import { locale as localeEsPy } from './i18n/es-PY';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        public translationLoaderService: TranslationLoaderService,
        public translateService: TranslateService,
        public cultureService: CultureService,
        public globalService: GlobalService,
        public router: Router
    ) {
        translateService.setDefaultLang('pt-BR');
        translateService.use(cultureService.currentCulture);
        translationLoaderService.loadTranslations(localePtBr, localeEnUs, localeEsPy);

        cultureService.onCultureChanged.subscribe((lang) => {
              translateService.use(lang);
        });

        router.events.subscribe((event: RouterEvent) => {
              if (event instanceof NavigationError) {
                    const err = "" + event.error;

                    if (err.indexOf("Unexpected token '<'") > -1 ||
                          err.indexOf("Error: Loading chunk") > -1) {

                          console.log("Aerror - " + err + " -- " + event.url);
                                
                          window.location.href = window.location.origin + event.url;
                    }
              }
        });
      }
}