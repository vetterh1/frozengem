import exif from 'exif-js';

export default function getExifTagsAsync(img) {
  if(!img) console.error('! getExifTagsAsync called with null img !');
  return new Promise(resolve => {
    exif.getData(img, function () {
      const tags = exif.getAllTags(this);
      // console.log('getExifTagsAsync tags: ', tags);
      resolve(tags);
    });
  })
}
