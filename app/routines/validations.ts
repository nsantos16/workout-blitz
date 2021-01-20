import * as z from "zod"

export const RoutineInput = z.object({
  name: z.string().min(1),
})
export type RoutineInputType = z.infer<typeof RoutineInput>

export const ExerciseInput = z.object({
  name: z.string().min(1),
  description: z.string(),
  routineId: z.number().optional(),
})
export type ExerciseInputType = z.infer<typeof ExerciseInput>
