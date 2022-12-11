import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

import "./Recipe.css";

export default function Recipe() {
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { mode } = useTheme();

  
  const docRef = doc(db, "recipes", id);
  
  useEffect(() => {
    setIsPending(true)
    getDoc(docRef)
      .then((doc) => {
        if(doc.data() === undefined){
          setIsPending(false)
          setError(true)
        }
        setRecipe(doc.data());
        setIsPending(false)
      })
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });

    if (error) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [error, navigate, id]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className={`error ${mode}`}>Could not fetch data</p>}
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
