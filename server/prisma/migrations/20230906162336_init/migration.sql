-- CreateEnum
CREATE TYPE "VehicleState" AS ENUM ('VP', 'DUE', 'ARR', 'DEP', 'ARS', 'PDE', 'PAS', 'WAIT', 'DOO', 'DOC', 'TLR', 'TLA', 'DA', 'DOUT', 'BA', 'BOUT', 'VJA', 'VJOUT');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "state" "VehicleState" NOT NULL,
    "description" TEXT,
    "operator" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "vehicleTime" TIMESTAMP(3) NOT NULL,
    "speed" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "acceleration" DOUBLE PRECISION,
    "scheduleOffset" DOUBLE PRECISION,
    "odometer" DOUBLE PRECISION,
    "doorStatus" INTEGER,
    "start" TEXT,
    "stoppedAt" INTEGER,
    "route" TEXT,
    "occupancy" INTEGER,
    "arrival" TIMESTAMP(3),
    "departure" TIMESTAMP(3),

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "latitudeStart" DOUBLE PRECISION,
    "longitudeStart" DOUBLE PRECISION,
    "latitudeEnd" DOUBLE PRECISION,
    "longitudeEnd" DOUBLE PRECISION,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_id_key" ON "Vehicle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");
