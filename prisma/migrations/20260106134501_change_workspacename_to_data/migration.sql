/*
  Warnings:

  - You are about to drop the column `address` on the `Workspace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[data]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "address",
ADD COLUMN     "data" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_data_key" ON "Workspace"("data");
