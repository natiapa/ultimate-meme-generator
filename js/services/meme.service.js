'use strict'
const IMAGES_STORAGE_KEY = 'myApp_images'

var gImgs = []
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'hello',
        size: '12',
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
    gMeme.lines[0].txt = text
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    console.log('gMeme.selectedImgId', gMeme.selectedImgId)
}

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)

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

function _createImg(url ='') {
    return {
        id: makeId(),
        url,
        keywords: [],
    }
}

function _saveImg() {
    saveToStorage(IMAGES_STORAGE_KEY, gImgs)
}



