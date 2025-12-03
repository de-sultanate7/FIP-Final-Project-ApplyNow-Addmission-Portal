import React, { useState } from 'react'
import { useForm } from '../context/FormContext'
import FormStepPersonal from '../components/FormSteps/FormStepPersonal'
import FormStepAcademic from '../components/FormSteps/FormStepAcademic'
import FormStepGuardian from '../components/FormSteps/FormStepGuardian'
import FormStepReview from '../components/FormSteps/FormStepReview'

const steps = [
  { id: 'personal', title: 'Personal' },
  { id: 'academic', title: 'Academic' },
  { id: 'guardian', title: 'Guardian' },
  { id: 'review', title: 'Review' },
]

function StepNav({ current, goTo, validations = [] }) {
  return (
    <nav className="bg-white p-6 border-b border-gray-200">
      <ol className="flex items-center gap-4">
        {steps.map((s, idx) => {
          const active = idx === current
          const completed = idx < current

          return (
            <li key={s.id} className="flex items-center gap-3">
              <button
                onClick={() => goTo(idx)}
                className={`flex items-center gap-3 focus:outline-none ${
                  active ? 'text-blue-600' : 'text-gray-600'
                }`}
                aria-current={active ? 'step' : undefined}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                    completed
                      ? 'bg-green-600 text-white'
                      : active
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className={`hidden sm:inline ${active ? 'font-semibold' : ''}`}>
                  {s.title}
                </span>
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`hidden sm:block w-8 h-0.5 ${
                    idx < current ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
              {validations[idx] === false && (
                <span
                  title="Missing required fields"
                  className="ml-1 inline-flex items-center justify-center w-3 h-3 rounded-full bg-red-500"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default function Apply() {
  const { formData } = useForm()
  const [step, setStep] = useState(0)

  function validateStep(i) {
    const fd = formData || {}
    if (i === 0) {
      const p = fd.personalInfo || {}
      return Boolean(
        p.userName &&
          p.userName.trim() &&
          p.email &&
          p.email.trim()
      )
    }
    if (i === 1) {
      const a = fd.academic || {}
      return Boolean(
        a.lastSchoolAttended &&
          a.lastSchoolAttended.trim() &&
          a.qualificationObtained &&
          a.qualificationObtained.trim()
      )
    }
    if (i === 2) {
      const g = fd.guardian || {}
      return Boolean(
        g.guardianName &&
          g.guardianName.trim() &&
          g.guardianPhoneNumber &&
          g.guardianPhoneNumber.trim()
      )
    }
    return true
  }

  const validations = steps.map((_, idx) => validateStep(idx))

  function next() {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  function back() {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  function goTo(i) {
    setStep(Math.max(0, Math.min(i, steps.length - 1)))
  }

  return (
    <div className="apply-page bg-gray-50 min-h-screen">
      <StepNav current={step} goTo={goTo} validations={validations} />

      <div className="max-w-4xl mx-auto p-6">
        {step === 0 && <FormStepPersonal onNext={next} />}
        {step === 1 && <FormStepAcademic onNext={next} onBack={back} />}
        {step === 2 && <FormStepGuardian onNext={next} onBack={back} />}
        {step === 3 && <FormStepReview onBack={back} />}
      </div>
    </div>
  )
}
