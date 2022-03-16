-- AlterTable
ALTER TABLE "Story" ALTER COLUMN "isPublic" SET DEFAULT false;

-- AlterTable
CREATE SEQUENCE "type_id_seq";
ALTER TABLE "Type" ALTER COLUMN "id" SET DEFAULT nextval('type_id_seq');
ALTER SEQUENCE "type_id_seq" OWNED BY "Type"."id";
