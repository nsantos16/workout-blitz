import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteRoutineInput = Pick<Prisma.RoutineDeleteArgs, "where">

export default async function deleteRoutine({ where }: DeleteRoutineInput, ctx: Ctx) {
  ctx.session.authorize()

  const routine = await db.routine.delete({ where })

  return routine
}
