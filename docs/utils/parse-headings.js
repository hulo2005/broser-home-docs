// utils/parse-headings.js
export const extractHeadings = (html) => {
    const template = document.createElement('template')
    template.innerHTML = html
    const headings = [...template.content.querySelectorAll('h1, h2, h3, h4, h5, h6')]
    
    return headings.map(heading => ({
      title: heading.textContent,
      level: parseInt(heading.tagName.substring(1)),
      link: `#${heading.id}`
    }))
  }