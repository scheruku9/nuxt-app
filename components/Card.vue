<template>
  <div class="card">
    <img class="card__image" :src="product.thumbnailImageUrl" />
    <div class="card__name">{{ product.name }}</div>
    <button class="card__more-info-link" @click="openModal">More info</button>
    <!--Teleport option in Vue3 would be a better choice, but nuxt does not support vue3 yet-->
    <ProductModal
      v-if="displayModal"
      :product="product"
      @closeModal="closeModal"
    ></ProductModal>
  </div>
</template>
<script>
import ProductModal from './ProductModal';

export default {
  name: 'Card',
  data() {
    return {
      displayModal: false
    };
  },
  props: {
    product: Object
  },
  components: {
    ProductModal
  },
  methods: {
    openModal() {
      this.displayModal = true;
    },
    closeModal() {
      this.displayModal = false;
    }
  }
};
</script>
<style>
.card {
  height: 300px;
  width: 300px;
  padding: 10px;
  margin: 10px;
}

.card__name {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.card__image {
  height: 150px;
  max-width: 100%;
  border-radius: 10px;
}

.card__more-info-link {
  width: fit-content;
  border: none;
  padding: 5px 15px;
  border-radius: 10px;
}
</style>
