import { AuthenticationError, useMutation } from "blitz"
import cn from "classnames"

import { LabeledTextField } from "app/components/fields/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"

import login from "app/auth/mutations/login"
import { LoginInput } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <>
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
    </>
  )
}

export default LoginForm
