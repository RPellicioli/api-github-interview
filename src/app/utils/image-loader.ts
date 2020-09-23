export namespace ImageLoader {
    export function load(file: string | Blob, img?: HTMLImageElement): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const isBlob = file instanceof Blob;

            const loadImage = (_url: string, _img?: HTMLImageElement) => {
                if (img) {
                    img.onload = null;
                    img.onerror = null;
                    img.src = '';
                }
                else {
                    img = new Image();
                }

                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    isBlob && URL.revokeObjectURL(img.src);

                    resolve(img);
                };
                img.onerror = (e) => {
                    reject(e);
                };

                img.src = _url;
            };

            if (isBlob) {
                if ((file as Blob).type.match('image.*')) {
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            loadImage(evt.target.result as string, img);
                        }
                    }
                    reader.readAsDataURL(file as Blob);
                }
            } else {
                loadImage(file as string, img);
            }
        });
    }

    export function loadWithCorrectOrientation(file: string | Blob, blobResponse: boolean = false): Promise<HTMLImageElement | Blob> {
        return new Promise<HTMLImageElement | Blob>(async (resolve, reject) => {
            const orientation: number = await ImageLoader.getOrientation(file as Blob);
            let image = await ImageLoader.load(file);

            if (orientation > 4) {
                image = await ImageLoader.resetImageOrientation(image, orientation);
            }

            if (blobResponse) {
                const canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;

                const ctx = canvas.getContext("2d");

                setTimeout(() => {
                    ctx.drawImage(image, 0, 0);

                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg');
                }, 10, clearTimeout);
            } else {
                resolve(image);
            }
        });
    }

    export function resetImageOrientation(image: HTMLImageElement, orientation: number): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>(async (resolve, reject) => {
            const width = image.width;
            const height = image.height;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext("2d");

            if (orientation > 4) {
                canvas.width = height;
                canvas.height = width;
            } else {
                canvas.width = width;
                canvas.height = height;
            }

            switch (orientation) {
                case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
                case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
                case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
                case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
                case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
                case 7: ctx.transform(0, -1, -1, 0, height, width); break;
                case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
                default: break;
            }

            setTimeout(async () => {
                ctx.drawImage(image, 0, 0);

                const newImage = await ImageLoader.load(canvas.toDataURL(), image);
                resolve(newImage);
            }, 10, clearTimeout);
        });
    }

    export function getOrientation(file: Blob): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event: ProgressEvent<FileReader>) {
                const view = new DataView(event.target.result as ArrayBuffer);
                if (view.getUint16(0, false) != 0xFFD8) {
                    resolve(-2);
                    return;
                }

                let length = view.byteLength;
                let offset = 2;
                while (offset < length) {
                    const marker = view.getUint16(offset, false);
                    offset += 2;

                    if (marker == 0xFFE1) {
                        if (view.getUint32(offset += 2, false) != 0x45786966) {
                            resolve(-1);
                            return;
                        }

                        const little = view.getUint16(offset += 6, false) == 0x4949;
                        offset += view.getUint32(offset + 4, little);

                        const tags = view.getUint16(offset, little);
                        offset += 2;

                        for (let i = 0; i < tags; i++) {
                            if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                                resolve(view.getUint16(offset + (i * 12) + 8, little));
                                return;
                            }
                        }
                    } else if ((marker & 0xFF00) != 0xFF00) {
                        break;
                    } else {
                        offset += view.getUint16(offset, false);
                    }
                }

                resolve(-1);
                return;
            };

            reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
        });
    }
}