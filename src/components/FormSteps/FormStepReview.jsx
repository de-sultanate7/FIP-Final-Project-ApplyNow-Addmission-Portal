import React from 'react'
import { useForm } from '../../context/FormContext'
import { useNavigate } from 'react-router-dom'
import applicantApi from '../../services/applicantApi'

export default function FormStepReview({ onBack = () => {} }){
  const { formData, update } = useForm()
  const navigate = useNavigate()

  async function handleSubmit(){
    // For now, simulate submission by saving to mock applicant API and updating status
    try{
      await applicantApi.updateMyApplication({
        ...formData,
        status: 'Submitted'
      })
      // update local context too
      update('meta', { submittedAt: new Date().toISOString(), status: 'Submitted' })
      // navigate to a confirmation page after successful submission
      navigate('/confirmation')
    }catch(err){
      console.error(err)
      alert('Submission failed')
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Review & Submit</h2>
      <div className="space-y-2">
        <div><strong>Personal</strong>: {formData.personalInfo?.userName || '—'}</div>
        <div><strong>Academic</strong>: {formData.academic?.lastSchoolAttended || '—'}</div>
        <div><strong>Guardian</strong>: {formData.guardian?.guardianName || '—'}</div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <button onClick={handleSubmit} className="px-3 py-2 bg-blue-600 text-white rounded">Submit Application</button>
        </div>
        <div>
          <button onClick={onBack} className="px-3 py-2 border rounded">Back</button>
        </div>
      </div>
    </div>
  )
}
