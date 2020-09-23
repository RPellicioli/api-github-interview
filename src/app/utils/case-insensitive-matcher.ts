import { UrlSegment, Route, UrlSegmentGroup, UrlMatchResult } from "@angular/router";

export namespace CaseInsensitiveMatcher {
    export function matcher(segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route): UrlMatchResult {
        const matcherPath = (route as any).matcherPath;

        let urls: string[];
        if (matcherPath instanceof Array) {
            urls = matcherPath;
        }
        else {
            urls = [matcherPath];
        }

        for (let x = 0; x < urls.length; x++) {
            const url = urls[x];

            if (url) {
                const matchSegments = url.split('/');
                if (matchSegments.length > segments.length || (matchSegments.length !== segments.length && route.pathMatch === 'full')) {
                    continue;
                }

                const consumed: UrlSegment[] = [];
                const posParams: { [name: string]: UrlSegment } = {};
                for (let index = 0; index < segments.length; ++index) {
                    const matchSegment = matchSegments[index];
                    if (matchSegment) {
                        if (matchSegment.startsWith(':')) {
                            posParams[matchSegment.slice(1)] = segments[index];
                            consumed.push(segments[index]);
                        }
                        else if (segments[index].toString().toLowerCase() === matchSegment.toLowerCase()) {
                            consumed.push(segments[index]);
                        }
                        else {
                            break;
                        }
                    }
                    else {
                        break;
                    }
                }

                if (consumed.length == 0) {
                    continue;
                }

                return { consumed, posParams };
            }
        }

        return null;
    }
}