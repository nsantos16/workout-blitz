# Migration `20210110224254`

This migration has been generated at 1/10/2021, 7:42:54 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "ExerciseRoutine" ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "series" INTEGER NOT NULL,
ADD COLUMN     "wight" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210110223655..20210110224254
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
@@ -57,7 +57,11 @@
   excercise         Exercise   @relation(fields: [excerciseId], references: [id])
   excerciseId       Int
   routine           Routine    @relation(fields: [routineId], references: [id])
   routineId         Int
+  reps              Int
+  series            Int
+  wight             Float
+  notes             String
   @@id([excerciseId, routineId])
 }
```


