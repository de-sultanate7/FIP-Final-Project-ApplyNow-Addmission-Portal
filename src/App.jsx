import React from 'react'
import { FormProvider } from './context/FormContext'
import Apply from './pages/Apply'
import Confirmation from './pages/Confirmation'
import ApplicantDashboard from './components/Dashboard/ApplicantDashboard'
import { Routes, Route, Link } from 'react-router-dom'

export default function App(){
  return (
    <FormProvider>
      <div className="app">
        <header className="app-header" style={{display:'flex',alignItems:'center',gap:12,marginBottom:20, justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <img src="/logo.png" alt="De Sultanate" style={{height:64}} onError={(e)=>{e.currentTarget.style.display='none'}} />
            <div>
              <h1 style={{margin:0}}>ApplyNow</h1>
              <small style={{color:'#555'}}>Admissions Portal</small>
            </div>
          </div>
          <nav>
            <Link to="/" style={{marginRight:12}}>Apply</Link>
            <Link to="/dashboard">My Dashboard</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Apply/>} />
            <Route path="/dashboard" element={<ApplicantDashboard/>} />
            <Route path="/confirmation" element={<Confirmation/>} />
          </Routes>
        </main>
      </div>
    </FormProvider>
  )
}
