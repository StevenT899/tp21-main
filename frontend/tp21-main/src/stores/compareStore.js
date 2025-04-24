// stores/compareStore.js
import { defineStore } from 'pinia'

export const useCompareStore = defineStore('compare', {
  state: () => ({
    compareList: JSON.parse(sessionStorage.getItem('compareList') || '[]'),
  }),

  actions: {
    updateCompareList(newCompareList) {
      this.compareList = newCompareList
      sessionStorage.setItem('compareList', JSON.stringify(newCompareList))
    }
  },
})