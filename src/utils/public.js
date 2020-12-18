//滚动到
export function scrollTo(name) {
  // 当前窗口正中心位置到指定dom位置的距离
  let height =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  //指定dom到页面顶端的距离
  let dom = document.getElementsByClassName(name)[0]
  let domHeight = dom.offsetTop
  //滚动距离计算
  var S = Number(height) - Number(domHeight)

  //判断上滚还是下滚
  if (S < 0) {
    //下滚
    S = Math.abs(S)
    window.scrollBy({ top: S, behavior: 'smooth' })
  } else if (S == 0) {
    //不滚
    window.scrollBy({ top: 0, behavior: 'smooth' })
  } else {
    //上滚
    S = -S
    window.scrollBy({ top: S, behavior: 'smooth' })
  }
}
