import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyApplication } from '../services/applicantApi'

export default function Confirmation(){
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    getMyApplication().then(res=>{ if(mounted){ setApp(res); setLoading(false) } }).catch(()=> setLoading(false))
    return ()=> mounted = false
  }, [])

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

  function handlePrint(){
    window.print()
  }

  if(loading) return <div className="p-8 text-center">Loading confirmation…</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-3">Congratulations!</h1>
        <p className="mb-4">Your application has been submitted successfully. Below is a summary — we will contact you by email with next steps.</p>

        {app ? (
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500">Application ID</div>
                <div className="font-medium">{app.id}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-medium text-green-600">{app.status}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{app.personalInfo?.userName || app.personalInfo?.firstName || '—'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{app.personalInfo?.email || '—'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Submitted</div>
                <div className="font-medium">{app.submittedAt || app.updatedAt || '—'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{app.personalInfo?.phoneNumber || '—'}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Academic</div>
              <div className="mt-1">{app.academic?.lastSchoolAttended || '—'}</div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Guardian</div>
              <div className="mt-1">{app.guardian?.guardianName || '—'}</div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleExport} className="px-4 py-2 bg-blue-600 text-white rounded">Export JSON</button>
              <button onClick={handlePrint} className="px-4 py-2 border rounded">Print</button>
              <Link to="/dashboard" className="px-4 py-2 bg-gray-100 rounded">Go to Dashboard</Link>
            </div>
          </div>
        ) : (
          <div className="text-center">No application details available.</div>
        )}
      </div>
    </div>
  )
}

