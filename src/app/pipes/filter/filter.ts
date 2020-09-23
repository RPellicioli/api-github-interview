import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    public transform(items: any[], filter: any): any {
        return (items ? items.filter(i => filter(i)) : items);
    }
}

@NgModule({
    exports: [
        FilterPipe
    ],
    declarations: [
        FilterPipe
    ]
})
export class FilterPipeModule { }