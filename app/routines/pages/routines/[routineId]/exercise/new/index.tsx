import { useRouter, useMutation, Link, useParam } from "blitz"
import cn from "classnames"

import Form from "app/components/Form"
import LabeledTextField from "app/components/fields/LabeledTextField"

import CreateExercise from "app/routines/mutations/createExercise"
import { ExerciseInput } from "app/routines/validations"

const CreateExercisePage = () => {
  const router = useRouter()
  const [createExerciseMutation] = useMutation(CreateExercise)
  const routineId = useParam("routineId", "number")
  console.log(routineId)

  return (
    <div className={cn("flex", "flex-col", "items-center", "mt-32", "text-center")}>
      <h1 className={cn("text-4xl", "font-bold")}>Create New Workout Exercise</h1>
      <div className="my-10">
        <Form
          submitText="Create 💪"
          schema={ExerciseInput}
          initialValues={{ name: "", description: "", routineId: routineId }}
          onSubmit={async (values) => {
            try {
              await createExerciseMutation({ ...values, routineId })
              router.push(`/routines/${routineId}`)
            } catch (error) {
              // TODO: Add handler
            }
          }}
        >
          <LabeledTextField name="name" label="Name" placeholder="Name of the exercise" />
          <LabeledTextField name="description" label="Description" placeholder="Description" />
        </Form>
      </div>
      <p>
        <Link href={`/routines/${routineId}`}>
          <a className="flex">
            <div className="pr-1">Back</div> ↩
          </a>
        </Link>
      </p>
    </div>
  )
}

export default CreateExercisePage
