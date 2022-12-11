import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import "./Home.css";

import RecipeList from "../../components/RecipeList";
import { useTheme } from "../../hooks/useTheme";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { mode } = useTheme();
  const ref = collection(db, "recipes");



  useEffect(() => {
    setIsPending(true);
    // let ref = collection(db, c);

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setData(results);
      setIsPending(false)
    })
    


    return () => unsub()

  }, [collection]);


  return (
    <div className="home">
      {error && <p className={`error ${error}`}>{error}</p>}
      {isPending && <p className={`loading ${mode}`}>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
