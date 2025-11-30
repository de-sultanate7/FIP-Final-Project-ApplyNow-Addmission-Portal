import React from 'react'
import ApplicantsTable from './ApplicantsTable'

export default function AdminDashboard(){
  return (
    <div style={{padding:16}}>
      <h2>Admin Dashboard</h2>
      <p>Manage applicants, view details and update statuses.</p>
      <div style={{marginTop:12}}>
        <ApplicantsTable />
      </div>
    </div>
  )
}
