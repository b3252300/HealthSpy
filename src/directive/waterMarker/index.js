// 增加浮水印功能
function addWaterMarker(str, parentNode, font = '16px Microsoft JhengHei', textColor = 'rgba(180, 180, 180, 0.3)') {
  // 建立一個 canvas 元素
  const can = document.createElement('canvas');
  // 將 canvas 元素加入指定的父節點
  parentNode.appendChild(can);
  // 設定 canvas 的寬度和高度
  can.width = 200;
  can.height = 150;
  // 隱藏 canvas 元素
  can.style.display = 'none';

  // 取得 canvas 的 2D context
  const ctx = can.getContext('2d');
  // 旋轉文字 ( -20 度 )
  ctx.rotate(-20 * Math.PI / 180);

  // 設定文字樣式
  ctx.font = font;
  // 設定文字填色
  ctx.fillStyle = textColor;
  // 設定文字對齊方式
  ctx.textAlign = 'left';
  // 設定文字基線 (垂直居中)
  ctx.textBaseline = 'Middle';

  // 繪製文字
  ctx.fillText(str, can.width / 10, can.height / 2);

  // 設定父節點的背景圖片為 canvas 的資料 URL ( 轉成 PNG 格式 )
  parentNode.style.backgroundImage = `url(${can.toDataURL('image/png')})`;
}

const waterMarker = {
  // 在元素掛載之前執行
  beforeMount(el, binding) {
    const { text, font, textColor } = binding.value;
    // 加入浮水印 ( 文字內容、父節點、字體、文字顏色 )
    addWaterMarker(text, el, font, textColor);
  }
}

export default waterMarker;