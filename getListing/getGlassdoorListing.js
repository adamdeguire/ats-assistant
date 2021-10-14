// Glassdoor
chrome.runtime.sendMessage({
  action: 'getSource',
  source: [
      ...document.querySelector('.jobDescriptionContent')
        .querySelector('div').children].reduce((res, cur) => {
    const text = cur.innerText
    if (text) res.push(`<p>${text}</p>`)
    return res
  }, []).join('')
})