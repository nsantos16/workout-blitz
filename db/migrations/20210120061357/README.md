# Migration `20210120061357`

This migration has been generated at 1/20/2021, 3:13:57 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_routineId_fkey"

CREATE TABLE "Exercise" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "routineId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

DROP TABLE "Workout"

ALTER TABLE "Exercise" ADD FOREIGN KEY("routineId")REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210120060751..20210120061357
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
@@ -37,16 +37,16 @@
   privateData        String?
 }
 model Routine {
-  id        Int       @id @default(autoincrement())
+  id        Int        @id @default(autoincrement())
   name      String
-  startDate DateTime  @default(now())
+  startDate DateTime   @default(now())
   endDate   DateTime?
-  routines  Workout[]
+  routines  Exercise[]
 }
-model Workout {
+model Exercise {
   id          Int     @id @default(autoincrement())
   name        String
   description String
   routine     Routine @relation(fields: [routineId], references: [id])
```


