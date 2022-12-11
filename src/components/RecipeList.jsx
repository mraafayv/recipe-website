import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import deleteIcon from "../assets/delete-icon.svg";
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className={`recipe ${mode}`}>No such recipes found..!</div>;
  }

  const handleClick = async (id) => {
    const ref = doc(db, "recipes", id);

    if (ref !== null) {
      await deleteDoc(ref);
    }
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <div className={`card-header ${mode}`}>
            <h3>{recipe.title}</h3>
            <img
              src={deleteIcon}
              alt="delete button"
              onClick={() => handleClick(recipe.id)}
              style={{
                filter: mode === "dark" ? "invert(100%)" : "invert(20%)",
              }}
            />
          </div>

          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  );
}
