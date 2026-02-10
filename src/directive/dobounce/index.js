const Dobounce = {
  // Vue.js 的自定義指令，當元素被創建時執行
  created : function( el, binding ) {
    let timer
    // 為元素添加點擊事件監聽
    el.addEventListener( 'click', () => {
      // 如果計時器已存在，則清除前一次的計時器
      if ( timer ) {
        clearTimeout( timer )
      }
      // 設置新的計時器，延遲 1000 毫秒後執行
      timer = setTimeout( () => {
        // 調用指令傳遞的回調函數
        binding.value()
      }, 1000 )
    } )
  }
}

export default Dobounce
