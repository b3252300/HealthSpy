import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    name: 'app/custom-rules',
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-useless-constructor': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',  // 允許使用 console，僅作為警告
      'vue/no-unused-vars': 'off',  // 關閉 Vue 中的未使用變數檢查
      'no-empty': 'off',  // 允許空的區塊語句
      'vue/require-v-for-key': 'off',  // 關閉 vue/require-v-for-key 警告
      'vue/no-ref-as-operand': 'off',
    },
  },
]
