import React, { useMemo, useState } from 'react';
import RecipeList from './recipeliste';
import RecipeForm from './recipeForm';
import RecipeFilter from './reciptefilter';
import Aide from './aide';

const initialRecipes = [
  { id: 1, name: 'Pancakes', category: 'Dessert', ingredients: ['Farine', 'Lait', 'Œuf'], difficulty: 2, description: 'Des pancakes faciles pour le petit-déjeuner.', image: '' },
  { id: 2, name: 'Salade fraîche', category: 'Entrée', ingredients: ['Tomate', 'Concombre', 'Salade'], difficulty: 1, description: 'Une salade simple et fraîche.', image: '' },
  { id: 3, name: 'Jus d’orange', category: 'Boisson', ingredients: ['Oranges', 'Eau'], difficulty: 1, description: 'Un jus maison.', image: '' }
];

function MainPage() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [showForm, setShowForm] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Toutes');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;

  const filteredRecipes = useMemo(() => recipes.filter(recipe => {
    const matchesName = recipe.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Toutes' || recipe.category === category;
    return matchesName && matchesCategory;
  }), [recipes, search, category]);

  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / recipesPerPage));
  const visibleRecipes = filteredRecipes.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage);

  const openCreate = () => {
    setRecipeToEdit(null);
    setShowForm(true);
  };

  const openEdit = (recipe) => {
    setRecipeToEdit(recipe);
    setShowForm(true);
  };

  const saveRecipe = (form) => {
    if (recipeToEdit) {
      setRecipes(recipes.map(recipe => recipe.id === recipeToEdit.id ? { ...form, id: recipeToEdit.id } : recipe));
    } else {
      setRecipes([...recipes, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setRecipeToEdit(null);
  };

  const deleteRecipe = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette recette ?')) {
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      setCurrentPage(1);
    }
  };

  const duplicateRecipe = (recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now(), name: recipe.name + ' (copie)' }]);
  };

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">MON CARNET DE CUISINE</p>
          <h1>Creative Recipe Builder <span>🍓</span></h1>
          <p>Crée, organise et partage tes idées de recettes.</p>
        </div>
        <button onClick={openCreate}>+ Nouvelle recette</button>
      </header>

      <RecipeFilter search={search} setSearch={value => { setSearch(value); setCurrentPage(1); }}
        category={category} setCategory={value => { setCategory(value); setCurrentPage(1); }} />

      <div className="section-title">
        <h2>Mes recettes</h2>
        <span>{filteredRecipes.length} recette(s)</span>
      </div>

      <RecipeList recipes={visibleRecipes} onEdit={openEdit} onDelete={deleteRecipe} onDuplicate={duplicateRecipe} />
      <Aide />

      {showForm && <RecipeForm recipeToEdit={recipeToEdit} onSave={saveRecipe}
        onClose={() => { setShowForm(false); setRecipeToEdit(null); }} />}
    </main>
  );
}

export default MainPage;