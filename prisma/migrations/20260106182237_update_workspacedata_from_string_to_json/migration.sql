/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `data` on the `Workspace` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Workspace_data_key";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "data",
ADD COLUMN     "data" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_id_key" ON "Workspace"("id");
