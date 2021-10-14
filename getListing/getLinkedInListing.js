// LinkedIn
chrome.runtime.sendMessage({
  action: 'getSource',
  source: [
      ...document.getElementById('job-details').children].reduce((res, cur) => {
    const text = cur.innerText
    if (text) res.push(`<p>${text}</p>`)
    return res
  }, []).join('')
})