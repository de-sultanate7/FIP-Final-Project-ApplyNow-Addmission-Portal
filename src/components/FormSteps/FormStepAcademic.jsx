import React, { useEffect, useState } from 'react'
import { useForm } from '../../context/FormContext'

export default function FormStepAcademic({ onNext = () => {}, onBack = () => {} }){
  const { formData, update } = useForm();
  const initial = formData?.academicDetails ?? {
    lastSchoolAttended: '',
    qualificationObtained: '',
    yearOfGraduation: '',
    grades: '',
    courseOfStudy: '',
    intendedProgram: '',
    personalEssay: '',
    uploadDocuments: null,
  }

  const [local, setLocal] = useState(initial);

  useEffect(() => {
    setLocal(formData?.academicDetails ?? initial)
  }, [formData?.academicDetails])

  const [uploading, setUploading] = useState(false)

  async function handleNext(){
    try{
      setUploading(true)
      let uploadResult = null
      if (local.uploadDocuments && typeof local.uploadDocuments !== 'string'){
        const { uploadDocument } = await import('../../services/api')
        uploadResult = await uploadDocument(local.uploadDocuments)
      }

      const payload = { ...local }
      if (uploadResult && uploadResult.url){
        payload.uploadDocuments = uploadResult.url
      } else if (local.uploadDocuments && typeof local.uploadDocuments !== 'string'){
        payload.uploadDocuments = null
      }

      update('academic', payload)
      onNext()
    }catch(err){
      console.error('Upload error', err)
      alert('Upload failed: ' + err.message)
    }finally{
      setUploading(false)
    }
  }

  const handleBack = () => onBack()

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Academic Details</h2>

      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Last School Attended</label>
          <input
            value={local.lastSchoolAttended || ''}
            onChange={(e) => setLocal({ ...local, lastSchoolAttended: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Qualification Obtained</label>
          <input
            value={local.qualificationObtained || ''}
            onChange={(e) => setLocal({ ...local, qualificationObtained: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Year of Graduation</label>
          <input
            value={local.yearOfGraduation || ''}
            onChange={(e) => setLocal({ ...local, yearOfGraduation: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full md:w-1/2 px-2">
          <label className="block text-sm">Grades</label>
          <input
            value={local.grades || ''}
            onChange={(e) => setLocal({ ...local, grades: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full px-2">
          <label className="block text-sm">Course of Study</label>
          <textarea
            value={local.courseOfStudy || ''}
            onChange={(e) => setLocal({ ...local, courseOfStudy: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full px-2">
          <label className="block text-sm">Intended Program</label>
          <textarea
            value={local.intendedProgram || ''}
            onChange={(e) => setLocal({ ...local, intendedProgram: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full px-2">
          <label className="block text-sm">Personal Essay</label>
          <textarea
            value={local.personalEssay || ''}
            onChange={(e) => setLocal({ ...local, personalEssay: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="w-full px-2">
          <label className="block text-sm">Upload Document (pdf/doc)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setLocal({ ...local, uploadDocuments: e.target.files?.[0] ?? null })}
            className="w-full p-2"
          />
          {local.uploadDocuments && typeof local.uploadDocuments !== 'string' && (
            <div className="text-sm mt-2">Selected: {local.uploadDocuments.name} ({Math.round(local.uploadDocuments.size/1024)} KB)</div>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <button type="button" onClick={handleBack} className="px-4 py-2 border rounded" disabled={uploading}>{uploading ? 'Uploading…' : 'Back'}</button>
        </div>
        <div>
          <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
        </div>
      </div>
    </div>
  )
}
  