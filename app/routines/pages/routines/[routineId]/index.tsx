import { Suspense } from "react"
import {
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  usePaginatedQuery,
} from "blitz"
import cn from "classnames"

import Layout from "app/layouts/Layout"
import getRoutine from "app/routines/queries/getRoutine"
import deleteRoutine from "app/routines/mutations/deleteRoutine"
import getExercises from "app/routines/queries/getExercises"

const ITEMS_PER_PAGE = 100

export const Routine = () => {
  const router = useRouter()
  const routineId = useParam("routineId", "number")
  const page = Number(router.query.page) || 0
  const [{ exercises, hasMore }] = usePaginatedQuery(getExercises, {
    where: { routineId },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const [routine] = useQuery(getRoutine, { where: { id: routineId } })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  const [deleteRoutineMutation] = useMutation(deleteRoutine)

  return (
    <div className={cn("flex", "flex-col", "items-center", "mt-32", "text-center")}>
      <h1 className="text-3xl mb-10">{routine.name}</h1>
      {!exercises.length && (
        <div>
          <p className="text-sm">
            No workout exercises added{" "}
            <span role="img" aria-label="ball emoji">
              ⚽️
            </span>
          </p>
        </div>
      )}
      {exercises && (
        <div>
          <ul className="my-10">
            {exercises.map((exercise) => (
              <ol key={exercise.id}>
                <Link href={`/routines/${routineId}/exercise/${exercise.id}`}>
                  <a className="text-xl hover:underline">{exercise.name}</a>
                </Link>
              </ol>
            ))}
          </ul>
          <button disabled={page === 0} onClick={goToPreviousPage} className="pr-10">
            Previous
          </button>
          <button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </button>
        </div>
      )}
      <Link href={`/routines/${routineId}/exercise/new`}>
        <a className="mb-5">
          <span className="underline">Create Exercise</span>
          <span role="img" aria-label="wave emoji">
            👋
          </span>{" "}
        </a>
      </Link>
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

      <Link href={`/routines`}>
        <a className="flex underline">
          <div className="pr-1">Back to routines</div> ↩
        </a>
      </Link>
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
