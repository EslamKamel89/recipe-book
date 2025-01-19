import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type Recipe = {
  id: string;
  name: string;
  description: string;
};

type NewRecipe = Omit<Recipe, 'id'>;

export const useRecipeStore = defineStore('recipe', () => {
  //! refs
  const recipes = ref<Recipe[]>([]);
  const favorites = ref<string[]>([]);
  //! Add Recipe Action
  const addRecipe = (recipe: NewRecipe) => {
    const newRecipe = { id: Date.now().toString(), ...recipe };
    recipes.value.push(newRecipe);
    return newRecipe;
  };
  //! Get Recipe By Id action
  const getRecipeById = (id: string) => recipes.value.find((recipe) => recipe.id === id);
  //! Filtered Recipes Getter
  const filteredRecipes = computed(() => {
    return (searchQuery: string) => {
      if (searchQuery == '') return recipes.value;
      return recipes.value.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    };
  });
  //! Edit Recipe action
  const editRecipe = (updatedRecipe: Recipe): Recipe | undefined => {
    const index = recipes.value.findIndex((recipe) => recipe.id === updatedRecipe.id);
    if (index !== -1) {
      recipes.value[index] = updatedRecipe;
      return updatedRecipe;
    }
    return undefined;
  };
  //! Toggle Favorites action
  const toggleFavorite = (id: string) => {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter((favId) => favId !== id);
    } else {
      favorites.value.push(id);
    }
  };
  //! Is Favoirte Action
  const isFavorite = (id: string): boolean => {
    return favorites.value.includes(id);
  };
  //! Favorites Recipes getter
  const favoriteRecipes = computed(() =>
    recipes.value.filter((recipe) => favorites.value.includes(recipe.id)),
  );
  return {
    recipes,
    addRecipe,
    getRecipeById,
    filteredRecipes,
    editRecipe,
    favorites,
    favoriteRecipes,
    toggleFavorite,
    isFavorite,
  };
});
