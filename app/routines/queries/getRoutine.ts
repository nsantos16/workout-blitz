import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetRoutineInput = Pick<Prisma.FindFirstRoutineArgs, "where">

export default async function getRoutine({ where }: GetRoutineInput, ctx: Ctx) {
  ctx.session.authorize()

  const routine = await db.routine.findFirst({ where })

  if (!routine) throw new NotFoundError()

  return routine
}
