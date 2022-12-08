import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: recipe,
    isPending,
    error,
  } = useFetch(` http://localhost:3000/recipes/${id} `);

useEffect(()=>{
    if(error){
      setTimeout(()=>navigate("/"), 2000);
    }
}, [error, navigate]);

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">Method: {recipe.method}</p>
        </>
      )}
      
    </div>
  );
}
