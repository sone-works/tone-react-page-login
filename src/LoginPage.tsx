import ToneApiService from '@sone-dao/tone-react-api'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { useState } from 'react'
import CodeForm from './components/CodeForm'
import EmailForm from './components/EmailForm'
import SuccessBox from './components/SuccessBox'
import VerificationForm from './components/VerificationForm'

type LoginPageProps = {
  useUserStore: UseUserStore
}

export default function LoginPage({ useUserStore }: LoginPageProps) {
  const [experience, setExperience] = useState<string>('email')

  const [userEmail, setUserEmail] = useState<string>('')

  const api = new ToneApiService()

  switch (experience) {
    case 'email':
      return (
        <EmailForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setExperience={setExperience}
          api={api}
        />
      )
    case 'code':
      return (
        <CodeForm
          userEmail={userEmail}
          useUserStore={useUserStore}
          setExperience={setExperience}
          api={api}
        />
      )
    case 'verification':
      return (
        <VerificationForm
          userEmail={userEmail}
          setExperience={setExperience}
          useUserStore={useUserStore}
          api={api}
        />
      )
    case 'success':
      return <SuccessBox />
    default:
      return (
        <EmailForm
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setExperience={setExperience}
          api={api}
        />
      )
  }
}
