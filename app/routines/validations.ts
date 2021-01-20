import * as z from "zod"

export const RoutineInput = z.object({
  name: z.string().min(1),
})
export type RoutineInputType = z.infer<typeof RoutineInput>
