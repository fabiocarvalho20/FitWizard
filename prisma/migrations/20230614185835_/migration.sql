-- CreateTable
CREATE TABLE "UserInput" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserInput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInput_userId_key" ON "UserInput"("userId");

-- AddForeignKey
ALTER TABLE "UserInput" ADD CONSTRAINT "UserInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
