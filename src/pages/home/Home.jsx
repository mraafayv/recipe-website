import { useFetch } from '../../hooks/useFetch'

import './Home.css'


export default function Home() {

  const { data, isPending, error} = useFetch(' http://localhost:3000/recipes');
  return (
    <div className='home'>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {data && data.map(recipe => (
        <h2>{recipe.title}</h2>
      ))}
    </div>
  )
}
