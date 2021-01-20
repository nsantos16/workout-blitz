import { Suspense } from "react"
import { useParam, useQuery, Link } from "blitz"
import cn from "classnames"

import getExercise from "app/routines/queries/getExercise"

const ExerciseInfo = () => {
  const exerciseId = useParam("exerciseId", "number")
  const [exercise] = useQuery(getExercise, { where: { id: exerciseId } })

  return (
    <div>
      <h1 className="text-3xl mb-10">{exercise.name}</h1>
      <div>
        <h4 className="text-xl font-semibold">Description</h4>
        <span>{exercise.description}</span>
      </div>
    </div>
  )
}

const ExerciseList = () => {
  const routineId = useParam("routineId", "number")

  return (
    <div
      className={cn("mt-32", "flex", "flex-col", "justify-center", "items-center", "text-center")}
    >
      <Suspense fallback="Loading...">
        <ExerciseInfo />
      </Suspense>
      <Link href={`/routines/${routineId}`}>
        <a className="mt-10">
          <span className="underline">Back to routine </span>
        </a>
      </Link>
    </div>
  )
}

export default ExerciseList
