<template>
  <div class="list">
    <div class="cards">
      <Card
        v-for="product in products"
        :key="product.id"
        :product="product"
      ></Card>
    </div>
    <div ref="endOfContent"></div>
    <Loader v-if="fetchingMoreProducts"></Loader>
  </div>
</template>

<script>
import { processProductList } from '../utils/processProductList';
import { getProductsList } from '../dao/nuts/getProductsList';

import Card from '../components/Card.vue';
import Loader from '../components/Loader.vue';

export default {
  name: 'List',
  components: {
    Card,
    Loader
  },
  data() {
    return {
      observer: null,
      fetchingMoreProducts: false,
      modalContent: null,
    };
  },
  async asyncData() {
    const offset = 0;
    const limit = 10;
    const productsList = await getProductsList(offset, limit);
    const processedProductList = processProductList(productsList.results);
    return {
      limit,
      fetchedCount: productsList.count,
      total: productsList.total,
      products: processedProductList
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      threshold: 0
    });
    this.observer.observe(this.$refs.endOfContent);
  },
  methods: {
    onElementObserved(entries) {
      entries.forEach(async context => {
        if (this.fetchedCount >= this.total) {
          this.observer.unobserve(this.$refs.endOfContent);
          this.observer.disconnect();
        }
        if (context.isIntersecting && !this.fetchingMoreProducts) {
          await this.getMoreProducts();
        }
      });
    },
    async getMoreProducts() {
      this.fetchingMoreProducts = true;

      const productsList = await getProductsList(this.fetchedCount, this.limit);
      const processedProductList = processProductList(productsList.results);
      this.fetchedCount = this.fetchedCount + productsList.count;
      this.products.push(...processedProductList);

      this.fetchingMoreProducts = false;
    }
  }
};
</script>
<style>
.list {
  width: 100%;
}

.cards {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
}
</style>
