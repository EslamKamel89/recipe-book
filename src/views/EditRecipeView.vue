<template>
  <h1 class="text-2xl font-bold mb-4">Edit Recipe</h1>
  <form @submit.prevent="editRecipe">
    <div>
      <input
        type="text"
        v-model="name"
        required
        placeholder="Name"
        class="p-2 border rounded mb-4 w-full"
      />
    </div>
    <div>
      <textarea
        v-model="description"
        placeholder="Recipe Description"
        required
        class="p-2 border rounded mb-4 w-full"
      ></textarea>
    </div>
    <button type="submit">Edit</button>
  </form>
</template>
<script setup lang="ts">
import { useRecipeStore, type Recipe } from '@/stores/reciepe';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//!
const router = useRouter();
const route = useRoute();
const store = useRecipeStore();
//!
const name = ref('');
const description = ref('');
//!
let recipe: Recipe | undefined;
//!
const fetchRecipe = () => {
  const id = route.params.id as string;
  recipe = store.getRecipeById(id);
  if (recipe) {
    name.value = recipe.name;
    description.value = recipe.description;
  } else {
    router.push('not-found');
  }
};
//!
onMounted(fetchRecipe);
//!
const editRecipe = () => {
  const newRecipe = store.editRecipe({
    id: recipe!.id,
    name: name.value,
    description: description.value,
  });
  if (newRecipe)
    router.push({
      name: 'recipe',
      params: { id: newRecipe.id },
    });
};
</script>
