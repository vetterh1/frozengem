export default function createImageAsync(content) {
    return new Promise((resolve, reject) => {

      let img = new Image();

      img.onload = function () {
        // console.log("createImageAsync.onload: ", img)
        resolve(img); 
      };

      img.onerror = reject;
  
      img.src = content;
    })
  }