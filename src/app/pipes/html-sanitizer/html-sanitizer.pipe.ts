import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'htmlSanitizer' })
export class HtmlSanitizerPipe implements PipeTransform {
      constructor(private sanitizer: DomSanitizer) { }

      public transform(v: string): SafeHtml {
            return this.sanitizer.bypassSecurityTrustHtml(v);
      }
}
