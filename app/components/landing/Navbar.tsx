import React from "react"

import useModal from "app/hooks/common/useModal"

import Button from "app/components/common/Button"
import Modal from "app/components/common/Modal"
import LoginForm from "app/auth/components/LoginForm"

const Navbar = () => {
  const { isShowing, onToggle } = useModal()

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
        <div className="flex space-x-8">
          <Button
            text="Log in"
            backgroundColor="black"
            textColor="white"
            backgroundHoverColor="white"
            onClick={onToggle}
          />
          <Button text="Sign up" />
        </div>
      </div>
      {isShowing && (
        <Modal>
          <LoginForm onClose={onToggle} />
        </Modal>
      )}
    </>
  )
}

export default Navbar
