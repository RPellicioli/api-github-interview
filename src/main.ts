import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment, Environment } from './environments/environment';
import { Versions } from 'environments/versions';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

const envFile = "env.json";

fetch(envFile)
  .then(async response => {
    const env = await response.json() as Environment;
    Object.assign(environment, env);
    
    if (env.production) {
      enableProdMode();
    }
    const vers = await (await fetch("versions.json")).json() as Versions;
    Object.assign(Versions, vers);

    try {
      await platformBrowserDynamic(providers).bootstrapModule(AppModule);
    }
    catch (err) {
      console.log(err);
    }
  });
export { renderModule, renderModuleFactory } from '@angular/platform-server';