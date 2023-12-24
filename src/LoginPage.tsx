import ToneApiService from '@sone-dao/tone-react-api'
import { Carousel } from '@sone-dao/tone-react-core-ui'
import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { useState } from 'react'
import CodeForm from './components/CodeForm'
import EmailForm from './components/EmailForm'
import SuccessBox from './components/SuccessBox'

type LoginPageProps = {
  useUserStore: UseUserStore
  useStyleStore: UseStyleStore
}

export default function LoginPage({
  useUserStore,
  useStyleStore,
}: LoginPageProps) {
  const [loginProgress, setLoginProgress] = useState<number>(0)
  const [userEmail, setUserEmail] = useState<string>('')

  const api = new ToneApiService()
  return (
    <main className="flex items-center justify-center bg-global min-h-screen h-full p-4">
      <div className="flex flex-col items-center w-full max-w-xl">
        <span className="font-release text-global text-5xl m-4">tone</span>
        <Carousel className="w-full" current={loginProgress}>
          <EmailForm
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            setLoginProgress={setLoginProgress}
            api={api}
          />
          <CodeForm
            userEmail={userEmail}
            useUserStore={useUserStore}
            useStyleStore={useStyleStore}
            setLoginProgress={setLoginProgress}
            api={api}
          />
          <SuccessBox />
        </Carousel>
      </div>
    </main>
  )
}
