import React from 'react'
import { FormProvider } from './context/FormContext'
import Apply from './pages/Apply'

export default function App(){
  return (
    <FormProvider>
      <div className="app">
        <main>
          <Apply />
        </main>
      </div>
    </FormProvider>
  )
}
