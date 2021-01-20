import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetRoutinesInput = Pick<Prisma.FindManyRoutineArgs, "where" | "orderBy" | "skip" | "take">

export default async function getRoutines(
  { where, orderBy, skip = 0, take }: GetRoutinesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const routines = await db.routine.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.routine.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    routines,
    nextPage,
    hasMore,
    count,
  }
}
