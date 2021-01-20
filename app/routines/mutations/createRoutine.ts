import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateRoutineInput = Pick<Prisma.RoutineCreateArgs, "data">
export default async function createRoutine({ data }: CreateRoutineInput, ctx: Ctx) {
  ctx.session.authorize()

  const routine = await db.routine.create({ data })

  return routine
}
