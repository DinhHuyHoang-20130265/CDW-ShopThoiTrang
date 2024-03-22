/*
 Navicat Premium Data Transfer

 Source Server         : hine
 Source Server Type    : PostgreSQL
 Source Server Version : 160002 (160002)
 Source Host           : localhost:8088
 Source Catalog        : shop2h
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160002 (160002)
 File Encoding         : 65001

 Date: 22/03/2024 23:50:20
*/


-- ----------------------------
-- Sequence structure for categories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."categories_id_seq";
CREATE SEQUENCE "public"."categories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for img_product_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."img_product_id_seq";
CREATE SEQUENCE "public"."img_product_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for import_invoices_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."import_invoices_id_seq";
CREATE SEQUENCE "public"."import_invoices_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for log_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."log_id_seq";
CREATE SEQUENCE "public"."log_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for order_detail_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."order_detail_id_seq";
CREATE SEQUENCE "public"."order_detail_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for orders_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orders_id_seq";
CREATE SEQUENCE "public"."orders_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for permissions_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."permissions_id_seq";
CREATE SEQUENCE "public"."permissions_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for price_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."price_id_seq";
CREATE SEQUENCE "public"."price_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for product_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_id_seq";
CREATE SEQUENCE "public"."product_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for promotion_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."promotion_id_seq";
CREATE SEQUENCE "public"."promotion_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for refreshtoken_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."refreshtoken_seq";
CREATE SEQUENCE "public"."refreshtoken_seq" 
INCREMENT 50
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for roles_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."roles_id_seq";
CREATE SEQUENCE "public"."roles_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for size_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."size_id_seq";
CREATE SEQUENCE "public"."size_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for user_info_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_info_id_seq";
CREATE SEQUENCE "public"."user_info_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for variation_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."variation_id_seq";
CREATE SEQUENCE "public"."variation_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
  "id" int8 NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "parent_id" int8,
  "released_date" date,
  "status" bool DEFAULT true,
  "updated_date" date,
  "released_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO "public"."categories" VALUES (1, 'Áo Thun', NULL, NULL, 't', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (2, 'Áo Sơ Mi', NULL, NULL, 't', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (3, 'Áo Khoác', NULL, NULL, 't', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (4, 'Quần Short', NULL, NULL, 't', NULL, NULL, NULL);
