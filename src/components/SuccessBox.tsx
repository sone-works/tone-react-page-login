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
    <div className="p-4 rounded-xl bg-global-flipped text-global-flipped w-full my-4">
      <h4 className="font-header text-global-flipped text-2xl mb-2">
        All logged in...
      </h4>
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
  )
}
