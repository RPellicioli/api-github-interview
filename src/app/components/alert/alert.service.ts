import { ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Injectable } from "@angular/core";
import { AlertComponent } from "./alert.component";

@Injectable()
export class AlertService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {
    }

    public show(parameters: string | AlertComponent.Parameters): Promise<number> {
        return new Promise<number>(resolve => {
            if (typeof parameters === 'string') {
                parameters = {
                    description: parameters
                } as AlertComponent.Parameters;
            }
            else if (!parameters) {
                parameters = {
                    description: ""
                } as AlertComponent.Parameters;
            }

            const componentRef = this.componentFactoryResolver
                .resolveComponentFactory<AlertComponent>(AlertComponent)
                .create(this.injector);
    
            this.appRef.attachView(componentRef.hostView);
    
            const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
                .rootNodes[0] as HTMLElement;
    
            if (!parameters.parentElement) {
                parameters.parentElement = AlertService.fullscreenElement || document.body;
            }

            parameters.parentElement.appendChild(domElem);

            componentRef.instance.onClosed.subscribe(index => {
                resolve(index);

                this.appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });

            componentRef.instance.show(parameters as AlertComponent.Parameters);
        });
    }

    public confirm(parameters: string | AlertComponent.Parameters): Promise<boolean> {
        return new Promise<boolean>(resolve => {

            if (typeof parameters === 'string') {
                parameters = {
                    title: 'Hey!',
                    description: parameters
                } as AlertComponent.Parameters;
            }

            (parameters as AlertComponent.Parameters).buttons = ["Sim", "Não"];
            this.show(parameters).then(index => resolve(index == 0));
        });
    }

    private static get fullscreenElement(): Element {
        const doc = document as any;

        return doc.fullscreenElement || /* Standard syntax */
            doc.webkitFullscreenElement || /* Chrome, Safari and Opera syntax */
            doc.mozFullScreenElement ||/* Firefox syntax */
            doc.msFullscreenElement; /* IE/Edge syntax */
    }
}