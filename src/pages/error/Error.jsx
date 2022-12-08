
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Error.css'

export default function Error() {

  const navigate = useNavigate();

  useEffect(()=> {
    setTimeout(()=> navigate("/"), 2000)
  })
  return (
    <div className='error'>Resource Not Found!</div>
  )
}
