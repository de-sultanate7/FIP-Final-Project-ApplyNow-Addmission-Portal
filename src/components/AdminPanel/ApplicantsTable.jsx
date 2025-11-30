import React, { useEffect, useMemo, useState } from 'react'
import adminApi from '../../services/adminApi'
import ApplicantDetailModal from './ApplicantDetailModal'

function downloadCSV(filename, rows){
  const header = Object.keys(rows[0]||{})
  const csv = [header.join(','), ...rows.map(r=> header.map(h=> `"${String(r[h] ?? '')}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url)
}

export default function ApplicantsTable(){
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(()=>{
    setLoading(true)
    adminApi.getApplications().then(data=>{ setApps(data); setLoading(false) })
  },[])

  const statuses = useMemo(()=> Array.from(new Set(apps.map(a=>a.status))).sort(), [apps])

  const visible = apps.filter(a=>{
    const q = query.trim().toLowerCase()
    if (filterStatus && a.status !== filterStatus) return false
    if (!q) return true
    const name = (a.personalInfo?.userName || '').toLowerCase()
    const email = (a.personalInfo?.email || '').toLowerCase()
    return name.includes(q) || email.includes(q)
  })

  async function handleStatusChange(id, status){
    try{
      await adminApi.updateApplicationStatus(id, status)
      setApps(prev => prev.map(p=> p.id===id ? {...p, status} : p))
    }catch(err){
      console.error(err); alert('Failed to update status')
    }
  }

  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input placeholder="Search name or email" value={query} onChange={e=>setQuery(e.target.value)} style={{flex:1,padding:8}} />
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{padding:8}}>
          <option value="">All statuses</option>
          {statuses.map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={()=> downloadCSV('applications.csv', visible.map(a=>({ id:a.id, name:a.personalInfo?.userName, email:a.personalInfo?.email, status:a.status, submittedAt:a.submittedAt })))}>Export CSV</button>
      </div>

      {loading ? <div>Loading applicants…</div> : (
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{textAlign:'left',borderBottom:'1px solid #ddd'}}>
              <th style={{padding:8}}>Name</th>
              <th style={{padding:8}}>Email</th>
              <th style={{padding:8}}>Status</th>
              <th style={{padding:8}}>Submitted</th>
              <th style={{padding:8}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(a=> (
              <tr key={a.id} style={{borderBottom:'1px solid #eee'}}>
                <td style={{padding:8}}>{a.personalInfo?.userName}</td>
                <td style={{padding:8}}>{a.personalInfo?.email}</td>
                <td style={{padding:8}}>{a.status}</td>
                <td style={{padding:8}}>{new Date(a.submittedAt).toLocaleString()}</td>
                <td style={{padding:8}}>
                  <button onClick={()=> setSelected(a)} style={{marginRight:8}}>View</button>
                  <button onClick={()=> handleStatusChange(a.id, 'Approved')} style={{marginRight:6}}>Approve</button>
                  <button onClick={()=> handleStatusChange(a.id, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ApplicantDetailModal application={selected} onClose={()=> setSelected(null)} onStatusChange={async (id,status)=>{ await handleStatusChange(id,status); setSelected(prev=> prev ? {...prev, status} : prev) }} />
    </div>
  )
}
