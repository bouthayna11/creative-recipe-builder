import React from 'react';

function RecipeFilter({ search, setSearch, category, setCategory }) {
  return (
    <div className="filters">
      <input value={search} onChange={(e) => setSearch(e.target.value)}/>
      <select value={category} onChange={e=> setCategory(e.target.value)}>
        <option value="Toutes">Toutes les catégories</option>
        <option>Entrée</option><option>Plat</option><option>Dessert</option><option>Boisson</option>
      </select>
    </div>
  );
}

export default RecipeFilter;