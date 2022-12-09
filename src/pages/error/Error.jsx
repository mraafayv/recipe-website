
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme';
import './Error.css'

export default function Error() {

  const { mode } = useTheme()

  const navigate = useNavigate();

  useEffect(()=> {
    setTimeout(()=> navigate("/"), 2000)
  })
  return (
    <div className={`error ${mode}`}>Resource Not Found!</div>
  )
}
