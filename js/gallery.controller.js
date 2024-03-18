'use strict'

function rederGaller() {
    const elGallery = document.querySelector('.gallery')
    const elImg = elGallery.querySelector('.select-img-container')

    const strHtml = `
    <img src="images/3.jpg" onclick="onSelectImg(this)" />
    <img src="images/4.jpg" onclick="onSelectImg(this)" />
    `
    elImg.innerHTML = strHtml

}

