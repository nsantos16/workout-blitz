import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateRoutineInput = Pick<Prisma.RoutineUpdateArgs, "where" | "data">

export default async function updateRoutine({ where, data }: UpdateRoutineInput, ctx: Ctx) {
  ctx.session.authorize()

  const routine = await db.routine.update({ where, data })

  return routine
}
