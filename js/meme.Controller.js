'use strict'
let gElCanvas
let gCtx
let gTextInput
let gImgUrl
let currentY = 25

  // currentY += line.size + 10
function onInit() {
    const elEditor = document.querySelector('.editor')
    const elCanvasContainer = elEditor.querySelector('.canvas-container')
    gElCanvas = elCanvasContainer.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    renderMeme()
    rederGallery()
    resizeCanvas()
}

function renderMeme() {
    const meme = getMeme()
    const { lines } = meme

    const img = new Image()
    img.src = gImgUrl || 'images/2.jpg';

    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

        currentY = 25
        lines.forEach(line => {
            drawText(line.txt, line.color, line.size + 'px', gElCanvas.width / 4, currentY)
        
            currentY += line.size + 10
        })
    }
}

function addListeners() {
    window.addEventListener('resize', () => resizeCanvas())
    document.querySelector('button[name="download-btn"]').addEventListener('click', onDownloadCanvas)
}

function resizeCanvas() {
    const elEditor = document.querySelector('.editor')
    const elContainer = elEditor.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth

    // let tempCurrImg = gImgUrl
    // if(tempCurrImg) {
    //     coverCanvasWithImg(tempCurrImg)
    // }
}

function onSetLineTxt(elTxt) {
    const text = elTxt
    setLineTxt(text)
    renderMeme()
}

function onUpdateColor() {
    const elColor = document.getElementById('color').value
    updateColor(elColor)
    renderMeme()
}

function onChangeFontSize(sign) {
    changeFontSize(sign)
    renderMeme()
}
function onAddLine() {
    const elTxt = document.querySelector('.text-container input[name="text"]').value
    console.log('elTxt', elTxt)
    setLineTxt(elTxt)
    renderMeme()
}

function onDownloadCanvas() {
    const link = document.createElement('a')
    link.href = gElCanvas.toDataURL('image/jpeg')

    link.download = 'canvas_image.jpg'
    link.click()
}

function drawText(text, textColor, fontSize, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = textColor

    gCtx.fillStyle = textColor

    gCtx.font = `${fontSize} Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
