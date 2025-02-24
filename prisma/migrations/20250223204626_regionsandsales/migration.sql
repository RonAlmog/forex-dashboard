-- CreateTable
CREATE TABLE "salesreps" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "salesreps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);
