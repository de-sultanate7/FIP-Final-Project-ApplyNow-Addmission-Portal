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

export default { submitApplication }
