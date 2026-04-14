// components/category-nav/category-nav.js
Component({
  properties: {
    categories: {
      type: Array,
      value: []
    },
    activeId: {
      type: String,
      value: 'all'
    }
  },

  methods: {
    onCategoryTap(e) {
      const id = e.currentTarget.dataset.id;
      if (id !== this.data.activeId) {
        this.triggerEvent('change', { id });
      }
    }
  }
});