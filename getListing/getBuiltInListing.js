// BuiltIn
chrome.runtime.sendMessage({
  action: 'getSource',
  source: [
      ...document.querySelector('.job-description').children].reduce((res, cur) => {
    const text = cur.innerText
    if (text) res.push(`<p>${text}</p>`)
    return res
  }, []).join('')
})