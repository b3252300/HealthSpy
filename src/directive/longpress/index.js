//長按手勢
const longpress = {
  // 指令綁定元素時觸發
  beforeMount: function (el, binding, vNode) {
    // 檢查傳入的值是否為函數，若不是則拋出錯誤
    if (typeof binding.value !== 'function') {
      throw 'callback must be a function'
    }
    
    // 定義變數儲存計時器
    let pressTimer = null
    
    // 建立計時器，按住 2 秒後執行綁定的函數
    const start = e => {
      // 若是滑鼠點擊事件，且按鈕不是左鍵，則忽略
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      // 如果計時器為空，設置計時器 2 秒後執行 handler 函數
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler()
        }, 1000)
      }
    }
    
    // 取消計時器
    const cancel = e => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    
    // 定義執行的函數，調用綁定的回調函數
    const handler = e => {
      binding.value(e)
    }
    
    // 綁定事件監聽器，監聽 mousedown（滑鼠按下）與 touchstart（觸控開始）
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    
    // 綁定取消計時器的事件，監聽 click、mouseout、touchend、touchcancel
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  
  // 當傳入的值更新時觸發，更新綁定的值
  updated(el, { value }) {
    el.$value = value
  },
  
  // 當指令與元素解綁時，移除事件監聽器
  unmounted(el) {
    el.removeEventListener('click', el.handler)
  }
}

export default longpress
