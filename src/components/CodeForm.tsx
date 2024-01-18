import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form, Input } from '@sone-dao/tone-react-core-ui'
import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { useState } from 'react'

type CodeFormProps = {
  userEmail: string
  useUserStore: UseUserStore
  useStyleStore: UseStyleStore
  setExperience: Function
  api: ToneServiceApi
}

export default function CodeForm({
  userEmail,
  useUserStore,
  useStyleStore,
  setExperience,
  api,
}: CodeFormProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const styles = useStyleStore()

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <span className="font-release text-global text-5xl m-4">tone</span>
      <div className="flex flex-col p-4 rounded-xl border-4 border-global text-global w-full">
        <h3 className="font-header text-2xl font-normal">Authorization code</h3>
        <p className="font-content my-2 text-global font-content text-base">
          Enter the authorization code sent to your e-mail to login with this
          device.
        </p>
        <Form className="py-2" onSubmit={(e) => verifyCode(e)}>
          <Input label="code" name="code" value={code} setValue={setCode} />
          {errorMessage && (
            <div className="flex items-center bg-global text-global my-2 p-1 text-small font-header">
              <i className="fa-fw fa-solid fa-exclamation mr-2 text-xl" />
              {errorMessage}
            </div>
          )}
          <Button className="mt-4" isDisabled={code.length !== 6}>
            {isLoading && (
              <i className="fa-fw fa-regular fa-compact-disc mr-1 fa-spin-pulse" />
            )}
            Login
          </Button>
        </Form>
      </div>
    </div>
  )

  async function verifyCode(e: any) {
    setLoading(true)

    const code = e.target.code.value || ''

    api.auth
      .verifyCode(userEmail, code)
      .then(async (response) => {
        console.log({ response })

        const { user } = response

        const avatar = await api.user.getAvatar(user.userId)

        const dataURL = avatar ? URL.createObjectURL(avatar) : ''

        if (!user.colors[0] || !user.colors[1]) user.colors = styles.global

        if (!user.display)
          user.display =
            user.userId.substring(0, 4) +
            '...' +
            user.userId.substring(user.userId.length - 4)

        useUserStore.setState({
          isLoggedIn: true,
          userId: user.userId,
          colors: user.colors,
          display: user.display,
          description: user.description,
          socials: user.socials,
          location: user.location,
          avatar: { dataURL },
        })

        useStyleStore.setState({ user: user.colors })

        return setExperience('success')
      })
      .catch((error) => {
        setErrorMessage('Invalid authorization code.')

        return setLoading(false)
      })
  }
}
