import React, { useState,useEffect ,useContext }  from 'react'
import { useRouter } from "next/router";
import Validation from '../forms/validation'
import Alert from '../alerts'

import { AuthContext } from "../../../contexts/AuthContext";



const CreateAccount = ({message = null}) => {
  const [dataAccount, setDataAccount] = useState(null)
  const router = useRouter();
  const { signUp } = useContext(AuthContext);

  const onSubmit = async (data) => {
    console.log(data)
    const {email, password} = data;



    setDataAccount(data)

    await signUp({ email, password });
    router.push('/');
  }

  let items = [
    {
      label: 'Email',
      error: {required: 'Please enter a valid email'},
      name: 'email',
      type: 'email',
      placeholder: 'Enter you email'
    },
    {
      label: 'Password',
      error: {
        required: 'Password is required',
        minLength: {
          value: 4,
          message: 'Your password should have at least 4 characters'
        }
      },
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password'
    },
    {
      label: null,
      error: {
        required: 'Please agree to our terms of service'
      },
      name: 'terms',
      type: 'checkbox',
      options: [{value: true, label: 'I agree to the terms of service'}]
    },
    {
      label: null,
      error: {
        required: 'Please agree to our privacy policy'
      },
      name: 'privacy-policy',
      type: 'checkbox',
      options: [{value: true, label: 'I agree to the privacy policy'}]
    },
  ]
  return (
    <>
      <div className="flex flex-col">
        {dataAccount && message && (
          <div className="w-full mb-4">
            <Alert
              color="bg-transparent border-green-500 text-green-500"
              borderLeft
              raised>
              {message}
            </Alert>
          </div>
        )}
        <Validation items={items} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export default CreateAccount
