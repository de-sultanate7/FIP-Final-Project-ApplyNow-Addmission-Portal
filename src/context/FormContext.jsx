import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export function FormProvider({ children }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      userName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      country: '',
      stateOfOrigin: '',
      lga: '',
      dateOfBirth: '',
      email: '',
      phoneNumber: '',
      address: '',
    },
    guardian: {
      guardianName: '',
      guardianPhoneNumber: '',
      guardianEmail: '',
      guardianAddress: '',
      relationship: '',
    },
    academicAndEssay: {
      lastSchoolAttended: '',
      cgpa: '',
      highestQualification: '',
      intendedProgramOfStudy: '',
      personalEssay: '',
      uploadDocument: '',
    },
    meta: {
      submitted: false,
      status: 'Draft',
      id: null,
      predictedScore: null,
    },
  });

  const update = (section, values) => {
    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], ...values } }));
  };

  const reset = () => {
    setFormData({
      personalInfo: {
        userName: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        country: '',
        stateOfOrigin: '',
        lga: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        address: '',
      },
      guardian: {
        guardianName: '',
        guardianPhoneNumber: '',
        guardianEmail: '',
        guardianAddress: '',
        relationship: '',
      },
      academicAndEssay: {
        lastSchoolAttended: '',
        cgpa: '',
        highestQualification: '',
        intendedProgramOfStudy: '',
        personalEssay: '',
        uploadDocument: '',
      },
      meta: {
        submitted: false,
        status: 'Draft',
        id: null,
        predictedScore: null,
      },
    });
    setStep(0);
  };

  return (
    <FormContext.Provider value={{ step, setStep, formData, update, reset, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
