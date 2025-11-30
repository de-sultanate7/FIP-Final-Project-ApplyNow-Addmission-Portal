// applicant API - returns only the current applicant's data
const now = () => new Date().toISOString()

let _myApplication = {
  id: 'app-1',
  personalInfo: {
    userName: 'Alice Johnson',
    email: 'alice@gmail.com',
    phoneNumber: '555-1234',
    address: '123 Main St',
  },
  guardian: {
    guardianName: 'Mary Johnson',
    guardianPhoneNumber: '555-5678'
  },
  academic: {
    lastSchoolAttended: 'Central High',
    qualificationObtained: 'BSc',
    yearOfGraduation: '2022',
    grades: '3.7',
    testScore: '86'
  },
  uploadDocuments: null,
  status: 'Submitted',
  submittedAt: now(),
  updatedAt: now()
}

export async function getMyApplication(){
  return new Promise((res)=> setTimeout(()=> res({ ..._myApplication }), 150))
}

export async function updateMyApplication(patch){
  _myApplication = { ..._myApplication, ...patch, updatedAt: now() }
  return new Promise((res)=> setTimeout(()=> res({ ..._myApplication }), 150))
}

export async function uploadMyDocument(file){
  // in real app upload and return URL; here simulate URL by filename
  const url = `https://files.example.com/${encodeURIComponent(file?.name || 'document')}`
  _myApplication.uploadDocuments = url
  _myApplication.updatedAt = now()
  return new Promise((res)=> setTimeout(()=> res({ url }), 200))
}

export default { getMyApplication, updateMyApplication, uploadMyDocument }
