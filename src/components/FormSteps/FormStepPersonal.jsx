import React, { useState, useEffect } from 'react'
import { useForm } from '../../context/FormContext'

export default function FormStepPersonal({ onNext = () => {}, onBack = () => {} }){
  const { formData, update } = useForm();
  const initial = formData?.personalInfo ?? {
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    country: '',
    stateOfOrigin: '',
    lga: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    address: '',
  }

  const [local, setLocal] = useState(initial);

  useEffect(() => {
    setLocal(formData?.personalInfo ?? initial)
  }, [formData?.personalInfo])

  const handleNext = () => {
    update('personalInfo', local)
    onNext()
  }

  const handleBack = () => onBack()

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Personal Info</h2>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">User Name</label>
          <input
            value={local.userName || ''}
            onChange={(e) => setLocal({ ...local, userName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">First Name</label>
          <input
            value={local.firstName || ''}
            onChange={(e) => setLocal({ ...local, firstName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Middle Name</label>
          <input 
            value={local.middleName || ''}
            onChange={(e) => setLocal({ ...local, middleName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label  className="block text-sm">Last Name</label>
          <input
            value={local.lastName || ''}
            onChange={(e) => setLocal({ ...local, lastName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Gender</label>
          <input 
            value={local.gender || ''}
            onChange={(e) => setLocal({ ...local, gender: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Country</label>
          <input 
            value={local.country || ''}
            onChange={(e) => setLocal({ ...local, country: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">State of Origin</label>
          <input 
            value={local.stateOfOrigin || ''}
            onChange={(e) => setLocal({ ...local, stateOfOrigin: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">LGA</label>
          <input 
            value={local.lga || ''}
            onChange={(e) => setLocal({ ...local, lga: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Date of Birth</label>
          <input 
            value={local.dateOfBirth || ''}
            onChange={(e) => setLocal({ ...local, dateOfBirth: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Email</label>
          <input
            value={local.email || ''}
            onChange={(e) => setLocal({ ...local, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-full px-2">
          <label className="block text-sm">Phone Number</label>
          <input
            value={local.phoneNumber || ''}
            onChange={(e) => setLocal({ ...local, phoneNumber: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Address</label>
          <input 
            value={local.address || ''}
            onChange={(e) => setLocal({ ...local, address: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
        </div>
        <div>
          <button type="button" onClick={handleBack} className="px-4 py-2 border rounded">Back</button>
        </div>
      </div>
    </div>
  )
}

