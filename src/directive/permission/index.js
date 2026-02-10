import { usePermissionStore } from '@/store'

const permission = {
  // 權限指令掛載時
  mounted(el, binding) {
    // 獲取權限存儲
    const permissionStore = usePermissionStore()
    // 獲取綁定值
    const { value } = binding

    // 獲取權限數據
    const roleData = permissionStore.directivePermission

    // 如果綁定值是一個數組
    if (value && value instanceof Array) {
      // 如果綁定值數組不為空
      if (value.length > 0) {
        // 提取權限角色
        const permissionRoles = value

        // 檢查是否有權限
        const hasPermission = roleData.some(role => {
          return permissionRoles.includes(role)
        })

        // 如果沒有權限，則移除元素
        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    } else {
      // 如果綁定值不是數組，則拋出錯誤
      throw new Error(`權限指令錯誤，可參考 v-permission="['admin','editor']"`)
    }
  }
}

export default permission
