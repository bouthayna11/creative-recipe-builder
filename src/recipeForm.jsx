import React, { useState } from 'react';

function RecipeForm({ recette, onSave, onClose }) {

    const [name, setName] = useState(recette ? recette.name : '');
    const [category, setCategory] = useState(recette ? recette.category : 'Plat');
    const [ingredients, setIngredients] = useState(
        recette ? [...recette.ingredients] : ['']
    );
    const [difficulty, setDifficulty] = useState(recette ? recette.difficulty : 1);
    const [description, setDescription] = useState(recette ? recette.description : '');

    function ajouterIngredient() {
        setIngredients([...ingredients, '']);
    }

    function changerIngredient(index, value) {
        const liste = [...ingredients];
        liste[index] = value;
        setIngredients(liste);
    }

    function supprimerIngredient(index) {
        setIngredients(ingredients.filter((item, i) => i !== index));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const nouvelleRecette = {
            id: recette ? recette.id : Date.now(),
            name: name,
            category: category,
            ingredients: ingredients.filter(item => item.trim() !== ''),
            difficulty: Number(difficulty),
            description: description,
            image: recette ? recette.image : ''
        };

        onSave(nouvelleRecette);
    }

    return (
        <form onSubmit={handleSubmit}>

            <h2>{recette ? 'Modifier la recette' : 'Ajouter une recette'}</h2>

            <label>Nom :</label>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />

            <label>Catégorie :</label>
            <select
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option>Entrée</option>
                <option>Plat</option>
                <option>Dessert</option>
                <option>Boisson</option>
            </select>

            <label>Ingrédients :</label>

            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        value={ingredient}
                        onChange={e => changerIngredient(index, e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => supprimerIngredient(index)}
                    >
                        Supprimer
                    </button>
                </div>
            ))}

            <button type="button" onClick={ajouterIngredient}>
                Ajouter un ingrédient
            </button>

            <label>Difficulté : {difficulty}</label>
            <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
            />

            <label>Description :</label>
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose}>Annuler</button>

        </form>
    );
}

export default RecipeForm;
