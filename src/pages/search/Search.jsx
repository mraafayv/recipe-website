import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList'

import './Search.css'


export default function Search() {
  
  const queryParam = useLocation().search;
  const queryString = new URLSearchParams(queryParam);
  const query = queryString.get('q');
  
  const {data, error, isPending} = useFetch(`http://localhost:3000/recipes?q=${query}`)

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className='error'>{error}</p>} 
      {isPending && <p className='loading'>Loading...</p>}  
      {data && <RecipeList recipes={data}/>} 

    </div>
    )
}
