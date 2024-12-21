import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router'

export const Authenticate = () => {
  const { handlerLogin } = useAuth()
  const navigate = useNavigate()

  const login = async () => {
    handlerLogin().then(() => navigate('/chat'))
  }

  return (
    <div className="h-full w-full flex p-5 justify-center items-center">
      <Button onClick={login} variant='destructive'>Login com Email</Button>
    </div>
  )
}