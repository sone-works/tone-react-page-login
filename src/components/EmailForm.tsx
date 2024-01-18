import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form, Input } from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'

type EmailFormProps = {
  userEmail: string
  setUserEmail: Function
  setExperience: Function
  api: ToneServiceApi
}

export default function EmailForm({
  userEmail,
  setUserEmail,
  setExperience,
  api,
}: EmailFormProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <span className="font-release text-global text-5xl m-4">tone</span>
      <div className="flex flex-col p-4 rounded-xl border-4 border-global text-global w-full">
        <h2 className="font-header text-3xl">Login</h2>
        <p className="font-content my-2 font-normal text-base">
          Enter your email below to be a sent a one time code to login with this
          device.
        </p>
        <Form className="py-2" onSubmit={() => sendAuthEmail()}>
          <Input label="email" value={userEmail} setValue={setUserEmail} />
          {errorMessage && (
            <div className="flex items-center bg-global text-global my-2 p-2 text-small font-header">
              <i className="fa-fw fa-solid fa-exclamation mr-2 text-xl" />
              {errorMessage}
            </div>
          )}
          <Button className="pt-2" isDisabled={!userEmail ? true : false}>
            {isLoading && (
              <i className="fa-fw fa-regular fa-compact-disc mr-1 fa-spin-pulse" />
            )}
            Send Code
          </Button>
        </Form>
      </div>
    </div>
  )

  async function sendAuthEmail() {
    setLoading(true)

    return api.auth
      .sendAuthEmail(userEmail)
      .then((response) => setExperience('code'))
      .catch((error) => {
        console.log({ error })
        if (error.message == 'UNVERIFIED_EMAIL') {
          setExperience('verification')
        }

        setErrorMessage('Invalid e-mail address.')

        return setLoading(false)
      })
  }
}
