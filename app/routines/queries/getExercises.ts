import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetExercisesInput = Pick<Prisma.FindManyExerciseArgs, "where" | "orderBy" | "skip" | "take">

export default async function getExercises(
  { where, orderBy, skip = 0, take }: GetExercisesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const exercises = await db.exercise.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.exercise.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    exercises,
    nextPage,
    hasMore,
    count,
  }
}
