export namespace AWSUtils {
    export function clearUrlAuthentication(url: string): string {
        const urlObj = new URL(url);
        if (urlObj.origin.indexOf(".amazonaws.com") > -1) {
            return urlObj.origin + urlObj.pathname;
        }

        return url;
    }
}