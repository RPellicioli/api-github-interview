import { Pipe, PipeTransform } from "@angular/core";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@Pipe({
    name: "sort"
})
export class ArraySortPipe implements PipeTransform {
    public transform(array: any, field: string): any[] {
        if (!Array.isArray(array)) {
            return;
        }
        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}



@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ArraySortPipe
    ],
    declarations: [
        ArraySortPipe
    ]
})
export class ArraySortPipeModule { }