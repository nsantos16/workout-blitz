import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import cn from "classnames"

import Layout from "app/layouts/Layout"
import createRoutine from "app/routines/mutations/createRoutine"
import RoutineForm from "app/routines/components/RoutineForm"
import Form from "app/components/Form"
import LabeledTextField from "app/components/fields/LabeledTextField"

import { RoutineInput } from "app/routines/validations"

const NewRoutinePage: BlitzPage = () => {
  const router = useRouter()
  const [createRoutineMutation] = useMutation(createRoutine)

  return (
    <div className={cn("flex", "flex-col", "items-center", "mt-32", "text-center")}>
      <h1 className={cn("text-4xl", "font-bold")}>Create New Routine</h1>
      <div className="my-10">
        <Form
          submitText="Create Routine"
          schema={RoutineInput}
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            try {
              const routine = await createRoutineMutation({ data: values })
              router.push(`/routines/${routine.id}`)
            } catch (error) {
              // TODO: Add handler
            }
          }}
        >
          <LabeledTextField name="name" label="Name" placeholder="Name of the routine" />
        </Form>
      </div>
      <p>
        <Link href="/routines">
          <a className="flex">
            <div className="pr-1">Back</div> ↩
          </a>
        </Link>
      </p>
    </div>
  )
}

NewRoutinePage.getLayout = (page) => <Layout title={"Create New Routine"}>{page}</Layout>

export default NewRoutinePage
