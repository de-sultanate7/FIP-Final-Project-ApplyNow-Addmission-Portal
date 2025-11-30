const API_BASE = ''

export async function submitApplication(data){
  // Example placeholder - replace API_BASE and endpoint
  const url = API_BASE + '/applications'
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!resp.ok) throw new Error('Failed to submit')
  return resp.json()
}

// Upload a single file using multipart/form-data. Server should return JSON { url }
export async function uploadDocument(file){
  if (!file) throw new Error('No file provided')
  const fd = new FormData()
  fd.append('file', file)
  const url = API_BASE + '/upload'
  const resp = await fetch(url, {
    method: 'POST',
    body: fd
  })
  if (!resp.ok) {
    const text = await resp.text().catch(()=>null)
    throw new Error('Upload failed: ' + (text || resp.status))
  }
  return resp.json()
}

export default { submitApplication, uploadDocument }
