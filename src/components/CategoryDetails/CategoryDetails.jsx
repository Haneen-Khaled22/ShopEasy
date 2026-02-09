import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryDetails = () => {
    const {slug} = useParams();
     
  return (
    <div>CategoryDetails</div>
  )
}

export default CategoryDetails