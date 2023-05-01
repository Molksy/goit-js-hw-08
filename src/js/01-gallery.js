// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Change code below this line
const galleryRef = document.querySelector('.gallery');

galleryItems.map(({ preview, original, description }) => {
  const liEl = `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  galleryRef.innerHTML += liEl;
})

galleryRef.addEventListener('click', onClickImg);

function onClickImg(event) {
  event.preventDefault()
  if (event.target.nodeName !== 'IMG') {
    return
  }
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();
  galleryRef.addEventListener('keydown', onClickModalClose);
  
  function onClickModalClose(event) {
    if (event.code === "Escape") {
      instance.close()
    } 
  };
};
console.log(galleryItems);