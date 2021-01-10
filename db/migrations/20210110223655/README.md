# Migration `20210110223655`

This migration has been generated at 1/10/2021, 7:36:55 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ADD COLUMN     "age" INTEGER NOT NULL

CREATE TABLE "Routine" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),

    PRIMARY KEY ("id")
)

CREATE TABLE "Exercise" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
)

CREATE TABLE "ExerciseRoutine" (
    "excerciseId" INTEGER NOT NULL,
    "routineId" INTEGER NOT NULL,

    PRIMARY KEY ("excerciseId","routineId")
)

ALTER TABLE "ExerciseRoutine" ADD FOREIGN KEY("excerciseId")REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "ExerciseRoutine" ADD FOREIGN KEY("routineId")REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210110215420..20210110223655
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
@@ -19,8 +19,9 @@
   name           String?
   email          String    @unique
   hashedPassword String?
   role           String    @default("user")
+  age            Int
   sessions       Session[]
 }
 model Session {
@@ -35,4 +36,28 @@
   antiCSRFToken      String?
   publicData         String?
   privateData        String?
 }
+
+model Routine {
+  id                Int         @default(autoincrement()) @id
+  name              String
+  startDate         DateTime    @default(now())
+  endDate           DateTime?
+  routines          ExerciseRoutine[]
+}
+
+model Exercise {
+  id                Int         @default(autoincrement()) @id
+  name              String
+  description       String
+  routines          ExerciseRoutine[]
+}
+
+model ExerciseRoutine {
+  excercise         Exercise   @relation(fields: [excerciseId], references: [id])
+  excerciseId       Int
+  routine           Routine    @relation(fields: [routineId], references: [id])
+  routineId         Int
+  @@id([excerciseId, routineId])
+}
+
```


