// Build an inline SVG dataURL for use as the MetallicPaint mask.
// MetallicPaint's processImage treats near-white pixels (R,G,B > 250) as
// background and anything else as the shape, so we render BLACK text on a
// WHITE background.
export function buildNameMaskDataURL(text, { width = 1200, height = 360, fontSize = 240 } = {}) {
  // Use a generic CSS font stack; the browser's renderer picks whatever
  // Chinese-capable font is available, then rasterizes the SVG to pixels
  // before processImage runs.
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="50%" y="50%"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="'PingFang SC','Microsoft YaHei','SimHei','Hiragino Sans GB',sans-serif"
        font-weight="900"
        font-size="${fontSize}"
        fill="#000000"
        letter-spacing="20">${text}</text>
</svg>`.trim()
  // Use base64 to avoid any URL-encoding edge cases with Chinese characters
  const b64 = typeof window !== 'undefined' && typeof window.btoa === 'function'
    ? window.btoa(unescape(encodeURIComponent(svg)))
    : Buffer.from(svg, 'utf-8').toString('base64')
  return `data:image/svg+xml;base64,${b64}`
}
