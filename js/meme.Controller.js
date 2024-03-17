'use strict'
let gElCanvas
let gCtx
let gCurrShape 

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
    renderMeme()
    resizeCanvas()
    drawImg()
    window.addEventListener('resize', () => resizeCanvas())
}

function renderMeme() {
  
    const elImg = document.querySelector('.select-img-container')

    const strHtmls =`
    <img src="images/2.jpg" onclick="onSelectImg(this)" />
    `
    elImg.innerHTML = strHtmls
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
}

function drawImg() {
    const elImg = new Image()
    elImg.src = 'images/2.jpg'

    elImg.onload = () =>
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
}

function onSetShape(shape) {
    gCurrShape = shape
}

function onSelectImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onDraw(ev) {
    const { offsetX, offsetY } = ev

    if (gCurrShape === 'text') {
        drawText('Hello', offsetX, offsetY)
    }
}

function drawText(text, x, y) {
	gCtx.lineWidth = 2
	gCtx.strokeStyle = 'orange'

	gCtx.fillStyle = 'lightsteelblue'

	gCtx.font = '45px Arial'
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'

	gCtx.fillText(text, x, y)
	gCtx.strokeText(text, x, y)
}