import { AuthenticationError, Link, useMutation } from "blitz"
import cn from "classnames"
import Image from "next/image"

import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"

import login from "app/auth/mutations/login"
import { LoginInput } from "app/auth/validations"
import useKeyboardEvent from "app/hooks/ux/useKeyboardEvent"

type LoginFormProps = {
  onSuccess?: () => void
  onClose?: () => void
}

export const LoginForm = ({ onSuccess, onClose }: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  useKeyboardEvent("Escape", onClose)

  return (
    <div className={cn("flex", "flex-col", "content-center", "items-center", "mx-10", "my-10")}>
      <button onClick={onClose} className={cn("fixed", "top-2", "right-4")}>
        <Image src="/close.png" alt="Close modal" width="12" height="12" />
      </button>
      <h1 className={cn("text-3xl", "mb-10")}>
        Welcome back
        <span role="img" aria-label="gym emoji">
          🏋️‍♀️
        </span>
      </h1>
      <Form
        submitText="Login"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

export default LoginForm
