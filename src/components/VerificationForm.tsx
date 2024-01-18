import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form, Input } from '@sone-dao/tone-react-core-ui'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { useEffect, useState } from 'react'

type VerificationFormProps = {
  userEmail: string
  setExperience: Function
  useUserStore: UseUserStore
  api: ToneServiceApi
}

export default function VerificationForm({
  userEmail,
  setExperience,
  useUserStore,
  api,
}: VerificationFormProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isResending, setResending] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    resendEmail()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <span className="font-release text-global text-5xl m-4">tone</span>
      <div className="flex flex-col p-4 rounded-xl border-4 border-global text-global w-full">
        <h3 className="font-header text-2xl font-normal">Verification code</h3>
        <p className="font-content my-2 text-global font-content text-base">
          Whoops, looks like your e-mail is unverified. We just re-sent a
          verification code to your inbox, enter it below to verify your
          address.
        </p>
        <Form className="py-2" onSubmit={(e) => verifyCode(e)}>
          <Input label="code" name="code" value={code} setValue={setCode} />
          {errorMessage && (
            <div className="flex items-center bg-global text-global my-2 p-1 text-small font-header">
              <i className="fa-fw fa-solid fa-exclamation mr-2 text-xl" />
              {errorMessage}
            </div>
          )}
          <Button className="mt-2" isDisabled={code.length !== 6}>
            {isLoading && (
              <i className="fa-fw fa-regular fa-compact-disc fa-spin-pulse mr-1" />
            )}
            Sign Up
          </Button>
        </Form>
        <div className="flex items-center justify-end text-sm">
          Never received an e-mail?
          <button
            type="button"
            className="outline-none bg-global text-global text-sm rounded-xl ml-2 p-1"
            onClick={() => resendEmail()}
          >
            <div className="p-2 border-2 border-global rounded-xl">
              {isResending && (
                <i className="fa-fw fa-solid fa-envelope mr-1 fa-spin-pulse" />
              )}
              Resend
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  async function verifyCode(e: any) {
    setLoading(true)

    const code = e.target.code.value || ''

    return api.user
      .verifyEmail(userEmail, code)
      .then((response) => {
        const { user } = response

        useUserStore.setState({ isLoggedIn: true, userId: user.userId })

        return setExperience('success')
      })
      .catch((error) => setLoading(false))
  }

  async function resendEmail() {
    setResending(true)

    return api.user
      .reverifyEmail(userEmail)
      .then(() => setResending(false))
      .catch(() => setResending(false))
  }
}
