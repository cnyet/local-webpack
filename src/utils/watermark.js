/**
 * 给页面添加水印背景
 */
function setTargetNode (targetNode, imgUrl) {
  targetNode.style.position = 'fixed'
  targetNode.style.inset = 0
  targetNode.style.zIndex = 9999
  targetNode.style.opacity = 0.1
  targetNode.style.pointerEvents = 'none'
  targetNode.style.backgroundImage = `url(${imgUrl})`
}

export function addWatermark (text) {
  const targetNode = document.createElement('figure')
  const parentNode = document.body || document.documentElement.getElementsByTagName('body').item(0)
  const waterMarkText = text.slice(0, 15)
  const canvas = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200

  const canvasContext = canvas.getContext('2d')
  canvasContext.rotate(-40 * Math.PI / 180)
  canvasContext.font = '16px Microsoft YaHei'
  canvasContext.fillStyle = '#324157'
  canvasContext.textAlign = 'center'
  canvasContext.textBaseline = 'middle'
  canvasContext.fillText(waterMarkText, 10, 130)

  // 将canvas转化成base64格式
  const imgUrl = canvas.toDataURL('image/png')
  setTargetNode(targetNode, imgUrl)
  // 将水印元素添加到页面中
  parentNode.appendChild(targetNode)
  const observer = new MutationObserver(mutationList => {
    for (let mutation of mutationList) {
      // dom节点属性修改
      if (mutation.type === 'attributes') {
        setTargetNode(targetNode, imgUrl)
        break
      }
    }
  })
  // 观察目标节点属性的变化
  observer.observe(targetNode, { attributes: true, childList: true, subtree: true })
  const parentObserver = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
      // dom节点删除
      if (mutation.type === 'childList' && mutation.removedNodes.length && mutation.removedNodes[0].nodeName === 'FIGURE') {
        parentNode.appendChild(targetNode)
        console.log(mutation)
        break
      }
    }
  })
  // 观察body节点的子元素的改动
  parentObserver.observe(parentNode, { childList: true })

  document.addEventListener('beforeunload', () => {
    observer.disconnect()
    parentObserver.disconnect()
  })
}
