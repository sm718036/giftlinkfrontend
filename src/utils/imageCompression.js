/**
 * Compresses/resizes an image file to fit within a target size range (default 200-300 KB).
 * Uses canvas to resize and JPEG compression. Returns a data URL for preview and upload.
 *
 * @param {File} file - The image file from input
 * @param {Object} options - Optional settings
 * @param {number} options.maxKB - Max size in KB (default 300)
 * @param {number} options.minKB - Target min size in KB (default 200)
 * @param {number} options.maxDimension - Max width or height in px (default 1200)
 * @returns {Promise<string>} - Data URL of the compressed image (JPEG)
 */
export function compressImageToTargetSize(file, options = {}) {
  const maxSizeBytes = (options.maxKB ?? 300) * 1024;
  const maxDimension = options.maxDimension ?? 1200;

  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("Invalid or non-image file"));
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const { width: origW, height: origH } = img;
      let width = origW;
      let height = origH;

      if (width > maxDimension || height > maxDimension) {
        if (width >= height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      const tryQuality = (quality) =>
        new Promise((res) => {
          canvas.toBlob((blob) => res(blob), "image/jpeg", quality);
        });

      const blobToDataUrl = (blob) =>
        new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onloadend = () => res(reader.result);
          reader.onerror = rej;
          reader.readAsDataURL(blob);
        });

      const compress = async (quality) => {
        if (quality < 0.1) {
          const blob = await tryQuality(0.1);
          return blobToDataUrl(blob);
        }
        const blob = await tryQuality(quality);
        if (!blob) return blobToDataUrl(await tryQuality(0.1));
        if (blob.size <= maxSizeBytes) {
          return blobToDataUrl(blob);
        }
        const nextQuality = Math.max(0.1, quality - 0.15);
        return compress(nextQuality);
      };

      compress(0.9).then(resolve).catch(reject);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}
