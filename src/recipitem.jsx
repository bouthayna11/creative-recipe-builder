import React from 'react';

function RecipeItem({ recipe, onEdit, onDelete, onDuplicate }) {
  return (
    <article className="recipe-card">
      {recipe.image ? (
        <img className="recipe-image" src={recipe.image} alt={recipe.name} />
      ) : (
        <div className="recipe-placeholder">🍲</div>
      )}
      <div className="recipe-content">
        <span className="category">{recipe.category}</span>
        <h3>{recipe.name}</h3>
        <p>{recipe.description || 'Aucune description.'}</p>
        <p><strong>Ingrédients :</strong></p>
        <ul>{recipe.ingredients.filter(item => item.trim() !== '').map((item, index) => <li key={index}>{item}</li>)}</ul>
        <p><strong>Difficulté :</strong> {recipe.difficulty}/5</p>
        <div className="actions">
          <button onClick={() => onEdit(recipe)}>Modifier</button>
          <button className="secondary" onClick={() => onDuplicate(recipe)}>Dupliquer</button>
          <button className="danger" onClick={() => onDelete(recipe.id)}>Supprimer</button>
        </div>
      </div>
    </article>
  );
}

export default RecipeItem;