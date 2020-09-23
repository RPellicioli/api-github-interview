
export interface OffscreenCanvas {
    width: number;
    height: number;

    convertToBlob({
        type: string,
        quality: number
    });

    getContext(contextId: "2d", option?: { alpha: boolean }): OffscreenCanvasRenderingContext2D;
}

export interface OffscreenCanvasRenderingContext2D extends CanvasRenderingContext2D { }