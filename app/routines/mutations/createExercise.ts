import { Ctx } from "blitz"
import db from "db"

import { ExerciseInputType } from "app/routines/validations"

export default async function createExercise({ routineId, ...data }: ExerciseInputType, ctx: Ctx) {
  ctx.session.authorize()

  const routine = await db.exercise.create({
    data: { ...data, routine: { connect: { id: routineId } } },
  })

  return routine
}
