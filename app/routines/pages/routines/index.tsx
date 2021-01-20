import { Suspense } from "react"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import cn from "classnames"

import Layout from "app/layouts/Layout"
import getRoutines from "app/routines/queries/getRoutines"

const ITEMS_PER_PAGE = 100

export const RoutinesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ routines, hasMore }] = usePaginatedQuery(getRoutines, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (!routines.length) {
    return (
      <p className="text-sm">
        No routines added{" "}
        <span role="img" aria-label="ball emoji">
          ⚽️
        </span>
      </p>
    )
  }

  return (
    <div>
      <ul className="my-10">
        {routines.map((routine) => (
          <ol key={routine.id}>
            <Link href={`/routines/${routine.id}`}>
              <a className="text-xl hover:underline">{routine.name}</a>
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
  )
}

const RoutinesPage: BlitzPage = () => {
  return (
    <div className={cn("mt-32", "flex", "flex-col", "items-center", "text-center")}>
      <h1 className={cn("text-4xl", "font-semibold")}>
        List of Workout Routines{" "}
        <span role="img" aria-label="notes emoji">
          📝
        </span>
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RoutinesList />
      </Suspense>
      <p>
        <Link href="/routines/new">
          <a className="text-lg flex mt-5">
            <p className="underline hover:text-yellow-400">Create a Workout Routine</p>
            <span role="img" aria-label="routine emoji">
              👟
            </span>
          </a>
        </Link>
      </p>
    </div>
  )
}

RoutinesPage.getLayout = (page) => <Layout title={"Routines"}>{page}</Layout>

export default RoutinesPage
