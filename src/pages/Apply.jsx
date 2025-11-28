import React from 'react'
import { FormProvider } from '../context/FormContext'
import FormStepper from '../components/FormStepper/Stepper'
import FormStepPersonal from '../components/FormSteps/FormStepPersonal'

export default function Apply(){
  return (
    <FormProvider>
      <div className="apply-page">
        <h2>Application</h2>
        <FormStepper />
        {/* Placeholder: show first step component */}
        <FormStepPersonal />
      </div>
    </FormProvider>
  )
}
