import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList'

import './Search.css'
import { useTheme } from '../../hooks/useTheme';


export default function Search() {
  
  const queryParam = useLocation().search;
  const queryString = new URLSearchParams(queryParam);
  const query = queryString.get('q');
  
  const {data, error, isPending} = useFetch(`http://localhost:3000/recipes?q=${query}`)
  const {mode} = useTheme()

  return (
    <div>
      <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
      {error && <p className={`error ${mode}`}>{error}</p>} 
      {isPending && <p className={`loading ${mode}`}>Loading...</p>}  
      {data && <RecipeList recipes={data}/>} 

    </div>
    )
}
