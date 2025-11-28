import React from 'react'
import { useForm } from '../../context/FormContext'

export default function FormStepPersonal(){
  const { formData, updateField } = useForm()

  return (
    <section>
      <h3>Personal Details</h3>
      <label>
        Full name
        <input value={formData.name} onChange={e=>updateField('name', e.target.value)} />
      </label>
      <label>
        Email
        <input value={formData.email} onChange={e=>updateField('email', e.target.value)} />
      </label>
      <label>
        phoneNumber
        <input value={formData.phonenumber} onChange={e=>updateField('phonenumber', e.target.value)} />
      </label>
    </section>
  )
}
