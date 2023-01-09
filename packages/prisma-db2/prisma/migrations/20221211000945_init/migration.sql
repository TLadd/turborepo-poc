-- CreateTable
CREATE TABLE "create_card" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "template" VARCHAR,
    "site_id" UUID NOT NULL,

    CONSTRAINT "create_card_pkey" PRIMARY KEY ("id")
);
