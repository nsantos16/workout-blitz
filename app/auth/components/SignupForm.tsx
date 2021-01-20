import React from "react"
import { useMutation } from "blitz"
import cn from "classnames"

import { LabeledTextField } from "app/components/fields/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"

import signup from "app/auth/mutations/signup"
import { SignupInput } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <>
      <h1 className={cn("text-2xl", "mb-10")}>
        Create an Account
        <span role="img" aria-label="Thunder emoji">
          ⚡️
        </span>
      </h1>

      <Form
        submitText="Create Account"
        schema={SignupInput}
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="name" label="Name" placeholder="Name" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </>
  )
}

export default SignupForm
