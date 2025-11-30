import React, { useEffect, useState } from 'react'
import { getMyApplication, updateMyApplication } from '../../services/applicantApi'

function ProgressBar({ percent }){
  const p = Math.max(0, Math.min(100, Math.round(percent)))
  return (
    <div style={{border:'1px solid #ddd', borderRadius:6, padding:6, width: '100%'}}>
      <div style={{height:12, width:`${p}%`, background:'#4caf50', borderRadius:4}} />
      <div style={{fontSize:12, color:'#333', marginTop:6}}>{p}% complete</div>
    </div>
  )
}

function Section({ title, children, onEdit }){
  return (
    <div style={{border:'1px solid #eee', padding:12, borderRadius:6, marginBottom:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>{title}</strong>
        {onEdit && <button onClick={onEdit}>Edit</button>}
      </div>
      <div style={{marginTop:8}}>{children}</div>
    </div>
  )
}

export default function ApplicantDashboard(){
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    getMyApplication().then(res=>{ if(mounted){ setApp(res); setLoading(false) }})
    return ()=> mounted = false
  }, [])

  function calcProgress(application){
    if(!application) return 0
    let total = 4
    let done = 0
    if(application.personalInfo && Object.values(application.personalInfo).some(Boolean)) done++
    if(application.guardian && Object.values(application.guardian).some(Boolean)) done++
    if(application.academic && Object.values(application.academic).some(Boolean)) done++
    if(application.uploadDocuments) done++
    return (done / total) * 100
  }

  function handleExport(){
    if(!app) return
    const blob = new Blob([JSON.stringify(app, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `application-${app.id || 'me'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function openEdit(){
    // Navigate to main application page where they can edit (assuming route exists)
    // Fallback: reload root path
    window.location.href = '/'
  }

  if(loading) return <div style={{padding:20}}>Loading your application...</div>

  if(!app) return <div style={{padding:20}}>No application found for your account.</div>

  const progress = calcProgress(app)

  return (
    <div style={{padding:20}}>
      <h2>My Application</h2>
      <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:12}}>
        <div style={{minWidth:260}}>
          <Section title="Summary">
            <div><strong>Name:</strong> {app.personalInfo?.userName || '—'}</div>
            <div><strong>Email:</strong> {app.personalInfo?.email || '—'}</div>
            <div><strong>Status:</strong> {app.status}</div>
            <div style={{marginTop:8}}><button onClick={handleExport}>Export my application</button></div>
          </Section>
        </div>
        <div style={{flex:1}}>
          <Section title="Progress">
            <ProgressBar percent={progress} />
          </Section>
          <Section title="Actions">
            <div style={{display:'flex', gap:8}}>
              <button onClick={openEdit}>Edit Application</button>
            </div>
          </Section>
        </div>
      </div>

      <Section title="Personal Information" onEdit={openEdit}>
        <div><strong>Phone:</strong> {app.personalInfo?.phoneNumber || '—'}</div>
        <div><strong>Address:</strong> {app.personalInfo?.address || '—'}</div>
      </Section>

      <Section title="Guardian Information" onEdit={openEdit}>
        <div><strong>Guardian:</strong> {app.guardian?.guardianName || '—'}</div>
        <div><strong>Guardian Phone:</strong> {app.guardian?.guardianPhoneNumber || '—'}</div>
      </Section>

      <Section title="Academic" onEdit={openEdit}>
        <div><strong>School:</strong> {app.academic?.lastSchoolAttended || '—'}</div>
        <div><strong>Qualification:</strong> {app.academic?.qualificationObtained || '—'}</div>
        <div><strong>Grades / Score:</strong> {app.academic?.grades || app.academic?.testScore || '—'}</div>
      </Section>

      <Section title="Uploaded Documents">
        {app.uploadDocuments ? (
          <div>
            <a href={app.uploadDocuments} target="_blank" rel="noreferrer">View uploaded document</a>
          </div>
        ) : <div>No documents uploaded yet.</div>}
      </Section>
    </div>
  )
}
