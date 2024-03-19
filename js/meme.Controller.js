'use strict'
let gElCanvas
let gCtx
let gTextInput
let gImgUrl


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gTextInput = document.querySelector('.text-container input[name="text"]').value

    resizeCanvas()
    renderMeme()
    rederGallery()

    window.addEventListener('resize', () => resizeCanvas())
}

function renderMeme() {
    const meme = getMeme()

    const img = new Image()
    img.src = gImgUrl  || 'images/2.jpg'

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
        drawText(meme.lines[0].txt, gElCanvas.width / 2, 50)
    }
}

function drawText(text, x, y) {
    console.log('text', text)

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'orange'

    gCtx.fillStyle = 'lightsteelblue'

    gCtx.font = '45px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onSetLineTxt(elTxt) {
    const text = elTxt
    console.log('text', text)
    setLineTxt(text)
    renderMeme()
}

function resizeCanvas() {
    const elEditor = document.querySelector('.editor')
    const elContainer = elEditor.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
}

