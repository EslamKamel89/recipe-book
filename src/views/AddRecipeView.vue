<template>
  <h1 class="text-2xl font-bold mb-4">Add Recipe</h1>
  <form @submit.prevent="addRecipe">
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
    <button type="submit">Add</button>
  </form>
</template>
<script setup lang="ts">
import { useRecipeStore } from '@/stores/reciepe';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useRecipeStore();

const name = ref('');
const description = ref('');

const addRecipe = () => {
  const newRecipe = store.addRecipe({ name: name.value, description: description.value });
  router.push({
    name: 'recipe',
    params: { id: newRecipe.id },
  });
};
</script>
