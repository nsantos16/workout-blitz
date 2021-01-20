import { Suspense } from "react"
import { useRouter, useMutation } from "blitz"

import useModal from "app/hooks/common/useModal"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"

import Button from "app/components/common/Button"
import Modal from "app/components/common/Modal"
import LoginForm from "app/auth/components/LoginForm"
import SignupForm from "app/auth/components/SignupForm"

const UserInfo = ({ onOpenLogin, onOpenSignUp }) => {
  const { currentUser, session } = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const router = useRouter()

  const onLogout = async () => {
    await logoutMutation()
    router.push("/")
  }

  if (session.isLoading) {
    return <></>
  }

  return (
    <>
      {!currentUser && (
        <div className="flex space-x-8">
          <Button
            text="Log in"
            backgroundColor="black"
            textColor="white"
            backgroundHoverColor="white"
            onClick={onOpenLogin}
          />
          <Button text="Sign up" onClick={onOpenSignUp} />
        </div>
      )}
      {currentUser && (
        <div className="flex space-x-8 items-center">
          <h1 className="text-white pl-0.5">Hi {currentUser.name}!</h1>
          <Button text="Logout" onClick={onLogout} />
        </div>
      )}
    </>
  )
}

const Navbar = () => {
  const { isShowing: isShowingLogin, onToggle: onOpenLogin } = useModal()
  const { isShowing: isShowingSignUp, onToggle: onOpenSignUp } = useModal()

  const router = useRouter()

  const onSuccessLogin = () => {
    router.push("/routines")
    onOpenLogin()
  }

  const onSuccessSignUp = () => {
    router.push("/routines")
    onOpenSignUp()
  }

  return (
    <>
      <div className="z-50 w-full h-20 bg-black fixed flex items-center p-5 mb-2 shadow-lg top-0">
        <div className="text-3xl text-white font-bold tracking-wider flex-1">
          <p className="hidden sm:flex antialiased">
            Workout{" "}
            <span role="img" aria-label="muscle emoji">
              💪
            </span>
          </p>
          <p className="flex sm:hidden antialiased">K.</p>
        </div>
        <Suspense fallback="Loading...">
          <UserInfo onOpenLogin={onOpenLogin} onOpenSignUp={onOpenSignUp} />
        </Suspense>
      </div>
      {isShowingLogin && (
        <Modal onClose={onOpenLogin}>
          <LoginForm onSuccess={onSuccessLogin} />
        </Modal>
      )}
      {isShowingSignUp && (
        <Modal onClose={onOpenSignUp}>
          <SignupForm onSuccess={onSuccessSignUp} />
        </Modal>
      )}
    </>
  )
}

export default Navbar
