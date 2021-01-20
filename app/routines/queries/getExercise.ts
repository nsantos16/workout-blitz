import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetExerciseInput = Pick<Prisma.FindFirstExerciseArgs, "where">

export default async function getExercise({ where }: GetExerciseInput, ctx: Ctx) {
  ctx.session.authorize()

  const exercise = await db.exercise.findFirst({ where })

  if (!exercise) throw new NotFoundError()

  return exercise
}
