import React from 'react'
import { useForm } from '../../context/FormContext'

export default function FormReview(){
  const { formData } = useForm()

  return (
    <section>
      <h3>Review</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </section>
  )
}
