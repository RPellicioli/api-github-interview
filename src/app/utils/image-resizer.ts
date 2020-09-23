import { ImageLoader } from "./image-loader";
import { OffscreenCanvas, OffscreenCanvasRenderingContext2D } from "../libs/offscreen-canvas/offscreen-canvas";
import * as EXIF from "exif-js";

export class ImageResizer {
    public canvas: HTMLCanvasElement;
    private offscreenCanvas: OffscreenCanvas;

    public async resize(image: string | HTMLImageElement | HTMLCanvasElement | Blob | ImageBitmap, width: number, height: number, parameters: ImageResizer.Parameters): Promise<string | Blob> {
        if (image instanceof Blob && window.createImageBitmap) {
            const img = await window.createImageBitmap(image)
            return await this.resizeImage(img, width, height, parameters);
        }

        if (image instanceof Blob || !(image instanceof HTMLImageElement || image instanceof HTMLCanvasElement || (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap))) {
            const img = await ImageLoader.load(image as string | Blob),
                result = await this.resizeImage(img, width, height, parameters);

            img.src = '';

            return result;
        }

        return await this.resizeImage(image, width, height, parameters);
    }

    private async resizeImage(image: HTMLImageElement | HTMLCanvasElement | ImageBitmap, width: number, height: number, parameters: ImageResizer.Parameters): Promise<string | Blob> {
        parameters = {
            mimeType: "image/jpeg",
            quality: .7,
            resultType: "base64",
            resizeMode: "auto",
            keepAspectRatio: true,
            ...parameters
        };

        if (!this.canvas) {
            this.canvas = document.createElement("canvas");

            if ((this.canvas as any).transferControlToOffscreen) {
                this.offscreenCanvas = (this.canvas as any).transferControlToOffscreen();
            }
        }

        this.resizeToCanvasContext(image, this.canvasContext, width, height, parameters);

        let ret: string | Blob;

        if (parameters.resultType == "base64") {
            if (this.offscreenCanvas) {
                const blob = await this.offscreenCanvas.convertToBlob({ type: parameters.mimeType, quality: parameters.quality });

                ret = await new Promise<string>(resolve => {
                    const fr = new FileReader();
                    fr.onload = () => {
                        resolve(fr.result as string);
                    }
                    fr.readAsDataURL(blob);
                });
            }
            else {
                ret = this.canvas.toDataURL(parameters.mimeType, parameters.quality);
            }
        }
        else if (parameters.resultType == "url") {
            if (this.offscreenCanvas) {
                ret = URL.createObjectURL(await this.offscreenCanvas.convertToBlob({ type: parameters.mimeType, quality: parameters.quality }));
            }
            else {
                ret = await new Promise<string>(resolve => this.canvas.toBlob(blob => resolve(URL.createObjectURL(blob)), parameters.mimeType, parameters.quality));
            }
        }
        else if (parameters.resultType == "blob") {
            if (this.offscreenCanvas) {
                ret = await this.offscreenCanvas.convertToBlob({ type: parameters.mimeType, quality: parameters.quality });
            }
            else {
                ret = await new Promise<Blob>(resolve => this.canvas.toBlob(blob => resolve(blob), parameters.mimeType, parameters.quality));
            }
        }

        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return ret;
    }

    private get canvasContext(): CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D {
        return (this.offscreenCanvas && this.offscreenCanvas.getContext("2d", { alpha: false })) ||
            (this.canvas && this.canvas.getContext("2d", { alpha: false }));
    }

    public async resizeToCanvasContext(
        image: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
        ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
        width: number,
        height: number,
        parameters: {
            keepAspectRatio?: boolean,
            resizeMode?: "cover" | "contain" | "auto"
        }): Promise<void> {

        parameters = {
            keepAspectRatio: true,
            resizeMode: "auto",
            ...parameters
        };

        if (parameters.keepAspectRatio) {
            let ratio = 1;

            if (width > 0 && height > 0) {
                ratio = Math.min(width / image.width, height / image.height);
            }
            else if (width > 0) {
                ratio = width / image.width;
            }
            else if (height > 0) {
                ratio = height / image.height;
            }

            width = Math.round(image.width * ratio);
            height = Math.round(image.height * ratio);
        }

        ctx.canvas.width = width;
        ctx.canvas.height = height;

        let w: number,
            h: number;

        if (parameters.resizeMode == "cover") {
            const heightDest = image.height * width / image.width;

            if (heightDest < height) {
                h = image.height;
                const widthDest = image.width * height / image.height;
                w = image.width * width / widthDest;
            }
            else {
                w = image.width;
                h = image.height * height / heightDest;
            }
        }
        else if (parameters.resizeMode == "contain") {
            const heightDest = image.height * width / image.width;

            if (heightDest > height) {
                h = image.height;
                const widthDest = image.width * height / image.height;
                w = image.width * width / widthDest;
            }
            else {
                w = image.width;
                h = image.height * height / heightDest;
            }
        }
        else {
            w = image.width;
            h = image.height;
        }

        const x = (image.width - w) / 2,
            y = (image.height - h) / 2;

        ctx.drawImage(
            image,
            x,
            y,
            w,
            h,
            0,
            0,
            ctx.canvas.width,
            ctx.canvas.height);
    }

    public getExifData(image: HTMLImageElement | File): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!image) {
                reject(null);
                return;
            }

            (EXIF as any).getData(image, () => {
                resolve(EXIF.getAllTags(image));
            });
        });
    }
}
export namespace ImageResizer {
    export interface Parameters {
        mimeType?: "image/jpeg" | "image/png";
        quality?: number;
        resultType?: "url" | "base64" | "blob";
        resizeMode?: "cover" | "contain" | "auto";
        keepAspectRatio?: boolean;
    }
}