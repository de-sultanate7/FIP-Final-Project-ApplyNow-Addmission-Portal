import React, { useEffect, useState } from 'react'

export default function ApplicantDetailModal({ application, onClose = ()=>{}, onStatusChange = ()=>{} }){
  const [busy, setBusy] = useState(false)

  useEffect(()=>{
    setBusy(false)
  },[application])

  if (!application) return null

  const { personalInfo, academic, guardian, status, uploadDocuments } = application

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:60}}>
      <div style={{background:'#fff',padding:16,width:'90%',maxWidth:900,borderRadius:8}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{margin:0}}>{personalInfo?.userName || 'Applicant'}</h3>
          <div>
            <button onClick={onClose} style={{marginRight:8}}>Close</button>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
          <section>
            <h4>Personal</h4>
            <div><strong>Email:</strong> {personalInfo?.email}</div>
          </section>

          <section>
            <h4>Academic</h4>
            <div><strong>School:</strong> {academic?.lastSchoolAttended}</div>
            <div><strong>Qualification:</strong> {academic?.qualificationObtained}</div>
            <div><strong>Grades:</strong> {academic?.grades}</div>
            <div><strong>Test Score:</strong> {academic?.testScore}</div>
          </section>
        </div>

        <div style={{marginTop:12}}>
          <h4>Guardian</h4>
          <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(guardian, null, 2)}</pre>
        </div>

        <div style={{marginTop:12}}>
          <h4>Uploaded Documents</h4>
          {uploadDocuments ? (
            typeof uploadDocuments === 'string' ? (
              <a href={uploadDocuments} target="_blank" rel="noreferrer">Open document</a>
            ) : (
              <div>{uploadDocuments.name}</div>
            )
          ) : <div className="text-sm">No documents uploaded</div>}
        </div>

        <div style={{marginTop:14,display:'flex',gap:8,justifyContent:'flex-end'}}>
          <div style={{alignSelf:'center',marginRight:'auto'}}><strong>Status:</strong> {status}</div>
          <button onClick={async ()=>{ setBusy(true); await onStatusChange(application.id,'Approved'); setBusy(false) }} disabled={busy}>Approve</button>
          <button onClick={async ()=>{ setBusy(true); await onStatusChange(application.id,'Rejected'); setBusy(false) }} disabled={busy}>Reject</button>
          <button onClick={async ()=>{ setBusy(true); await onStatusChange(application.id,'Draft'); setBusy(false) }} disabled={busy}>Set Draft</button>
        </div>
      </div>
    </div>
  )
}
