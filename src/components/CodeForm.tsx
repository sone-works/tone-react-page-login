import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form, Input } from '@sone-dao/tone-react-core-ui'
import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type CodeFormProps = {
  userEmail: string
  useUserStore: UseUserStore
  useStyleStore: UseStyleStore
  setLoginProgress: Function
  api: ToneServiceApi
}

export default function CodeForm({
  userEmail,
  useUserStore,
  useStyleStore,
  setLoginProgress,
  api,
}: CodeFormProps) {
  const [isLoading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  return (
    <div className="p-4 rounded-xl bg-global-flipped text-global-flipped w-full">
      <h3 className="font-header text-2xl font-normal">Verification code</h3>
      <p className="font-content my-2 text-global-flipped font-content text-base">
        Enter the code sent to your e-mail just now to login on this device.
      </p>
      <Form className="py-2" onSubmit={(e) => verifyCode(e)}>
        <Input label="code" name="code" />
        <Button className="mt-4">
          {isLoading && (
            <i className="fa-fw fa-regular fa-compact-disc mr-1 fa-spin-pulse" />
          )}
          Sign Up
        </Button>
      </Form>
    </div>
  )

  async function verifyCode(e: any) {
    setLoading(true)

    const code = e.target.code.value || ''

    return api.auth
      .verifyCode(userEmail, code)
      .then(async (response) => {
        const { user } = response

        const avatar = await api.user.getAvatar(user.userId)

        const dataURL = (avatar && URL.createObjectURL(avatar)) || ''

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

        setLoginProgress(2)
      })
      .catch((error) => {
        setLoading(false)

        console.log({ error })
      })
  }
}
