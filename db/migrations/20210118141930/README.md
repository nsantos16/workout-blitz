# Migration `20210118141930`

This migration has been generated at 1/18/2021, 11:19:30 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" DROP COLUMN "age"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210110224254..20210118141930
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
@@ -12,21 +12,20 @@
 // --------------------------------------
 model User {
-  id             Int       @default(autoincrement()) @id
+  id             Int       @id @default(autoincrement())
   createdAt      DateTime  @default(now())
   updatedAt      DateTime  @updatedAt
   name           String?
   email          String    @unique
   hashedPassword String?
   role           String    @default("user")
-  age            Int
   sessions       Session[]
 }
 model Session {
-  id                 Int       @default(autoincrement()) @id
+  id                 Int       @id @default(autoincrement())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   expiresAt          DateTime?
   handle             String    @unique
@@ -38,30 +37,30 @@
   privateData        String?
 }
 model Routine {
-  id                Int         @default(autoincrement()) @id
-  name              String
-  startDate         DateTime    @default(now())
-  endDate           DateTime?
-  routines          ExerciseRoutine[]
+  id        Int               @id @default(autoincrement())
+  name      String
+  startDate DateTime          @default(now())
+  endDate   DateTime?
+  routines  ExerciseRoutine[]
 }
 model Exercise {
-  id                Int         @default(autoincrement()) @id
-  name              String
-  description       String
-  routines          ExerciseRoutine[]
+  id          Int               @id @default(autoincrement())
+  name        String
+  description String
+  routines    ExerciseRoutine[]
 }
 model ExerciseRoutine {
-  excercise         Exercise   @relation(fields: [excerciseId], references: [id])
-  excerciseId       Int
-  routine           Routine    @relation(fields: [routineId], references: [id])
-  routineId         Int
-  reps              Int
-  series            Int
-  wight             Float
-  notes             String
+  excercise   Exercise @relation(fields: [excerciseId], references: [id])
+  excerciseId Int
+  routine     Routine  @relation(fields: [routineId], references: [id])
+  routineId   Int
+  reps        Int
+  series      Int
+  wight       Float
+  notes       String
+
   @@id([excerciseId, routineId])
 }
-
```