INSERT INTO "public"."categories" VALUES (5, 'Quần Dài', NULL, NULL, 't', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for img_product
-- ----------------------------
DROP TABLE IF EXISTS "public"."img_product";
CREATE TABLE "public"."img_product" (
  "id" int8 NOT NULL DEFAULT nextval('img_product_id_seq'::regclass),
  "released_date" date,
  "updated_date" date,
  "img_url" varchar(255) COLLATE "pg_catalog"."default",
  "product_id" int8,
  "released_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of img_product
-- ----------------------------
INSERT INTO "public"."img_product" VALUES (1, NULL, NULL, 'img111.png', 1, NULL, NULL);
INSERT INTO "public"."img_product" VALUES (2, NULL, NULL, 'img1.png', 1, NULL, NULL);

-- ----------------------------
-- Table structure for import_invoices
-- ----------------------------
DROP TABLE IF EXISTS "public"."import_invoices";
CREATE TABLE "public"."import_invoices" (
  "id" int8 NOT NULL DEFAULT nextval('import_invoices_id_seq'::regclass),
  "import_date" varchar(255) COLLATE "pg_catalog"."default",
  "import_price" float8,
  "quantity" int4 NOT NULL,
  "product_id" int8,
  "variation_id" int8
)
;

-- ----------------------------
-- Records of import_invoices
-- ----------------------------

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS "public"."log";
CREATE TABLE "public"."log" (
  "id" int8 NOT NULL DEFAULT nextval('log_id_seq'::regclass),
  "action" varchar(255) COLLATE "pg_catalog"."default",
  "created_date" varchar(255) COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "ip_adress" varchar(255) COLLATE "pg_catalog"."default",
  "user_id" int8
)
;

-- ----------------------------
-- Records of log
-- ----------------------------

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS "public"."order_detail";
CREATE TABLE "public"."order_detail" (
  "id" int8 NOT NULL DEFAULT nextval('order_detail_id_seq'::regclass),
  "amount" float8 NOT NULL,
  "price" float8 NOT NULL,
  "quantity" int4 NOT NULL,
  "order_id" int8,
  "product_id" int8
)
;

-- ----------------------------
-- Records of order_detail
-- ----------------------------

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS "public"."orders";
CREATE TABLE "public"."orders" (
  "id" int8 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
  "order_date" date,
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "note" varchar(255) COLLATE "pg_catalog"."default",
  "phone" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "user_id" int8
)
;

-- ----------------------------
-- Records of orders
-- ----------------------------

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS "public"."permissions";
CREATE TABLE "public"."permissions" (
  "id" int8 NOT NULL DEFAULT nextval('permissions_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO "public"."permissions" VALUES (1, 'USER_UPDATE');
INSERT INTO "public"."permissions" VALUES (2, 'USER_DELETE');

-- ----------------------------
-- Table structure for price
-- ----------------------------
DROP TABLE IF EXISTS "public"."price";
CREATE TABLE "public"."price" (
  "id" int8 NOT NULL DEFAULT nextval('price_id_seq'::regclass),
  "price" float8 NOT NULL,
  "updated_date" date,
  "product_id" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of price
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS "public"."product";
CREATE TABLE "public"."product" (
  "id" int8 NOT NULL DEFAULT nextval('product_id_seq'::regclass),
  "content" text COLLATE "pg_catalog"."default",
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "img_url" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "released_date" date,
  "status" bool NOT NULL,
  "updated_date" date,
  "released_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO "public"."product" VALUES (1, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img1.png', 'Venti Logo Tee', '2024-03-19', 't', '2024-03-19', 1, 1);
INSERT INTO "public"."product" VALUES (6, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img6.png', 'Mixer Boxy Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (7, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img7.png', 'Cake Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (3, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img3.png', 'Dumb Heart Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (9, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img9.png', 'Metal Shirt', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (5, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img5.png', 'Dragowl Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (2, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img2.png', 'Color Icons Tee', '2024-03-19', 't', '2024-03-19', 1, 1);
INSERT INTO "public"."product" VALUES (18, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img18.png', 'EMBROIDERY BASIC KHAKI SHORT', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (20, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img20.png', 'Metal Dress Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (15, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img15.png', 'Leather Varsity', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (14, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img14.png', 'Basic Sweater V1.0', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (13, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img13.png', 'SIGNATURE ZIPPER HOODIE', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (11, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img11.png', 'Line Track Jacket', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (12, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img12.png', 'Double Front Jacket', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (17, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img17.png', '2Boxes Khaki Short', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (16, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img16.png', 'Basic Short SS2', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (19, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img19.png', 'Balloon Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (8, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img8.png', 'Short-sleeve Oxford Shirt', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (10, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img10.png', 'Curves Jacket', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (4, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img4.png', 'Crewman Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (23, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img23.png', 'Sidelines Parachute Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (22, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img22.png', 'Hindless Track Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (24, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img24.png', 'Folded Parachute Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (21, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img21.png', 'Para Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL);
INSERT INTO "public"."product" VALUES (25, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚
NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'img25.png', 'SIGNATURE DRESS PANTS', '2024-03-19', 't', '2024-03-19', NULL, NULL);

-- ----------------------------
-- Table structure for product_categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_categories";
CREATE TABLE "public"."product_categories" (
  "product_id" int8 NOT NULL,
  "cate_id" int8 NOT NULL
)
;

-- ----------------------------
-- Records of product_categories
-- ----------------------------
INSERT INTO "public"."product_categories" VALUES (1, 1);
INSERT INTO "public"."product_categories" VALUES (2, 1);
INSERT INTO "public"."product_categories" VALUES (3, 1);
INSERT INTO "public"."product_categories" VALUES (4, 1);
INSERT INTO "public"."product_categories" VALUES (5, 1);
INSERT INTO "public"."product_categories" VALUES (6, 1);
INSERT INTO "public"."product_categories" VALUES (7, 1);
INSERT INTO "public"."product_categories" VALUES (8, 2);
INSERT INTO "public"."product_categories" VALUES (9, 2);
INSERT INTO "public"."product_categories" VALUES (10, 3);
INSERT INTO "public"."product_categories" VALUES (11, 3);
INSERT INTO "public"."product_categories" VALUES (12, 3);
INSERT INTO "public"."product_categories" VALUES (13, 3);
INSERT INTO "public"."product_categories" VALUES (14, 3);
INSERT INTO "public"."product_categories" VALUES (15, 3);
INSERT INTO "public"."product_categories" VALUES (16, 4);
INSERT INTO "public"."product_categories" VALUES (17, 4);
INSERT INTO "public"."product_categories" VALUES (18, 4);
INSERT INTO "public"."product_categories" VALUES (19, 5);
INSERT INTO "public"."product_categories" VALUES (20, 5);
INSERT INTO "public"."product_categories" VALUES (21, 5);
INSERT INTO "public"."product_categories" VALUES (22, 5);
INSERT INTO "public"."product_categories" VALUES (23, 5);
INSERT INTO "public"."product_categories" VALUES (24, 5);
INSERT INTO "public"."product_categories" VALUES (25, 5);

-- ----------------------------
-- Table structure for product_promotion
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_promotion";
CREATE TABLE "public"."product_promotion" (
  "product_id" int8 NOT NULL,
  "promotion_id" int8 NOT NULL
)
;

-- ----------------------------
-- Records of product_promotion
-- ----------------------------
INSERT INTO "public"."product_promotion" VALUES (1, 2);
INSERT INTO "public"."product_promotion" VALUES (2, 2);
INSERT INTO "public"."product_promotion" VALUES (6, 2);

-- ----------------------------
-- Table structure for promotion
-- ----------------------------
DROP TABLE IF EXISTS "public"."promotion";
CREATE TABLE "public"."promotion" (
  "id" int8 NOT NULL DEFAULT nextval('promotion_id_seq'::regclass),
  "created_date" date,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "discount" int4 NOT NULL,
  "end_date" date,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "start_date" date,
  "status" bool NOT NULL,
  "thumbnail" varchar(255) COLLATE "pg_catalog"."default",
  "updated_date" date,
  "created_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of promotion
-- ----------------------------
INSERT INTO "public"."promotion" VALUES (2, '2024-03-14', NULL, 40, '2024-03-23', 'Khuyến mãi hè', '2024-03-21', 't', 'img1.png', NULL, 1, NULL);

-- ----------------------------
-- Table structure for refreshtoken
-- ----------------------------
DROP TABLE IF EXISTS "public"."refreshtoken";
CREATE TABLE "public"."refreshtoken" (
  "id" int8 NOT NULL,
  "expiry_date" timestamptz(6) NOT NULL,
  "token" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of refreshtoken
-- ----------------------------
INSERT INTO "public"."refreshtoken" VALUES (102, '2024-03-22 13:39:14.04394+07', '9a0d1ad7-59b1-45c1-91d5-e1a7f3598969');
INSERT INTO "public"."refreshtoken" VALUES (103, '2024-03-22 13:40:29.307249+07', '09473930-cc1e-440a-9ed9-4ee397f9f530');
INSERT INTO "public"."refreshtoken" VALUES (152, '2024-03-22 13:43:36.722125+07', '9b88bcec-68ce-4897-b81a-923c870ef146');
INSERT INTO "public"."refreshtoken" VALUES (202, '2024-03-22 13:45:13.068969+07', '62dfe6ce-131d-4d18-801d-00809daa0c54');
INSERT INTO "public"."refreshtoken" VALUES (252, '2024-03-22 23:43:30.398885+07', 'e8e071c6-cfb4-4751-b682-e20469778770');

-- ----------------------------
-- Table structure for role_permissions
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_permissions";
CREATE TABLE "public"."role_permissions" (
  "role_id" int8 NOT NULL,
  "permission_id" int8 NOT NULL
)
;

-- ----------------------------
-- Records of role_permissions
-- ----------------------------
INSERT INTO "public"."role_permissions" VALUES (2, 1);
INSERT INTO "public"."role_permissions" VALUES (2, 2);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles";
CREATE TABLE "public"."roles" (
  "id" int8 NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO "public"."roles" VALUES (1, 'USER');
INSERT INTO "public"."roles" VALUES (2, 'ADMIN');
INSERT INTO "public"."roles" VALUES (3, 'ADMIN');

-- ----------------------------
-- Table structure for roles_users
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles_users";
CREATE TABLE "public"."roles_users" (
  "user_id" int8 NOT NULL,
  "role_id" int8 NOT NULL
)
;

-- ----------------------------
-- Records of roles_users
-- ----------------------------
INSERT INTO "public"."roles_users" VALUES (1, 1);
INSERT INTO "public"."roles_users" VALUES (2, 2);

-- ----------------------------
-- Table structure for size
-- ----------------------------
DROP TABLE IF EXISTS "public"."size";
CREATE TABLE "public"."size" (
  "id" int8 NOT NULL DEFAULT nextval('size_id_seq'::regclass),
  "released_date" date,
  "size" varchar(255) COLLATE "pg_catalog"."default",
  "status" bool NOT NULL DEFAULT true,
  "stock" int4,
  "updated_date" date,
  "released_by" int8,
  "updated_by" int8,
  "variation_id" int8
)
;

-- ----------------------------
-- Records of size
-- ----------------------------
INSERT INTO "public"."size" VALUES (4, NULL, 'M', 't', 5, NULL, NULL, NULL, 1);
INSERT INTO "public"."size" VALUES (5, NULL, 'L', 't', 5, NULL, NULL, NULL, 1);
INSERT INTO "public"."size" VALUES (6, NULL, 'XL', 't', 5, NULL, NULL, NULL, 1);
INSERT INTO "public"."size" VALUES (7, NULL, 'S', 't', 5, NULL, NULL, NULL, 2);
INSERT INTO "public"."size" VALUES (8, NULL, 'M', 't', 5, NULL, NULL, NULL, 2);
INSERT INTO "public"."size" VALUES (9, NULL, 'L', 't', 5, NULL, NULL, NULL, 2);
INSERT INTO "public"."size" VALUES (10, NULL, 'XL', 't', 5, NULL, NULL, NULL, 2);
INSERT INTO "public"."size" VALUES (11, NULL, 'S', 't', 5, NULL, NULL, NULL, 3);
INSERT INTO "public"."size" VALUES (12, NULL, 'M', 't', 5, NULL, NULL, NULL, 3);
INSERT INTO "public"."size" VALUES (13, NULL, 'L', 't', 5, NULL, NULL, NULL, 3);
INSERT INTO "public"."size" VALUES (14, NULL, 'XL', 't', 5, NULL, NULL, NULL, 3);
INSERT INTO "public"."size" VALUES (15, NULL, 'S', 't', 5, NULL, NULL, NULL, 4);
INSERT INTO "public"."size" VALUES (16, NULL, 'M', 't', 5, NULL, NULL, NULL, 4);
INSERT INTO "public"."size" VALUES (17, NULL, 'L', 't', 5, NULL, NULL, NULL, 4);
INSERT INTO "public"."size" VALUES (18, NULL, 'XL', 't', 5, NULL, NULL, NULL, 4);
INSERT INTO "public"."size" VALUES (19, NULL, 'S', 't', 5, NULL, NULL, NULL, 5);
INSERT INTO "public"."size" VALUES (20, NULL, 'M', 't', 5, NULL, NULL, NULL, 5);
INSERT INTO "public"."size" VALUES (21, NULL, 'L', 't', 5, NULL, NULL, NULL, 5);
INSERT INTO "public"."size" VALUES (22, NULL, 'XL', 't', 5, NULL, NULL, NULL, 5);
INSERT INTO "public"."size" VALUES (23, NULL, 'S', 't', 5, NULL, NULL, NULL, 6);
INSERT INTO "public"."size" VALUES (24, NULL, 'M', 't', 5, NULL, NULL, NULL, 6);
INSERT INTO "public"."size" VALUES (25, NULL, 'L', 't', 5, NULL, NULL, NULL, 6);
INSERT INTO "public"."size" VALUES (26, NULL, 'XL', 't', 5, NULL, NULL, NULL, 6);
INSERT INTO "public"."size" VALUES (27, NULL, 'S', 't', 5, NULL, NULL, NULL, 7);
INSERT INTO "public"."size" VALUES (28, NULL, 'M', 't', 5, NULL, NULL, NULL, 7);
INSERT INTO "public"."size" VALUES (29, NULL, 'L', 't', 5, NULL, NULL, NULL, 7);
INSERT INTO "public"."size" VALUES (30, NULL, 'XL', 't', 5, NULL, NULL, NULL, 7);
INSERT INTO "public"."size" VALUES (31, NULL, 'S', 't', 5, NULL, NULL, NULL, 8);
INSERT INTO "public"."size" VALUES (32, NULL, 'M', 't', 5, NULL, NULL, NULL, 8);
INSERT INTO "public"."size" VALUES (33, NULL, 'L', 't', 5, NULL, NULL, NULL, 8);
INSERT INTO "public"."size" VALUES (34, NULL, 'XL', 't', 5, NULL, NULL, NULL, 8);
INSERT INTO "public"."size" VALUES (35, NULL, 'S', 't', 5, NULL, NULL, NULL, 9);
INSERT INTO "public"."size" VALUES (36, NULL, 'M', 't', 5, NULL, NULL, NULL, 9);
INSERT INTO "public"."size" VALUES (37, NULL, 'L', 't', 5, NULL, NULL, NULL, 9);
INSERT INTO "public"."size" VALUES (38, NULL, 'XL', 't', 5, NULL, NULL, NULL, 9);
INSERT INTO "public"."size" VALUES (39, NULL, 'S', 't', 4, NULL, NULL, NULL, 10);
INSERT INTO "public"."size" VALUES (40, NULL, 'M', 't', 4, NULL, NULL, NULL, 10);
INSERT INTO "public"."size" VALUES (41, NULL, 'L', 't', 4, NULL, NULL, NULL, 10);
INSERT INTO "public"."size" VALUES (42, NULL, 'XL', 't', 4, NULL, NULL, NULL, 10);
INSERT INTO "public"."size" VALUES (43, NULL, 'S', 't', 4, NULL, NULL, NULL, 11);
INSERT INTO "public"."size" VALUES (44, NULL, 'M', 't', 4, NULL, NULL, NULL, 11);
INSERT INTO "public"."size" VALUES (45, NULL, 'L', 't', 4, NULL, NULL, NULL, 11);
INSERT INTO "public"."size" VALUES (46, NULL, 'XL', 't', 4, NULL, NULL, NULL, 11);
INSERT INTO "public"."size" VALUES (47, NULL, 'S', 't', 4, NULL, NULL, NULL, 12);
INSERT INTO "public"."size" VALUES (78, NULL, 'XL', 't', 6, NULL, NULL, NULL, 19);
INSERT INTO "public"."size" VALUES (79, NULL, 'M', 't', 6, NULL, NULL, NULL, 20);
INSERT INTO "public"."size" VALUES (80, NULL, 'L', 't', 6, NULL, NULL, NULL, 20);
INSERT INTO "public"."size" VALUES (81, NULL, 'XL', 't', 6, NULL, NULL, NULL, 20);
INSERT INTO "public"."size" VALUES (82, NULL, 'M', 't', 6, NULL, NULL, NULL, 21);
INSERT INTO "public"."size" VALUES (83, NULL, 'L', 't', 6, NULL, NULL, NULL, 21);
INSERT INTO "public"."size" VALUES (84, NULL, 'XL', 't', 6, NULL, NULL, NULL, 21);
INSERT INTO "public"."size" VALUES (85, NULL, 'M', 't', 6, NULL, NULL, NULL, 22);
INSERT INTO "public"."size" VALUES (86, NULL, 'L', 't', 6, NULL, NULL, NULL, 22);
INSERT INTO "public"."size" VALUES (87, NULL, 'XL', 't', 6, NULL, NULL, NULL, 22);
INSERT INTO "public"."size" VALUES (88, NULL, 'M', 't', 6, NULL, NULL, NULL, 23);
INSERT INTO "public"."size" VALUES (89, NULL, 'L', 't', 6, NULL, NULL, NULL, 23);
INSERT INTO "public"."size" VALUES (90, NULL, 'XL', 't', 6, NULL, NULL, NULL, 23);
INSERT INTO "public"."size" VALUES (91, NULL, 'M', 't', 6, NULL, NULL, NULL, 24);
INSERT INTO "public"."size" VALUES (48, NULL, 'M', 't', 4, NULL, NULL, NULL, 12);
INSERT INTO "public"."size" VALUES (49, NULL, 'L', 't', 4, NULL, NULL, NULL, 12);
INSERT INTO "public"."size" VALUES (50, NULL, 'XL', 't', 4, NULL, NULL, NULL, 12);
INSERT INTO "public"."size" VALUES (51, NULL, 'S', 't', 4, NULL, NULL, NULL, 13);
INSERT INTO "public"."size" VALUES (52, NULL, 'M', 't', 4, NULL, NULL, NULL, 13);
INSERT INTO "public"."size" VALUES (53, NULL, 'L', 't', 4, NULL, NULL, NULL, 13);
INSERT INTO "public"."size" VALUES (54, NULL, 'XL', 't', 4, NULL, NULL, NULL, 13);
INSERT INTO "public"."size" VALUES (55, NULL, 'S', 't', 4, NULL, NULL, NULL, 14);
INSERT INTO "public"."size" VALUES (56, NULL, 'M', 't', 4, NULL, NULL, NULL, 14);
INSERT INTO "public"."size" VALUES (57, NULL, 'L', 't', 4, NULL, NULL, NULL, 14);
INSERT INTO "public"."size" VALUES (58, NULL, 'XL', 't', 4, NULL, NULL, NULL, 14);
INSERT INTO "public"."size" VALUES (59, NULL, 'S', 't', 4, NULL, NULL, NULL, 15);
INSERT INTO "public"."size" VALUES (60, NULL, 'M', 't', 4, NULL, NULL, NULL, 15);
INSERT INTO "public"."size" VALUES (61, NULL, 'L', 't', 4, NULL, NULL, NULL, 15);
INSERT INTO "public"."size" VALUES (62, NULL, 'XL', 't', 4, NULL, NULL, NULL, 15);
INSERT INTO "public"."size" VALUES (63, NULL, 'S', 't', 4, NULL, NULL, NULL, 16);
INSERT INTO "public"."size" VALUES (64, NULL, 'M', 't', 4, NULL, NULL, NULL, 16);
INSERT INTO "public"."size" VALUES (65, NULL, 'L', 't', 4, NULL, NULL, NULL, 16);
INSERT INTO "public"."size" VALUES (66, NULL, 'XL', 't', 4, NULL, NULL, NULL, 16);
INSERT INTO "public"."size" VALUES (67, NULL, 'S', 't', 4, NULL, NULL, NULL, 17);
INSERT INTO "public"."size" VALUES (68, NULL, 'M', 't', 4, NULL, NULL, NULL, 17);
INSERT INTO "public"."size" VALUES (69, NULL, 'L', 't', 4, NULL, NULL, NULL, 17);
INSERT INTO "public"."size" VALUES (70, NULL, 'XL', 't', 4, NULL, NULL, NULL, 17);
INSERT INTO "public"."size" VALUES (71, NULL, 'S', 't', 4, NULL, NULL, NULL, 18);
INSERT INTO "public"."size" VALUES (72, NULL, 'M', 't', 4, NULL, NULL, NULL, 18);
INSERT INTO "public"."size" VALUES (73, NULL, 'L', 't', 4, NULL, NULL, NULL, 18);
INSERT INTO "public"."size" VALUES (74, NULL, 'XL', 't', 4, NULL, NULL, NULL, 18);
INSERT INTO "public"."size" VALUES (75, NULL, 'S', 't', 6, NULL, NULL, NULL, 19);
INSERT INTO "public"."size" VALUES (76, NULL, 'M', 't', 6, NULL, NULL, NULL, 19);
INSERT INTO "public"."size" VALUES (77, NULL, 'L', 't', 6, NULL, NULL, NULL, 19);
INSERT INTO "public"."size" VALUES (92, NULL, 'L', 't', 6, NULL, NULL, NULL, 24);
INSERT INTO "public"."size" VALUES (93, NULL, 'M', 't', 6, NULL, NULL, NULL, 25);
INSERT INTO "public"."size" VALUES (94, NULL, 'L', 't', 6, NULL, NULL, NULL, 25);
INSERT INTO "public"."size" VALUES (95, NULL, 'M', 't', 6, NULL, NULL, NULL, 26);
INSERT INTO "public"."size" VALUES (96, NULL, 'L', 't', 6, NULL, NULL, NULL, 26);
INSERT INTO "public"."size" VALUES (97, NULL, 'M', 't', 6, NULL, NULL, NULL, 27);
INSERT INTO "public"."size" VALUES (98, NULL, 'L', 't', 6, NULL, NULL, NULL, 27);
INSERT INTO "public"."size" VALUES (99, NULL, 'M', 't', 6, NULL, NULL, NULL, 28);
INSERT INTO "public"."size" VALUES (103, NULL, 'L', 't', 6, NULL, NULL, NULL, 29);
INSERT INTO "public"."size" VALUES (104, NULL, 'XL', 't', 6, NULL, NULL, NULL, 29);
INSERT INTO "public"."size" VALUES (105, NULL, 'M', 't', 6, NULL, NULL, NULL, 30);
INSERT INTO "public"."size" VALUES (106, NULL, 'L', 't', 6, NULL, NULL, NULL, 30);
INSERT INTO "public"."size" VALUES (107, NULL, 'XL', 't', 6, NULL, NULL, NULL, 30);
INSERT INTO "public"."size" VALUES (108, NULL, 'M', 't', 6, NULL, NULL, NULL, 31);
INSERT INTO "public"."size" VALUES (109, NULL, 'L', 't', 6, NULL, NULL, NULL, 31);
INSERT INTO "public"."size" VALUES (110, NULL, 'XL', 't', 6, NULL, NULL, NULL, 31);
INSERT INTO "public"."size" VALUES (111, NULL, 'M', 't', 6, NULL, NULL, NULL, 32);
INSERT INTO "public"."size" VALUES (112, NULL, 'L', 't', 6, NULL, NULL, NULL, 32);
INSERT INTO "public"."size" VALUES (113, NULL, 'XL', 't', 6, NULL, NULL, NULL, 32);
INSERT INTO "public"."size" VALUES (114, NULL, 'M', 't', 6, NULL, NULL, NULL, 33);
INSERT INTO "public"."size" VALUES (115, NULL, 'L', 't', 6, NULL, NULL, NULL, 33);
INSERT INTO "public"."size" VALUES (116, NULL, 'XL', 't', 6, NULL, NULL, NULL, 33);
INSERT INTO "public"."size" VALUES (117, NULL, 'M', 't', 6, NULL, NULL, NULL, 34);
INSERT INTO "public"."size" VALUES (118, NULL, 'L', 't', 6, NULL, NULL, NULL, 34);
INSERT INTO "public"."size" VALUES (119, NULL, 'XL', 't', 6, NULL, NULL, NULL, 34);
INSERT INTO "public"."size" VALUES (120, NULL, 'M', 't', 6, NULL, NULL, NULL, 35);
INSERT INTO "public"."size" VALUES (125, NULL, 'M', 't', 6, NULL, NULL, NULL, 37);
INSERT INTO "public"."size" VALUES (126, NULL, 'L', 't', 6, NULL, NULL, NULL, 37);
INSERT INTO "public"."size" VALUES (127, NULL, 'XL', 't', 6, NULL, NULL, NULL, 37);
INSERT INTO "public"."size" VALUES (129, NULL, 'L', 't', 6, NULL, NULL, NULL, 38);
INSERT INTO "public"."size" VALUES (130, NULL, 'XL', 't', 6, NULL, NULL, NULL, 38);
INSERT INTO "public"."size" VALUES (131, NULL, 'M', 't', 6, NULL, NULL, NULL, 39);
INSERT INTO "public"."size" VALUES (132, NULL, 'L', 't', 6, NULL, NULL, NULL, 39);
INSERT INTO "public"."size" VALUES (100, NULL, 'L', 't', 6, NULL, NULL, NULL, 28);
INSERT INTO "public"."size" VALUES (101, NULL, 'XL', 't', 6, NULL, NULL, NULL, 28);
INSERT INTO "public"."size" VALUES (102, NULL, 'M', 't', 6, NULL, NULL, NULL, 29);
INSERT INTO "public"."size" VALUES (121, NULL, 'L', 't', 6, NULL, NULL, NULL, 35);
INSERT INTO "public"."size" VALUES (124, NULL, 'XL', 't', 6, NULL, NULL, NULL, 36);
INSERT INTO "public"."size" VALUES (146, NULL, 'M', 't', 7, NULL, NULL, NULL, 44);
INSERT INTO "public"."size" VALUES (147, NULL, 'L', 't', 7, NULL, NULL, NULL, 44);
INSERT INTO "public"."size" VALUES (148, NULL, 'XL', 't', 7, NULL, NULL, NULL, 44);
INSERT INTO "public"."size" VALUES (149, NULL, 'M', 't', 7, NULL, NULL, NULL, 45);
INSERT INTO "public"."size" VALUES (150, NULL, 'L', 't', 7, NULL, NULL, NULL, 45);
INSERT INTO "public"."size" VALUES (151, NULL, 'XL', 't', 7, NULL, NULL, NULL, 45);
INSERT INTO "public"."size" VALUES (152, NULL, 'M', 't', 7, NULL, NULL, NULL, 46);
INSERT INTO "public"."size" VALUES (153, NULL, 'L', 't', 7, NULL, NULL, NULL, 46);
INSERT INTO "public"."size" VALUES (154, NULL, 'XL', 't', 7, NULL, NULL, NULL, 46);
INSERT INTO "public"."size" VALUES (155, NULL, 'M', 't', 7, NULL, NULL, NULL, 47);
INSERT INTO "public"."size" VALUES (156, NULL, 'L', 't', 7, NULL, NULL, NULL, 47);
INSERT INTO "public"."size" VALUES (157, NULL, 'XL', 't', 7, NULL, NULL, NULL, 47);
INSERT INTO "public"."size" VALUES (158, NULL, 'M', 't', 7, NULL, NULL, NULL, 48);
INSERT INTO "public"."size" VALUES (159, NULL, 'L', 't', 7, NULL, NULL, NULL, 48);
INSERT INTO "public"."size" VALUES (160, NULL, 'XL', 't', 7, NULL, NULL, NULL, 48);
INSERT INTO "public"."size" VALUES (161, NULL, 'M', 't', 7, NULL, NULL, NULL, 49);
INSERT INTO "public"."size" VALUES (162, NULL, 'L', 't', 7, NULL, NULL, NULL, 49);
INSERT INTO "public"."size" VALUES (3, NULL, 'S', 't', 5, NULL, NULL, NULL, 1);
INSERT INTO "public"."size" VALUES (122, NULL, 'M', 't', 6, NULL, NULL, NULL, 36);
INSERT INTO "public"."size" VALUES (123, NULL, 'L', 't', 6, NULL, NULL, NULL, 36);
INSERT INTO "public"."size" VALUES (128, NULL, 'M', 't', 6, NULL, NULL, NULL, 38);
INSERT INTO "public"."size" VALUES (133, NULL, 'XL', 't', 7, NULL, NULL, NULL, 39);
INSERT INTO "public"."size" VALUES (134, NULL, 'M', 't', 7, NULL, NULL, NULL, 40);
INSERT INTO "public"."size" VALUES (135, NULL, 'L', 't', 7, NULL, NULL, NULL, 40);
INSERT INTO "public"."size" VALUES (136, NULL, 'XL', 't', 7, NULL, NULL, NULL, 40);
INSERT INTO "public"."size" VALUES (137, NULL, 'M', 't', 7, NULL, NULL, NULL, 41);
INSERT INTO "public"."size" VALUES (138, NULL, 'L', 't', 7, NULL, NULL, NULL, 41);
INSERT INTO "public"."size" VALUES (139, NULL, 'XL', 't', 7, NULL, NULL, NULL, 41);
INSERT INTO "public"."size" VALUES (140, NULL, 'M', 't', 7, NULL, NULL, NULL, 42);
INSERT INTO "public"."size" VALUES (141, NULL, 'L', 't', 7, NULL, NULL, NULL, 42);
INSERT INTO "public"."size" VALUES (142, NULL, 'XL', 't', 7, NULL, NULL, NULL, 42);
INSERT INTO "public"."size" VALUES (143, NULL, 'M', 't', 7, NULL, NULL, NULL, 43);
INSERT INTO "public"."size" VALUES (144, NULL, 'L', 't', 7, NULL, NULL, NULL, 43);
INSERT INTO "public"."size" VALUES (145, NULL, 'XL', 't', 7, NULL, NULL, NULL, 43);
INSERT INTO "public"."size" VALUES (163, NULL, 'XL', 't', 7, NULL, NULL, NULL, 49);
INSERT INTO "public"."size" VALUES (164, NULL, 'M', 't', 7, NULL, NULL, NULL, 50);
INSERT INTO "public"."size" VALUES (165, NULL, 'L', 't', 7, NULL, NULL, NULL, 50);
INSERT INTO "public"."size" VALUES (166, NULL, 'XL', 't', 7, NULL, NULL, NULL, 50);
INSERT INTO "public"."size" VALUES (167, NULL, 'M', 't', 7, NULL, NULL, NULL, 51);
INSERT INTO "public"."size" VALUES (168, NULL, 'L', 't', 7, NULL, NULL, NULL, 51);
INSERT INTO "public"."size" VALUES (169, NULL, 'XL', 't', 7, NULL, NULL, NULL, 51);
INSERT INTO "public"."size" VALUES (170, NULL, 'M', 't', 7, NULL, NULL, NULL, 52);
INSERT INTO "public"."size" VALUES (171, NULL, 'L', 't', 7, NULL, NULL, NULL, 52);
INSERT INTO "public"."size" VALUES (172, NULL, 'XL', 't', 7, NULL, NULL, NULL, 52);
INSERT INTO "public"."size" VALUES (173, NULL, 'M', 't', 7, NULL, NULL, NULL, 53);
INSERT INTO "public"."size" VALUES (174, NULL, 'L', 't', 7, NULL, NULL, NULL, 53);
INSERT INTO "public"."size" VALUES (175, NULL, 'XL', 't', 7, NULL, NULL, NULL, 53);
INSERT INTO "public"."size" VALUES (176, NULL, 'M', 't', 7, NULL, NULL, NULL, 54);
INSERT INTO "public"."size" VALUES (177, NULL, 'L', 't', 7, NULL, NULL, NULL, 54);
INSERT INTO "public"."size" VALUES (178, NULL, 'XL', 't', 7, NULL, NULL, NULL, 54);
INSERT INTO "public"."size" VALUES (179, NULL, 'M', 't', 7, NULL, NULL, NULL, 55);
INSERT INTO "public"."size" VALUES (180, NULL, 'L', 't', 7, NULL, NULL, NULL, 55);
INSERT INTO "public"."size" VALUES (181, NULL, 'XL', 't', 7, NULL, NULL, NULL, 55);
INSERT INTO "public"."size" VALUES (182, NULL, 'M', 't', 7, NULL, NULL, NULL, 56);
INSERT INTO "public"."size" VALUES (183, NULL, 'L', 't', 7, NULL, NULL, NULL, 56);
INSERT INTO "public"."size" VALUES (184, NULL, 'XL', 't', 7, NULL, NULL, NULL, 56);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_info";
CREATE TABLE "public"."user_info" (
  "id" int8 NOT NULL DEFAULT nextval('user_info_id_seq'::regclass),
  "avt_url" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "full_name" varchar(255) COLLATE "pg_catalog"."default",
  "phone" varchar(255) COLLATE "pg_catalog"."default",
  "user_id" int8
)
;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO "public"."user_info" VALUES (1, NULL, 'dinh37823@gmail.com', 'Dinh Huy Hoang', NULL, NULL);
INSERT INTO "public"."user_info" VALUES (2, NULL, 'dinhhuyhoang1508@gmail.com', 'Dinh', NULL, NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int8 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "created_date" date,
  "enabled" bool,
  "password_encrypted" varchar(255) COLLATE "pg_catalog"."default",
  "updated_date" date,
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "created_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, '2024-03-22', 't', '$2a$10$ajurIEWU8bbzLNAlMoJgyuSrAQlDG641Y5vZlwxHAE1FtGuG9.I2W', NULL, 'dinh37823', NULL, NULL);
INSERT INTO "public"."users" VALUES (2, '2024-03-22', 't', '$2a$10$PtDIB6jguLhxveyJA6Lzmek1ubeGwKUX0nrp.WmlBqNlnV0fXTTw.', NULL, 'super-admin', NULL, NULL);

-- ----------------------------
-- Table structure for variation
-- ----------------------------
DROP TABLE IF EXISTS "public"."variation";
CREATE TABLE "public"."variation" (
  "id" int8 NOT NULL DEFAULT nextval('variation_id_seq'::regclass),
  "color" varchar(255) COLLATE "pg_catalog"."default",
  "released_date" date,
  "status" bool NOT NULL DEFAULT true,
  "updated_date" date,
  "product_id" int8,
  "released_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of variation
-- ----------------------------
INSERT INTO "public"."variation" VALUES (36, 'Đen', NULL, 't', NULL, 16, NULL, NULL);
INSERT INTO "public"."variation" VALUES (37, 'Đen', NULL, 't', NULL, 16, NULL, NULL);
INSERT INTO "public"."variation" VALUES (1, 'Đen', NULL, 't', NULL, 1, NULL, NULL);
INSERT INTO "public"."variation" VALUES (2, 'Xanh', NULL, 't', NULL, 1, NULL, NULL);
INSERT INTO "public"."variation" VALUES (3, 'Cacao', NULL, 't', NULL, 1, NULL, NULL);
INSERT INTO "public"."variation" VALUES (4, 'Đỏ', NULL, 't', NULL, 1, NULL, NULL);
INSERT INTO "public"."variation" VALUES (5, 'Đen', NULL, 't', NULL, 2, NULL, NULL);
INSERT INTO "public"."variation" VALUES (6, 'Trắng', NULL, 't', NULL, 2, NULL, NULL);
INSERT INTO "public"."variation" VALUES (38, 'Trắng', NULL, 't', NULL, 16, NULL, NULL);
INSERT INTO "public"."variation" VALUES (39, 'Xám', NULL, 't', NULL, 17, NULL, NULL);
INSERT INTO "public"."variation" VALUES (40, 'Đen', NULL, 't', NULL, 18, NULL, NULL);
INSERT INTO "public"."variation" VALUES (41, 'Đen', NULL, 't', NULL, 18, NULL, NULL);
INSERT INTO "public"."variation" VALUES (42, 'Trắng', NULL, 't', NULL, 18, NULL, NULL);
INSERT INTO "public"."variation" VALUES (7, 'Đen', NULL, 't', NULL, 3, NULL, NULL);
INSERT INTO "public"."variation" VALUES (8, 'Trắng', NULL, 't', NULL, 3, NULL, NULL);
INSERT INTO "public"."variation" VALUES (43, 'Xám', NULL, 't', NULL, 18, NULL, NULL);
INSERT INTO "public"."variation" VALUES (44, 'Be', NULL, 't', NULL, 19, NULL, NULL);
INSERT INTO "public"."variation" VALUES (45, 'Đen', NULL, 't', NULL, 19, NULL, NULL);
INSERT INTO "public"."variation" VALUES (9, 'Đen', NULL, 't', NULL, 4, NULL, NULL);
INSERT INTO "public"."variation" VALUES (10, 'Cacao', NULL, 't', NULL, 4, NULL, NULL);
INSERT INTO "public"."variation" VALUES (11, 'Trắng', NULL, 't', NULL, 4, NULL, NULL);
INSERT INTO "public"."variation" VALUES (12, 'Hồng', NULL, 't', NULL, 4, NULL, NULL);
INSERT INTO "public"."variation" VALUES (13, 'Xanh Rêu', NULL, 't', NULL, 4, NULL, NULL);
INSERT INTO "public"."variation" VALUES (14, 'Đen', NULL, 't', NULL, 5, NULL, NULL);
INSERT INTO "public"."variation" VALUES (15, 'Đỏ', NULL, 't', NULL, 5, NULL, NULL);
INSERT INTO "public"."variation" VALUES (16, 'Trắng', NULL, 't', NULL, 6, NULL, NULL);
INSERT INTO "public"."variation" VALUES (17, 'Hồng', NULL, 't', NULL, 6, NULL, NULL);
INSERT INTO "public"."variation" VALUES (18, 'Đen', NULL, 't', NULL, 7, NULL, NULL);
INSERT INTO "public"."variation" VALUES (19, 'Kem', NULL, 't', NULL, 7, NULL, NULL);
INSERT INTO "public"."variation" VALUES (20, 'Đỏ', NULL, 't', NULL, 8, NULL, NULL);
INSERT INTO "public"."variation" VALUES (21, 'Xanh ', NULL, 't', NULL, 8, NULL, NULL);
INSERT INTO "public"."variation" VALUES (22, 'Đen', NULL, 't', NULL, 9, NULL, NULL);
INSERT INTO "public"."variation" VALUES (23, 'Trắng', NULL, 't', NULL, 9, NULL, NULL);
INSERT INTO "public"."variation" VALUES (24, 'Đen', NULL, 't', NULL, 10, NULL, NULL);
INSERT INTO "public"."variation" VALUES (25, 'Xám', NULL, 't', NULL, 10, NULL, NULL);
INSERT INTO "public"."variation" VALUES (26, 'Đen', NULL, 't', NULL, 11, NULL, NULL);
INSERT INTO "public"."variation" VALUES (27, 'Kem', NULL, 't', NULL, 11, NULL, NULL);
INSERT INTO "public"."variation" VALUES (28, 'Đen', NULL, 't', NULL, 12, NULL, NULL);
INSERT INTO "public"."variation" VALUES (29, 'Đen', NULL, 't', NULL, 13, NULL, NULL);
INSERT INTO "public"."variation" VALUES (30, 'Kem', NULL, 't', NULL, 13, NULL, NULL);
INSERT INTO "public"."variation" VALUES (31, 'Xám', NULL, 't', NULL, 13, NULL, NULL);
INSERT INTO "public"."variation" VALUES (32, 'Đen', NULL, 't', NULL, 14, NULL, NULL);
INSERT INTO "public"."variation" VALUES (33, 'Trắng', NULL, 't', NULL, 14, NULL, NULL);
INSERT INTO "public"."variation" VALUES (34, 'Xám', NULL, 't', NULL, 14, NULL, NULL);
INSERT INTO "public"."variation" VALUES (35, 'Đen', NULL, 't', NULL, 15, NULL, NULL);
INSERT INTO "public"."variation" VALUES (46, 'Đen', NULL, 't', NULL, 20, NULL, NULL);
INSERT INTO "public"."variation" VALUES (47, 'Xanh Rêu', NULL, 't', NULL, 20, NULL, NULL);
INSERT INTO "public"."variation" VALUES (48, 'Đen', NULL, 't', NULL, 21, NULL, NULL);
INSERT INTO "public"."variation" VALUES (49, 'Đen', NULL, 't', NULL, 22, NULL, NULL);
INSERT INTO "public"."variation" VALUES (50, 'Trắng', NULL, 't', NULL, 22, NULL, NULL);
INSERT INTO "public"."variation" VALUES (51, 'Xám', NULL, 't', NULL, 22, NULL, NULL);
INSERT INTO "public"."variation" VALUES (52, 'Đen', NULL, 't', NULL, 23, NULL, NULL);
INSERT INTO "public"."variation" VALUES (53, 'Đen', NULL, 't', NULL, 24, NULL, NULL);
INSERT INTO "public"."variation" VALUES (54, 'Xanh Rêu', NULL, 't', NULL, 24, NULL, NULL);
INSERT INTO "public"."variation" VALUES (55, 'Đen', NULL, 't', NULL, 25, NULL, NULL);
INSERT INTO "public"."variation" VALUES (56, 'Trắng', NULL, 't', NULL, 25, NULL, NULL);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."categories_id_seq"
OWNED BY "public"."categories"."id";
SELECT setval('"public"."categories_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."img_product_id_seq"
OWNED BY "public"."img_product"."id";
SELECT setval('"public"."img_product_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."import_invoices_id_seq"
OWNED BY "public"."import_invoices"."id";
SELECT setval('"public"."import_invoices_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."log_id_seq"
OWNED BY "public"."log"."id";
SELECT setval('"public"."log_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_detail_id_seq"
OWNED BY "public"."order_detail"."id";
SELECT setval('"public"."order_detail_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."orders_id_seq"
OWNED BY "public"."orders"."id";
SELECT setval('"public"."orders_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."permissions_id_seq"
OWNED BY "public"."permissions"."id";
SELECT setval('"public"."permissions_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."price_id_seq"
OWNED BY "public"."price"."id";
SELECT setval('"public"."price_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_id_seq"
OWNED BY "public"."product"."id";
SELECT setval('"public"."product_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."promotion_id_seq"
OWNED BY "public"."promotion"."id";
SELECT setval('"public"."promotion_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."refreshtoken_seq"', 301, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."roles_id_seq"
OWNED BY "public"."roles"."id";
SELECT setval('"public"."roles_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."size_id_seq"
OWNED BY "public"."size"."id";
SELECT setval('"public"."size_id_seq"', 187, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_info_id_seq"
OWNED BY "public"."user_info"."id";
SELECT setval('"public"."user_info_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."variation_id_seq"
OWNED BY "public"."variation"."id";
SELECT setval('"public"."variation_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table img_product
-- ----------------------------
ALTER TABLE "public"."img_product" ADD CONSTRAINT "img_product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table import_invoices
-- ----------------------------
ALTER TABLE "public"."import_invoices" ADD CONSTRAINT "import_invoices_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table log
-- ----------------------------
ALTER TABLE "public"."log" ADD CONSTRAINT "log_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table order_detail
-- ----------------------------
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "order_detail_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table permissions
-- ----------------------------
ALTER TABLE "public"."permissions" ADD CONSTRAINT "permissions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table price
-- ----------------------------
ALTER TABLE "public"."price" ADD CONSTRAINT "uk_emiuohuwtefgg9mcjqiu5uota" UNIQUE ("product_id");

-- ----------------------------
-- Primary Key structure for table price
-- ----------------------------
ALTER TABLE "public"."price" ADD CONSTRAINT "price_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table promotion
-- ----------------------------
ALTER TABLE "public"."promotion" ADD CONSTRAINT "promotion_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table refreshtoken
-- ----------------------------
ALTER TABLE "public"."refreshtoken" ADD CONSTRAINT "uk_or156wbneyk8noo4jstv55ii3" UNIQUE ("token");

-- ----------------------------
-- Primary Key structure for table refreshtoken
-- ----------------------------
ALTER TABLE "public"."refreshtoken" ADD CONSTRAINT "refreshtoken_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table role_permissions
-- ----------------------------
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id", "permission_id");

-- ----------------------------
-- Primary Key structure for table roles
-- ----------------------------
ALTER TABLE "public"."roles" ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table size
-- ----------------------------
ALTER TABLE "public"."size" ADD CONSTRAINT "size_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table user_info
-- ----------------------------
ALTER TABLE "public"."user_info" ADD CONSTRAINT "uk_hixwjgx0ynne0cq4tqvoawoda" UNIQUE ("user_id");

-- ----------------------------
-- Primary Key structure for table user_info
-- ----------------------------
ALTER TABLE "public"."user_info" ADD CONSTRAINT "user_info_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table variation
-- ----------------------------
ALTER TABLE "public"."variation" ADD CONSTRAINT "variation_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "fknbfq7vefwik42v5ka12ekr4hv" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."categories" ADD CONSTRAINT "fkns5mu02l55sw9xu40v1bw3fpy" FOREIGN KEY ("released_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table img_product
-- ----------------------------
ALTER TABLE "public"."img_product" ADD CONSTRAINT "fk7825vbc39wmua4uot4btpqc3j" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."img_product" ADD CONSTRAINT "fkd8qlw929hie49l8k63sp30074" FOREIGN KEY ("released_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."img_product" ADD CONSTRAINT "fknmqaa81ymyglyb4shpvjlqhgx" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table import_invoices
-- ----------------------------
ALTER TABLE "public"."import_invoices" ADD CONSTRAINT "fkkcxv16x6b0ntpaws14wtk1cc1" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."import_invoices" ADD CONSTRAINT "fkmrflrcorkr2r5tv7fns505nvi" FOREIGN KEY ("variation_id") REFERENCES "public"."variation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table log
-- ----------------------------
ALTER TABLE "public"."log" ADD CONSTRAINT "fkefuitn33qkpy6nonixjyyu3u0" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table order_detail
-- ----------------------------
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "fkb8bg2bkty0oksa3wiq5mp5qnc" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "fkrws2q0si6oyd6il8gqe2aennc" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "fk32ql8ubntj5uh44ph9659tiih" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table price
-- ----------------------------
ALTER TABLE "public"."price" ADD CONSTRAINT "fkk4mbgqf5yru5ib5b6w5l6ukkj" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."price" ADD CONSTRAINT "fksvnafk3t6d97lxxm4rhs7jsny" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "fkjlafeta1wfhorrg6f7v8c60jc" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product" ADD CONSTRAINT "fkopbpsv1u9qcig6s9hw8w5dqbk" FOREIGN KEY ("released_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_categories
-- ----------------------------
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "fkcv72xdc73rnpdqkhkjpfjeu2" FOREIGN KEY ("cate_id") REFERENCES "public"."categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "fkppc5s0f38pgb35a32dlgyhorc" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_promotion
-- ----------------------------
ALTER TABLE "public"."product_promotion" ADD CONSTRAINT "fkfhoeub2merr6yp1vnp4eft0jh" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotion" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_promotion" ADD CONSTRAINT "fkmpv6380a8ouxwxa99taru2luq" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table promotion
-- ----------------------------
ALTER TABLE "public"."promotion" ADD CONSTRAINT "fk3uylwax4ew4rv6rjgaaalq69n" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."promotion" ADD CONSTRAINT "fkghoegpt2btpbr7xjsxhc4ab9g" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table role_permissions
-- ----------------------------
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "fkegdk29eiy7mdtefy5c7eirr6e" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."role_permissions" ADD CONSTRAINT "fkn5fotdgk8d1xvo8nav9uv3muc" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table roles_users
-- ----------------------------
ALTER TABLE "public"."roles_users" ADD CONSTRAINT "fklkcn1l0gnfshcn4rnmak73ta" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."roles_users" ADD CONSTRAINT "fksmos02hm32191ogexm2ljik9x" FOREIGN KEY ("role_id") REFERENCES "public"."roles" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table size
-- ----------------------------
ALTER TABLE "public"."size" ADD CONSTRAINT "fk3ancjeqjc4m8s58pdrhhsstiv" FOREIGN KEY ("released_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."size" ADD CONSTRAINT "fkf9k662ggov0hglnb39mrcgoq4" FOREIGN KEY ("variation_id") REFERENCES "public"."variation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."size" ADD CONSTRAINT "fkqmvp210uwywd1723rd7donpa8" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table user_info
-- ----------------------------
ALTER TABLE "public"."user_info" ADD CONSTRAINT "fkr1b96ca4asuvrhwoqkdmbo7nj" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "fkci7xr690rvyv3bnfappbyh8x0" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."users" ADD CONSTRAINT "fkibk1e3kaxy5sfyeekp8hbhnim" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table variation
-- ----------------------------
ALTER TABLE "public"."variation" ADD CONSTRAINT "fk1hxfv06p366bhb8sce1djt2v7" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."variation" ADD CONSTRAINT "fkmv90segw4qgps1pa9p00fyyk9" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."variation" ADD CONSTRAINT "fkpv48ovi5y6q494tp0ga9k2h9i" FOREIGN KEY ("released_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
