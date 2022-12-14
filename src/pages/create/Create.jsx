import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";

import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [method, setMethod] = useState("");
  const [singleIngredient, setSingleIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const navigate = useNavigate();
  const { mode } = useTheme();

  const data = {
    title,
    cookingTime: cookingTime + " minutes",
    ingredients,
    method
  }

  // const { postData, data, error } = useFetch("http://localhost:3000/recipes", "POST");

  // console.log(data)
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = singleIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setSingleIngredient("");
    ingredientInput.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, "recipes");

    await addDoc(ref, data);

    resetForm();
  };


  const resetForm = () => {
    setTitle("");
    setCookingTime("");
    setMethod("");
    setIngredients([]);
    
    setTimeout(()=> navigate('/'), 1000)
  };

  return (
    <div className={`create ${mode}`}>
      <h2 className={`page-title ${mode}`}>Add a new Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className={`ingredients ${mode}`}>
            <input
              type="text"
              onChange={(e) => setSingleIngredient(e.target.value)}
              value={singleIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              Add
            </button>
          </div>
        </label>
        <p>
          Current Ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <label>
          <span>Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <button>Submit</button>
      </form>

      {/* <button type="submit" onClick={handleSubmit}>
        Submit
      </button> */}
    </div>
  );
}
