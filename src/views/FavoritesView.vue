<template>
  <main>
    <h1 class="text-2xl font-bold mb-4">Favorites</h1>
    <RecipeList :recipes="store.favoriteRecipes"></RecipeList>
  </main>
</template>
<script setup lang="ts">
import RecipeList from '@/components/RecipeList.vue';
import { useRecipeStore } from '@/stores/reciepe';

const store = useRecipeStore();
</script>
