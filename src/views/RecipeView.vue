<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">{{ recipe?.name }}</h1>
    <p>{{ recipe?.description }}</p>
    <div class="flex gap-2 items-center mt-4">
      <div>
        <RouterLink
          :to="{ name: 'edit-recipe', params: { id: recipe?.id } }"
          class="hover:underline"
          >Edit</RouterLink
        >
      </div>
      <div>
        <button @click="recipeStore.toggleFavorite(route.params.id as string)">
          {{ isFavorite ? 'Remove From Favorites' : 'Add To Favorites' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRecipeStore } from '@/stores/reciepe';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
//! Composables
const route = useRoute();
const recipeStore = useRecipeStore();
//!
const recipe = computed(() => {
  return recipeStore.getRecipeById(route.params.id as string);
});
//!
const isFavorite = computed<boolean>(() => {
  return recipeStore.isFavorite(route.params.id as string);
});
</script>
