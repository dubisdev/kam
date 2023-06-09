import { writeBinaryFile } from "@tauri-apps/api/fs";
import { pictureDir } from "@tauri-apps/api/path";

export async function takePhoto($videoDisplayer: HTMLVideoElement) {
    $videoDisplayer.pause();

    const $canvas = document.createElement("canvas");
    $canvas.width = $videoDisplayer.videoWidth;
    $canvas.height = $videoDisplayer.videoHeight;

    // rotate image
    $canvas.getContext("2d")?.translate($canvas.width, 0);
    $canvas.getContext("2d")?.scale(-1, 1);

    // capture image
    $canvas.getContext("2d")?.drawImage($videoDisplayer, 0, 0, $canvas.width, $canvas.height);

    const pictureDire = await pictureDir();

    // create filename from date

    const filename = "kam-" + new Date().toISOString().replace(/:/g, "-") + ".png";


    $canvas.toBlob(async (blob) => {
        writeBinaryFile(`${pictureDire + filename}`, await blob?.arrayBuffer() as ArrayBuffer);
    });

    // delete created elements
    $canvas.remove();

    $videoDisplayer.play();

}
