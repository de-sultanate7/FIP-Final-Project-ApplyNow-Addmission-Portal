import React, { useEffect, useState } from 'react'
import { useForm } from '../../context/FormContext'

export default function FormStepGuardian({ onNext = () => {}, onBack = () => {} }){
  const { formData, update } = useForm();
  const initial = formData?.guardianInfo ?? {
    guardianName: '',
    guardianPhoneNumber: '',
    guardianEmail: '',
    guardianAddress: '',
    relationship: ''
  }

  const [local, setLocal] = useState(initial);

  useEffect(() => {
    setLocal(formData?.guardianInfo ?? initial)
  }, [formData?.guardianInfo])

  const handleNext = () => {
    // FormContext.update(section, values)
    update('guardianInfo', local)
    onNext()
  }

  const handleBack = () => onBack()

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Guardian Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Full Name</label>
          <input
            value={local.guardianName || ''}
            onChange={(e) => setLocal({ ...local, guardianName: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Relationship</label>
          <input
            value={local.relationship || ''}
            onChange={(e) => setLocal({ ...local, relationship: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Phone</label>
          <input
            value={local.guardianPhoneNumber || ''}
            onChange={(e) => setLocal({ ...local, guardianPhoneNumber: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Email</label>
          <input
            value={local.guardianEmail || ''}
            onChange={(e) => setLocal({ ...local, guardianEmail: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm">Address</label>
          <textarea
            value={local.guardianAddress || ''}
            onChange={(e) => setLocal({ ...local, guardianAddress: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <button type="button" onClick={handleBack} className="px-4 py-2 border rounded">Back</button>
        </div>
        <div>
          <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
        </div>
      </div>
    </div>
  )
}
