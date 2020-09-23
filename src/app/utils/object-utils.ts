export namespace ObjectUtils {
    export function evalObject<T>(obj: any, context: any, canEval?: (key: string, path?: string) => boolean): T {
        return evalObjectExt<T>(obj, context, '', canEval);
    }

    function evalObjectExt<T>(obj: any, context: any, path: string, canEval: (key: string, path?: string) => boolean): T {
        const retObj = {};

        Object.keys(obj).forEach(k => {
            if (!canEval || canEval(k, `${path.length > 0 ? `${path}.` : ''}${k}`)) {
                retObj[k] = evalValue(obj[k], context, `${path ? `${path}.` : ''}${k}`, canEval);
            }
            else {
                retObj[k] = obj[k];
            }
        });

        return retObj as T;
    }

    function evalValue(val: any, context: any, path: string, canEval: (key: string, path?: string) => boolean): any {
        const $context = context; // Necessary to eval the strings like '$context.x'

        if (val == null || val == undefined) {
            return val;
        }

        if (typeof val === "string") {
            try {
                return eval(val);
            }
            catch {
                return val;
            }
        }
        else if (val instanceof Array) {
            return val.map(v => evalValue(v, $context, path, canEval));
        }
        else if (typeof val === "object") {
            return evalObjectExt(val, $context, path, canEval);
        }
        
        return val;
    }
}