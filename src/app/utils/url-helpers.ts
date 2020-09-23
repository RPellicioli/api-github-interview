import { ActivatedRouteSnapshot } from "@angular/router";

export class UrlHelper {
    static combine(...args: string[]): string {
        return args.map((s, i) => {
            s = s.trim();
            
            while (i > 0 && s.startsWith('/')) {
                s = s.substring(1);
            }

            while (i < args.length - 1 && s.endsWith('/')) {
                s = s.substring(0, s.length - 1);
            }

            return s;
        })
        .filter(s => s && s.length > 0)
        .join('/');
    }

    static getParameter(routeSnapshot: ActivatedRouteSnapshot, parameter: string, defaultValue?: string) : string {
        for (let key of routeSnapshot.queryParamMap.keys) {
            if (key.toLowerCase() == parameter.toLowerCase()) {
                return routeSnapshot.queryParamMap.get(key);
            }
        }

        return defaultValue;
    }
}