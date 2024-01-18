import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

export default function SuccessBox() {
  const [count, { startCountdown }] = useCountdown({
    countStart: 5,
    intervalMs: 1000,
  })

  const router = useRouter()

  useEffect(() => {
    startCountdown()
  }, [])

  count == 0 && router.push('/')

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <span className="font-release text-global text-5xl m-4">tone</span>
      <div className="flex flex-col p-4 rounded-xl border-4 border-global text-global w-full">
        <h2 className="font-header text-3xl">All logged in...</h2>
        <div className="font-content text-base">
          <p>We've successfully logged you in to Tone.</p>
          <p className="mt-2">
            Redirecting back to the home page{' '}
            {count ? (
              <>
                in {count} second
                {count > 1 && 's'}...
              </>
            ) : (
              <>now...</>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
