# Migration `20210120055415`

This migration has been generated at 1/20/2021, 2:54:15 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "ExerciseRoutine" DROP CONSTRAINT "ExerciseRoutine_excerciseId_fkey"

ALTER TABLE "ExerciseRoutine" DROP CONSTRAINT "ExerciseRoutine_routineId_fkey"

ALTER TABLE "Exercise" ADD COLUMN     "routineId" INTEGER NOT NULL

DROP TABLE "ExerciseRoutine"

ALTER TABLE "Exercise" ADD FOREIGN KEY("routineId")REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210118141930..20210120055415
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -37,30 +37,18 @@
   privateData        String?
 }
 model Routine {
-  id        Int               @id @default(autoincrement())
+  id        Int        @id @default(autoincrement())
   name      String
-  startDate DateTime          @default(now())
+  startDate DateTime   @default(now())
   endDate   DateTime?
-  routines  ExerciseRoutine[]
+  routines  Exercise[]
 }
 model Exercise {
-  id          Int               @id @default(autoincrement())
+  id          Int     @id @default(autoincrement())
   name        String
   description String
-  routines    ExerciseRoutine[]
-}
-
-model ExerciseRoutine {
-  excercise   Exercise @relation(fields: [excerciseId], references: [id])
-  excerciseId Int
-  routine     Routine  @relation(fields: [routineId], references: [id])
+  routine     Routine @relation(fields: [routineId], references: [id])
   routineId   Int
-  reps        Int
-  series      Int
-  wight       Float
-  notes       String
-
-  @@id([excerciseId, routineId])
 }
```


