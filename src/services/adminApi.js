// Mock admin API for managing applications
const now = () => new Date().toISOString()

let _applications = [
  {
    id: 'app-1',
    personalInfo: { userName: 'Alice Johnson', email: 'alice@gmail.com' },
    guardian: {},
    academic: { lastSchoolAttended: 'Central High', qualificationObtained: 'BSc', yearOfGraduation: '2022', grades: '3.7', testScore: '86' },
    uploadDocuments: null,
    status: 'Submitted',
    submittedAt: now()
  },
  {
    id: 'app-2',
    personalInfo: { userName: 'Bob Smith', email: 'bob@gmail.com' },
    guardian: {},
    academic: { lastSchoolAttended: 'West Academy', qualificationObtained: 'HND', yearOfGraduation: '2020', grades: '3.2', testScore: '72' },
    uploadDocuments: null,
    status: 'Draft',
    submittedAt: now()
  },
  {
    id: 'app-3',
    personalInfo: { userName: 'Cynthia Lee', email: 'cynthia@gmail.com' },
    guardian: {},
    academic: { lastSchoolAttended: 'North College', qualificationObtained: 'MSc', yearOfGraduation: '2021', grades: '4.0', testScore: '93' },
    uploadDocuments: null,
    status: 'Submitted',
    submittedAt: now()
  }
]

export async function getApplications(){
  // simulate network latency
  return new Promise((res)=> setTimeout(()=> res(_applications.slice()), 200))
}

export async function getApplication(id){
  const item = _applications.find(a=>a.id === id)
  return new Promise((res)=> setTimeout(()=> res(item ? {...item} : null), 150))
}

export async function updateApplicationStatus(id, status){
  const idx = _applications.findIndex(a=>a.id===id)
  if (idx === -1) throw new Error('Not found')
  _applications[idx] = { ..._applications[idx], status }
  return new Promise((res)=> setTimeout(()=> res({..._applications[idx]}), 150))
}

export default { getApplications, getApplication, updateApplicationStatus }
