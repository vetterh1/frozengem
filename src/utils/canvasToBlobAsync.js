export default function canvasToBlobAsync(canvas, quality = 0.7) {
    return new Promise((resolve) => {

      canvas.toBlob( (blob) => {
        resolve(blob);
      }, 'image/jpeg', quality);
    })
  }