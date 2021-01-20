# Migration `20210120060751`

This migration has been generated at 1/20/2021, 3:07:51 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_routineId_fkey"

CREATE TABLE "Workout" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "routineId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
)

DROP TABLE "Exercise"

ALTER TABLE "Workout" ADD FOREIGN KEY("routineId")REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210120055415..20210120060751
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
-  id        Int        @id @default(autoincrement())
+  id        Int       @id @default(autoincrement())
   name      String
-  startDate DateTime   @default(now())
+  startDate DateTime  @default(now())
   endDate   DateTime?
-  routines  Exercise[]
+  routines  Workout[]
 }
-model Exercise {
+model Workout {
   id          Int     @id @default(autoincrement())
   name        String
   description String
   routine     Routine @relation(fields: [routineId], references: [id])
```


