import './waves.css'; // 引入波紋效果的 CSS 檔

const context = '@@wavesContext'; // 上下文的命名空間

function handleClick(el, binding) {
  // 事件處理函式
  function handle(e) {
    // 合併自訂選項和預設選項
    const customOpts = Object.assign({}, binding.value);
    const opts = Object.assign(
      {
        ele: el, // 觸發波紋效果的元素
        type: 'hit', // 波紋擴散類型 ( 'hit': 點擊位置, 'center': 中心點 )
        color: 'rgba(0, 0, 0, 0.15)', // 波紋顏色
      },
      customOpts
    );

    const target = opts.ele;
    if (target) {
      // 設定觸發元素的样式 ( 相對定位、溢出隱藏 )
      target.style.position = 'relative';
      target.style.overflow = 'hidden';

      const rect = target.getBoundingClientRect(); // 取得元素的尺寸和位置資訊

      let ripple = target.querySelector('.waves-ripple'); // 查找元素內的波紋元素
      if (!ripple) {
        // 如果不存在波紋元素，則創建一個
        ripple = document.createElement('span');
        ripple.className = 'waves-ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
      } else {
        // 如果存在波紋元素，則重置其類別
        ripple.className = 'waves-ripple';
      }

      switch (opts.type) {
        case 'center':
          // 設定中心擴散的波紋位置
          ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px';
          ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px';
          break;
        default:
          // 設定點擊位置擴散的波紋位置 ( 考慮滾動條位置 )
          ripple.style.top =
            (e.pageY - rect.top - ripple.offsetHeight / 2 - (document.documentElement.scrollTop || document.body.scrollTop)) +
            'px';
          ripple.style.left =
            (e.pageX - rect.left - ripple.offsetWidth / 2 - (document.documentElement.scrollLeft || document.body.scrollLeft)) +
            'px';
      }

      // 設定波紋顏色和激活样式
      ripple.style.backgroundColor = opts.color;
      ripple.className = 'waves-ripple z-active';

      return false; // 阻止預設點擊事件
    }
  }

  // 儲存事件處理函式到元素的上下文屬性中
  if (!el[context]) {
    el[context] = {
      removeHandle: handle,
    };
  } else {
    el[context].removeHandle = handle;
  }

  return handle;
}

export default {
  beforeMount(el, binding) {
    // 在元素掛載之前綁定點擊事件
    el.addEventListener('click', handleClick(el, binding), false);
  },
  beforeUpdate(el, binding) {
    // 在元素更新之前移除舊的事件监听器，然後綁定新的
    el.removeEventListener('click', el[context].removeHandle, false);
    el.addEventListener('click', handleClick(el, binding), false);
  },
  unmounted(el) {
    // 在元素卸載之後移除事件监听器并清空上下文屬性
    el.removeEventListener('click', el[context].removeHandle, false);
    el[context] = null;
    delete el[context];
  }
}