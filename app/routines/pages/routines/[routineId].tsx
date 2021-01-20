import { Suspense } from "react"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import cn from "classnames"

import Layout from "app/layouts/Layout"
import getRoutine from "app/routines/queries/getRoutine"
import deleteRoutine from "app/routines/mutations/deleteRoutine"
import getExercises from "app/routines/queries/getExercises"

export const Routine = () => {
  const router = useRouter()
  const routineId = useParam("routineId", "number")
  const [routine] = useQuery(getRoutine, { where: { id: routineId } })
  const [exercisesInfo] = useQuery(getExercises, { where: { routineId } })

  const [deleteRoutineMutation] = useMutation(deleteRoutine)

  return (
    <div className={cn("flex", "flex-col", "items-center", "mt-32")}>
      <h1 className="text-3xl mb-10">{routine.name}</h1>
      {console.log(exercisesInfo)}
      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteRoutineMutation({ where: { id: routine.id } })
            router.push("/routines")
          }
        }}
      >
        <span className="underline">Delete Routine</span>
        <span role="img" aria-label="wave emoji">
          👋
        </span>
      </button>
    </div>
  )
}

const ShowRoutinePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/routines">
          <a>Routines</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Routine />
      </Suspense>
    </div>
  )
}

ShowRoutinePage.getLayout = (page) => <Layout title={"Routine"}>{page}</Layout>

export default ShowRoutinePage
