chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    const wordsArr = request.source.split(/[^0-9A-Za-z]/).filter(word => word)
    const wordsSet = [...new Set(wordsArr)]
    message.innerHTML = wordsSet.map(el => {
      return `<p>${el}</p>`
    }).join('')
  }
})

function scanListing() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    const url = tabs[0].url
    const fileSelect = url.includes('indeed')
    ? 'getIndeedListing.js'
    : url.includes('linkedin')
      ? 'getLinkedInListing.js'
      : url.includes('builtin')
        ? 'getBuiltInListing.js'
        : url.includes('glassdoor')
          ? 'getGlassdoorListing.js'
          : null

    const message = document.querySelector('#message')
    chrome.tabs.executeScript(null, {
      file: `getListing/${fileSelect}`
    }, function() {
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error identifying a job listing : \n' + chrome.runtime.lastError.message
      }
    })
  })
}

function showResumeUpload() {
  $('#resumeUpload, #uploadResumeButton').show()
}

function uploadResume() {
  const PDFExtract = require('pdf.js-extract').PDFExtract
  const pdfExtract = new PDFExtract()
  const options = {}
  pdfExtract.extract('test.pdf', options, (err, data) => {
  if (err) return chrome.extension.getBackgroundPage().console.log(err)
  chrome.extension.getBackgroundPage().console.log(data)
})
}

window.onload = () => {
  document.getElementById('scanListing').addEventListener('click', scanListing)
  document.getElementById('importResume').addEventListener('click', showResumeUpload)
  document.getElementById('uploadResumeButton').addEventListener('click', uploadResume)
  $('#resumeUpload, #uploadResumeButton').hide()
}