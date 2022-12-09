import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mode } = useTheme();

  const {
    data: recipe,
    isPending,
    error,
  } = useFetch(` http://localhost:3000/recipes/${id} `);

  useEffect(() => {
    if (error) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [error, navigate]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && <p className={`loading ${mode}`}>Loading...</p>}
      {recipe && (
        <>
          <h2 className={`page-title ${mode}`}>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className={`method ${mode}`}>Method: {recipe.method}</p>
        </>
      )}
    </div>
  );
}
