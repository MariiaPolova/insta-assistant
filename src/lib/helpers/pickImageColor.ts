export function getAverageRGB(imgEl) {
    const blockSize = 5; // only visit every 5 pixels
    // TODO import from tailwind theme
    const defaultRGB = { r: 0, g: 0, b: 0 }; // for non-supporting envs

    if (!window?.document) {
        return defaultRGB;
    }

    const canvas = window?.document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    const rgb = { r: 0, g: 0, b: 0 };
    let data,
        i = -4,
        count = 0;

    if (!context || !imgEl) {
        return defaultRGB;
    }

    const height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    const width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        console.log(e);
        return defaultRGB;
    }

    const length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

}
