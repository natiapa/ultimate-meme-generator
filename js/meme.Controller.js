'use strict'
let gElCanvas
let gCtx
let gImgUrl
let currentY = 25
let flag = false


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

        lines.forEach((line, idx) => {
            drawText(line.txt, line.color, line.size + 'px', gElCanvas.width / 4, currentY)
            
            if (idx === meme.selectedLineIdx && flag === true) {
                drawFrame(currentY, line.size, '+')
                flag = false
            }
            currentY += line.size + 50

        })
    }
}

// function renderLine() {
//     const meme = getMeme()
//     const { lines } = meme
//     currentY = 25
//     console.log('meme.selectedLineIdx', meme.selectedLineIdx)
//     lines.forEach((line, idx) => {

//         if (idx === meme.selectedLineIdx) {
//             drawFrame(currentY, line.size,'+')
//         }

//         currentY += line.size + 50
//     })
// }

function addListeners() {
    window.addEventListener('resize', () => resizeCanvas())
    document.querySelector('button[name="download-btn"]').addEventListener('click', onDownloadCanvas)
}

function resizeCanvas() {
    const elEditor = document.querySelector('.editor')
    const elContainer = elEditor.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
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
    setLineTxt(elTxt)
    renderMeme()
}

function onSwitchLine() {
    flag = true
    switchLine()
    renderMeme()
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

function drawFrame(y, size, sign) {
    if (sign === '+') {
        gCtx.strokeStyle = 'black'
    }
    gCtx.lineWidth = 2
    gCtx.strokeRect(10, y - size / 2, gElCanvas.width - 100, size + 10)
}

function onDownloadCanvas() {
    const link = document.createElement('a')
    link.href = gElCanvas.toDataURL('image/jpeg')

    link.download = 'canvas_image.jpg'
    link.click()
}
