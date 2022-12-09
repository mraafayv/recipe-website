import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import "./Home.css";

import RecipeList from "../../components/RecipeList";
import { useTheme } from "../../hooks/useTheme";


export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  
  const {mode} = useTheme();
  const colRef = collection(db, 'recipes') 

  useEffect(() => {
    setIsPending(true);

    let recipes = []

    getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc)=> {
        recipes.push({ ...doc.data(), id: doc.id})
      })
      // console.log(recipes)
      setData(recipes)
      setIsPending(false);     
    })
    .catch(err => {
      console.log(err.message)
    })
    
  }, []);

  return (
    <div className="home">
      {error && <p className={`error ${error}`}>{error}</p>}
      {isPending && <p className={`loading ${mode}`}>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
