<template>
  <div class="product-modal">
    <div class="product-modal__content">
      <img class="product-modal__image" :src="product.fullImageUrl" />
      <div class="product-modal__name">{{ product.name }}</div>
      <div class="product-modal__description">{{ product.description }}</div>
      <div class="product-modal__price">Price: {{ price }}</div>
      <img v-if="product.isOrganic" :src="'./organic-badge.jpg'" />
      <button class="product-modal__close-btn" @click="close">Close</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductModal',
  props: {
    product: Object
  },
  computed: {
    price() {
      return this.product.price === 'N/A' ? 'N/A' : `$${this.product.price}/lb`;
    }
  },
  methods: {
    close() {
      this.$emit('closeModal');
    }
  }
};
</script>
<style>
.product-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.product-modal__content {
  border-radius: 40px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 40px;
  position: relative;
}

.product-modal__image {
  border-radius: 10px;
  height: 300px;
  max-width: 100%;
}

.product-modal__name {
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;
}

.product-modal__description {
  font-size: 12px;
  margin-top: 5px;
}

.product-modal__price {
  font-size: 16px;
  margin-top: 10px;
  font-weight: bold;
}

.product-modal__close-btn {
  cursor: pointer;
  width: fit-content;
  border: none;
  margin-top: 25px;
  padding: 5px 15px;
  border-radius: 10px;
}
</style>
