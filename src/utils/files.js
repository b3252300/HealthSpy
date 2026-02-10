// base64 字串轉為 Blob 物件
export const base64ToBlob = base64 => {
  // 將 base64 字串以逗號分隔成陣列
  const arr = base64.split( ',' )
  const typeItem = arr[0]
  // 從第一部分取得檔案的 MIME 類型
  const mime = typeItem.match( /:(.*?);/ )[1]
  // 將 base64 字串轉為二進制字串
  const bstr = atob( arr[1] )
  let n = bstr.length
  // 建立一個新的 Uint8Array 並存放二進制數據
  const u8arr = new Uint8Array( n )
  while ( n-- ) {
    u8arr[n] = bstr.charCodeAt( n )
  }
  // 建立 Blob 物件，並設定其 MIME 類型
  const blob = new Blob( [u8arr], {
    type : mime
  } )
  return blob
}

// 透過 URL 取得圖片並轉換為 base64 字串
export function urlToBase64( url, mineType ) {
  return new Promise( ( resolve, reject ) => {
    let canvas = document.createElement( 'CANVAS' )
    const ctx = canvas.getContext( '2d' )

    const img = new Image()
    // 設定跨域標誌，以確保圖片能正確載入
    img.crossOrigin = ''
    img.onload = function() {
      if ( !canvas || !ctx ) {
        return reject( new Error( '失敗' ) )
      }
      // 設定 canvas 的大小與圖片一致
      canvas.height = img.height
      canvas.width = img.width
      // 將圖片繪製到 canvas 上
      ctx.drawImage( img, 0, 0 )
      // 將 canvas 的內容轉換為 base64 字串
      const dataURL = canvas.toDataURL( mineType || 'image/png' )
      canvas = null
      resolve( dataURL )
    }
    // 設定圖片的來源 URL
    img.src = url
  } )
}

// 將 Blob 物件轉換為 File 檔案
export async function blobToFile( Blobs = [], fileName = 'test.zip', fileType = 'application/zip' ) {
  return new File( Blobs, fileName, {
    type : fileType
  } )
}

// 將 base64 字串轉換為 File 檔案
export function base64ToFile( url, fileName ) {
  const arr = url.split( ',' )
  // 從 base64 字串中提取 MIME 類型
  const mime = arr[0].match( /:(.*?);/ )[1]
  // 將 base64 字串解碼為二進制字串
  const bstr = atob( arr[1] )
  let n = bstr.length
  // 建立 Uint8Array 存放二進制數據
  const u8arr = new Uint8Array( n )
  while ( n-- ) {
    u8arr[n] = bstr.charCodeAt( n )
  }
  // 建立 File 物件，並設定其 MIME 類型與檔案名稱
  return new File( [u8arr], fileName, {
    type : mime
  } )
}

// 下載文件流數據
export function downloadByData( data, filename, mime, bom ) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  // 建立 Blob 物件，指定 MIME 類型
  const blob = new Blob( blobData, { type : mime || 'application/octet-stream' } )

  // 建立 URL 對應 Blob 並生成下載鏈結
  const blobURL = window.URL.createObjectURL( blob )
  const downloadElement = document.createElement( 'a' )
  downloadElement.style.display = 'none'
  downloadElement.href = blobURL
  // 設定下載檔案的名稱
  downloadElement.setAttribute( 'download', filename )
  if ( typeof downloadElement.download === 'undefined' ) {
    downloadElement.setAttribute( 'target', '_blank' )
  }
  document.body.appendChild( downloadElement )
  // 自動點擊鏈結以下載文件
  downloadElement.click()
  document.body.removeChild( downloadElement )
  // 釋放 URL 物件
  window.URL.revokeObjectURL( blobURL )
}

// 透過 URL 下載檔案
export function downloadByOnlineUrl( url, filename, mime, bom ) {
  // 先將 URL 轉換為 base64 格式後下載
  urlToBase64( url ).then( base64 => {
    downloadByBase64( base64, filename, mime, bom )
  } )
}

// 透過 base64 字串下載檔案
export function downloadByBase64( buf, filename, mime, bom ) {
  // 先將 base64 字串轉為 Blob，再進行下載
  const base64Buf = base64ToBlob( buf )
  downloadByData( base64Buf, filename, mime, bom )
}
