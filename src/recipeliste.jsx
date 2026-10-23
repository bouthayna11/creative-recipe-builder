import React from 'react';
import RecipeItem from './recipitem';

function RecipeList({ recipes, onEdit, onDelete, onDuplicate }) {
  if (recipes.length === 0) return <p className="empty">Aucune recette trouvée. Ajoute ta première recette !</p>;

  return (
    <div className="recipe-grid">
      {recipes.map(recipe => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
}

export default RecipeList;