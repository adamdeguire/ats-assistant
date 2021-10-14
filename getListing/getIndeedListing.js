// Indeed
chrome.runtime.sendMessage({
  action: 'getSource',
  source: [
      ...document.querySelector('[title="Selected Job Details"]')
        .contentDocument.getElementById('jobDescriptionText')
        .querySelector('div').children].reduce((res, cur) => {
    const text = cur.innerText
    if (text) res.push(`<p>${text}</p>`)
    return res
  }, []).join('')
})