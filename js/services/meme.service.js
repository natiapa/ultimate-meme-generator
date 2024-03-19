'use strict'
const IMAGES_STORAGE_KEY = 'myApp_images'

var gImgs = []
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 45,
        color: 'black',
    }]
}

_createImgs()

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function setLineTxt(text) {
    const newLine = _createLine(text)

    gMeme.lines.push(newLine)
  gMeme.selectedLineIdx++
}
// function  addLine(elTxt){
// const newLine = _createLine(elTxt)

//       gMeme.lines.push(newLine)
//     gMeme.selectedLineIdx++
// }

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    console.log('gMeme.selectedImgId', gMeme.selectedImgId)
}

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    return img
}

function updateColor(textColor) {

    gMeme.lines[0].color = textColor

}
function changeFontSize(sign) {
    if (sign === '+') {
        gMeme.lines[0].size++
    } else {
        gMeme.lines[0].size--
    }
}

function _createImgs() {
    gImgs = loadFromStorage(IMAGES_STORAGE_KEY)

    if (!gImgs) {
        gImgs = [
            _createImg('images/2.jpg'),
            _createImg('images/3.jpg'),
            _createImg('images/4.jpg'),
            _createImg('images/5.jpg'),
            _createImg('images/6.jpg'),
            _createImg('images/8.jpg'),
            _createImg('images/11.jpg'),
            _createImg('images/12.jpg'),
        ]
        _saveImg()
    }
}

function _createImg(url = '') {
    return {
        id: makeId(),
        url,
        keywords: [],
    }
}
function _createLine(txt) {
    return {
        txt,
        size: 45,
        color: 'black',
    }
}
function _saveImg() {
    saveToStorage(IMAGES_STORAGE_KEY, gImgs)
}



