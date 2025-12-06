import React from 'react'
import { useForm } from '../../context/FormContext'
import { useNavigate } from 'react-router-dom'
import applicantApi from '../../services/applicantApi'

export default function FormStepReview({ onBack = () => {} }){
  const { formData, update } = useForm()
  const navigate = useNavigate()

  async function handleSubmit(){
    // simulation of submission by saving to mock applicant API and updating status
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
        <div><strong>Personal Info</strong>: {formData.personalInfo?.userName || '—'}</div>
        <div><strong>Academic Details</strong>: {formData.academicDetails?.lastSchoolAttended || '—'}</div>
        <div><strong>Guardian Info</strong>: {formData.guardianInfo?.guardianName || '—'}</div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <button onClick={handleBack} className="px-3 py-2 border rounded">Back</button>
        </div>
        <div>
          <button onClick={onNext} className="px-3 py-2 bg-blue-600 text-white border rounded">Next</button>
        </div>
      </div>
    </div>
  )
}
