import React, { useState,useEffect ,useContext }  from 'react'
import { useRouter } from "next/router";
import Validation from '../forms/validation'
import Alert from '../alerts'

import { AuthContext } from "../../../contexts/AuthContext";

const ResetPassword = ({message = null}) => {
  const [dataReset, setDataReset] = useState(null)
  const router = useRouter();
  const { resetPassword } = useContext(AuthContext);

  const onSubmit = async (data) => {
    console.log(data)
    const {email, password} = data;

    setDataReset(data)

    await resetPassword({ email });
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
  ]
  return (
    <>
      <div className="flex flex-col">
        {dataReset && message && (
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

export default ResetPassword
