/*
 Navicat Premium Data Transfer

 Source Server         : PostgreSQL
 Source Server Type    : PostgreSQL
 Source Server Version : 160002 (160002)
 Source Host           : localhost:8088
 Source Catalog        : shop2h
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160002 (160002)
 File Encoding         : 65001

 Date: 31/05/2024 20:30:30
*/


-- ----------------------------
-- Sequence structure for blogs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."blogs_id_seq";
CREATE SEQUENCE "public"."blogs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

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
-- Sequence structure for contact_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."contact_id_seq";
CREATE SEQUENCE "public"."contact_id_seq" 
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
-- Sequence structure for order_status_history_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."order_status_history_id_seq";
CREATE SEQUENCE "public"."order_status_history_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for order_status_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."order_status_id_seq";
CREATE SEQUENCE "public"."order_status_id_seq" 
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
-- Sequence structure for resource_variation_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."resource_variation_id_seq";
CREATE SEQUENCE "public"."resource_variation_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for resources_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."resources_id_seq";
CREATE SEQUENCE "public"."resources_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for reviews_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."reviews_id_seq";
CREATE SEQUENCE "public"."reviews_id_seq" 
INCREMENT 1
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
-- Sequence structure for webhook_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."webhook_id_seq";
CREATE SEQUENCE "public"."webhook_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS "public"."blogs";
CREATE TABLE "public"."blogs" (
  "id" int8 NOT NULL DEFAULT nextval('blogs_id_seq'::regclass),
  "content" text COLLATE "pg_catalog"."default",
  "created_date" date,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "status" bool NOT NULL,
  "thumbnail" varchar(255) COLLATE "pg_catalog"."default",
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "updated_date" date,
  "created_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO "public"."blogs" VALUES (1, '<p>Chào mừng các bạn đến với blog thời trang của chúng tôi! Hôm nay, chúng ta sẽ cùng khám phá những xu hướng thời trang nổi bật cho mùa hè 2024. Đây là thời điểm hoàn hảo để làm mới tủ quần áo của bạn với những trang phục tươi mới và phong cách.</p>
                         <h2>Họa Tiết Hoa Lá</h2>
                <p>Họa tiết hoa lá chưa bao giờ lỗi mốt, và mùa hè 2024 cũng không phải ngoại lệ. Những chiếc váy, áo hay phụ kiện với họa tiết hoa lá sẽ mang lại cho bạn vẻ ngoài nữ tính và quyến rũ.</p>
                <img src="https://i1.wp.com/www.shutterstock.com/blog/wp-content/uploads/sites/5/2022/05/gucci_floral_suit_menswear.jpg?ssl=1" alt="Họa tiết hoa lá mùa hè 2024"/>


                <h2>Phong Cách Boho</h2>
                <p>Phong cách Boho với những chi tiết ren, tua rua và các chất liệu nhẹ nhàng tiếp tục chiếm lĩnh các sàn diễn thời trang. Đây là phong cách lý tưởng cho những buổi dạo phố hay những chuyến du lịch hè.</p>
                <img src="https://hoang-phuc.com/media/magefan_blog/2022/01/bohemian-la-gi-1.jpg" alt="Phong cách Boho mùa hè 2024" />
', '2024-05-07', 'Xu hướng thời trang hè 2024', 't', 'https://lh4.googleusercontent.com/proxy/Lt3rRAtRKP6p45dDUaxcUFVNO4ISKuRXJZT0G5mZbD-im91RBcem5Tif0OwhGR1lJV8ngOUkpFI1A6QpWAwDcwSqc9nJDQ26bh2sXxgs-NE', 'TEST 123', '2024-05-07', 1, 1);

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."categories";
CREATE TABLE "public"."categories" (
  "id" int8 NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "parent_id" int8,
  "released_date" date DEFAULT now(),
  "status" bool DEFAULT true,
  "updated_date" date DEFAULT now(),
  "released_by" int8,
  "updated_by" int8
)
;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO "public"."categories" VALUES (3, 'Áo Khoác', NULL, '2024-04-24', 't', '2024-04-24', 2, 2);
INSERT INTO "public"."categories" VALUES (1, 'Áo Thun', NULL, '2024-04-03', 't', '2024-04-24', 2, 2);
INSERT INTO "public"."categories" VALUES (5, 'Quần Dài', NULL, '2024-04-24', 't', '2024-04-24', 2, 2);
INSERT INTO "public"."categories" VALUES (4, 'Quần Short', NULL, '2024-04-24', 't', '2024-04-24', 2, 2);
INSERT INTO "public"."categories" VALUES (2, 'Áo Sơ Mi', NULL, '2024-04-24', 't', '2024-04-24', 2, 2);

-- ----------------------------
-- Table structure for contact
-- ----------------------------
DROP TABLE IF EXISTS "public"."contact";
CREATE TABLE "public"."contact" (
  "id" int8 NOT NULL DEFAULT nextval('contact_id_seq'::regclass),
  "created_date" timestamp(6),
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "message" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "status" bool NOT NULL
)
;

-- ----------------------------
-- Records of contact
-- ----------------------------

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
INSERT INTO "public"."img_product" VALUES (14, '2024-05-08', '2024-05-08', 'https://i.ibb.co/s9ShTDn/632f3e6d862a.png', 1, 2, 2);
INSERT INTO "public"."img_product" VALUES (15, '2024-05-08', '2024-05-08', 'https://i.ibb.co/wSQt5Mb/6c9186896a76.png', 1, 2, 2);

-- ----------------------------
-- Table structure for import_invoices
-- ----------------------------
DROP TABLE IF EXISTS "public"."import_invoices";
CREATE TABLE "public"."import_invoices" (
  "id" int8 NOT NULL DEFAULT nextval('import_invoices_id_seq'::regclass),
  "import_date" date,
  "import_price" float8,
  "quantity" int4 NOT NULL,
  "product_id" int8,
  "variation_id" int8,
  "size_id" int8
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
  "price" float8 NOT NULL,
  "quantity" int4 NOT NULL,
  "order_id" int8,
  "product_id" int8,
  "size_id" int8,
  "variation_id" int8,
  "review_id" int8
)
;

-- ----------------------------
-- Records of order_detail
-- ----------------------------
INSERT INTO "public"."order_detail" VALUES (5, 250000, 2, 43, 3, 33, 8, NULL);
INSERT INTO "public"."order_detail" VALUES (6, 250000, 1, 43, 2, 20, 5, NULL);
INSERT INTO "public"."order_detail" VALUES (13, 250000, 2, 48, 3, 29, 7, NULL);
INSERT INTO "public"."order_detail" VALUES (14, 250000, 1, 48, 3, 27, 7, NULL);
INSERT INTO "public"."order_detail" VALUES (2, 250000, 2, 39, 3, 33, 8, NULL);
INSERT INTO "public"."order_detail" VALUES (3, 250000, 2, 42, 3, 33, 8, NULL);
INSERT INTO "public"."order_detail" VALUES (4, 250000, 1, 42, 2, 20, 5, NULL);
INSERT INTO "public"."order_detail" VALUES (7, 250000, 1, 44, 2, 20, 5, 2);
INSERT INTO "public"."order_detail" VALUES (8, 250000, 2, 44, 3, 33, 8, 9);
INSERT INTO "public"."order_detail" VALUES (18, 212500, 2, 14, 2, 23, 6, NULL);
INSERT INTO "public"."order_detail" VALUES (19, 212500, 2, 15, 2, 23, 6, NULL);
INSERT INTO "public"."order_detail" VALUES (20, 212500, 2, 16, 3, 30, 7, NULL);

-- ----------------------------
-- Table structure for order_status
-- ----------------------------
DROP TABLE IF EXISTS "public"."order_status";
CREATE TABLE "public"."order_status" (
  "id" int8 NOT NULL DEFAULT nextval('order_status_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of order_status
-- ----------------------------
INSERT INTO "public"."order_status" VALUES (1, 'CHỜ XÁC NHẬN');
INSERT INTO "public"."order_status" VALUES (2, 'ĐANG ĐÓNG GÓI');
INSERT INTO "public"."order_status" VALUES (3, 'CHỜ ĐƠN VỊ VẬN CHUYỂN');
INSERT INTO "public"."order_status" VALUES (4, 'ĐANG GIAO HÀNG');
INSERT INTO "public"."order_status" VALUES (5, 'THÀNH CÔN');
INSERT INTO "public"."order_status" VALUES (6, 'ĐANG XỬ LÝ');
INSERT INTO "public"."order_status" VALUES (7, 'ĐÃ HUỶ');

-- ----------------------------
-- Table structure for order_status_history
-- ----------------------------
DROP TABLE IF EXISTS "public"."order_status_history";
CREATE TABLE "public"."order_status_history" (
  "id" int8 NOT NULL DEFAULT nextval('order_status_history_id_seq'::regclass),
  "created_date" timestamp(6),
  "order_id" int8,
  "status_id" int8
)
;

-- ----------------------------
-- Records of order_status_history
-- ----------------------------
INSERT INTO "public"."order_status_history" VALUES (12, '2024-05-10 19:33:01.114', 38, 1);
INSERT INTO "public"."order_status_history" VALUES (13, '2024-05-10 20:57:33.835', 39, 1);
INSERT INTO "public"."order_status_history" VALUES (14, '2024-05-10 20:58:32.952', 42, 1);
INSERT INTO "public"."order_status_history" VALUES (15, '2024-05-10 21:09:28.622', 43, 1);
INSERT INTO "public"."order_status_history" VALUES (16, '2024-05-10 21:14:24.73', 44, 1);
INSERT INTO "public"."order_status_history" VALUES (17, '2024-05-19 20:05:38.306', 44, 2);
INSERT INTO "public"."order_status_history" VALUES (18, '2024-05-19 23:23:30.383', 43, 1);
INSERT INTO "public"."order_status_history" VALUES (19, '2024-05-19 23:23:30.383', 43, 1);
INSERT INTO "public"."order_status_history" VALUES (20, '2024-05-19 23:23:30.49', 43, 1);
INSERT INTO "public"."order_status_history" VALUES (21, '2024-05-19 23:23:30.496', 43, 1);
INSERT INTO "public"."order_status_history" VALUES (22, '2024-05-19 23:26:00.893', 44, 3);
INSERT INTO "public"."order_status_history" VALUES (23, '2024-05-19 23:29:11.74', 43, 2);
INSERT INTO "public"."order_status_history" VALUES (24, '2024-05-19 23:32:25.841', 44, 4);
INSERT INTO "public"."order_status_history" VALUES (25, '2024-05-19 23:33:00.454', 44, 5);
INSERT INTO "public"."order_status_history" VALUES (26, '2024-05-20 19:55:11.469', 48, 1);
INSERT INTO "public"."order_status_history" VALUES (28, '2024-05-30 22:04:18.098', 48, 1);
INSERT INTO "public"."order_status_history" VALUES (29, '2024-05-30 22:04:25.665', 48, 2);
INSERT INTO "public"."order_status_history" VALUES (8, '2024-05-31 15:52:55.29', 14, 1);
INSERT INTO "public"."order_status_history" VALUES (9, '2024-05-31 15:52:56.391', 15, 1);
INSERT INTO "public"."order_status_history" VALUES (10, '2024-05-31 16:00:38.367', 16, 1);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS "public"."orders";
CREATE TABLE "public"."orders" (
  "id" int8 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
  "order_date" timestamp(6),
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "note" varchar(255) COLLATE "pg_catalog"."default",
  "phone" varchar(255) COLLATE "pg_catalog"."default",
  "user_id" int8,
  "shipping_fee" float8,
  "total_amount" float8,
  "status_id" int8,
  "district" varchar(255) COLLATE "pg_catalog"."default",
  "payment_code" varchar(255) COLLATE "pg_catalog"."default",
  "payment_date" timestamp(6),
  "payment_method" varchar(255) COLLATE "pg_catalog"."default",
  "payment_status" varchar(255) COLLATE "pg_catalog"."default",
  "province" varchar(255) COLLATE "pg_catalog"."default",
  "shipping_code" varchar(255) COLLATE "pg_catalog"."default",
  "ward" varchar(255) COLLATE "pg_catalog"."default",
  "generated_order_id" int8
)
;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO "public"."orders" VALUES (42, '2024-05-10 20:58:32.929', '123, to7', 'Dinh Huy', 'Không', '0358128004', 2, 30000, 750000, 1, 'Thành Phố Long Khánh', NULL, NULL, 'cod', 'no', 'Đồng Nai', '123sdfsdf', 'Phường Phú Bình', 1770132314);
INSERT INTO "public"."orders" VALUES (39, '2024-05-10 20:57:33.691', '123, to7', 'Dinh Huy', 'Không', '0358128004', 2, 30000, 750000, 1, 'Thành Phố Long Khánh', NULL, NULL, 'cod', 'no', 'Đồng Nai', '123sdfsdf', 'Phường Phú Bình', 1770132315);
INSERT INTO "public"."orders" VALUES (38, '2024-05-10 19:33:00.902', '123, to7', 'Dinh Huy Hoang', 'Không', '358128004', 2, 30000, 750000, 7, 'Thành Phố Long Khánh', NULL, NULL, 'cod', 'no', 'Đồng Nai', '123sdfsdf', 'Phường Phú Bình', 1770132316);
INSERT INTO "public"."orders" VALUES (14, '2024-05-31 15:52:55.255', '123123', 'Huy', '123123', '0373132765', 4, 56101, 425000, 1, 'Huyện Thuận Thành', NULL, NULL, 'cod', 'no', 'Bắc Ninh', 'L9TC93', 'Xã Đình Tổ', 1717146167);
INSERT INTO "public"."orders" VALUES (15, '2024-05-31 15:52:56.373', '123123', 'Huy', '123123', '0373132765', 4, 56101, 425000, 1, 'Huyện Thuận Thành', NULL, NULL, 'cod', 'no', 'Bắc Ninh', 'L9TC94', 'Xã Đình Tổ', 1717146175);
INSERT INTO "public"."orders" VALUES (16, '2024-05-31 16:00:38.345', '123123', 'Huy', '123123', '0373132765', 4, 57201, 425000, 1, 'Huyện Tủa Chùa', NULL, NULL, 'cod', 'no', 'Điện Biên', 'L9TC9E', 'Xã Tả Phìn', 1717146637);
INSERT INTO "public"."orders" VALUES (43, '2024-05-10 21:09:28.56', '123, to7', 'Dinh Huy', 'Không', '0358128004', 2, 30000, 750000, 2, 'Thành Phố Long Khánh', NULL, NULL, 'cod', 'no', 'Đồng Nai', '123sdfsdf', 'Phường Phú Bình', 1770132311);
INSERT INTO "public"."orders" VALUES (44, '2024-05-10 21:14:24.708', '123, to7', 'Dinh Huy', 'Không', '0358128004', 2, 30000, 750000, 5, 'Thành Phố Long Khánh', NULL, NULL, 'cod', 'no', 'Đồng Nai', '123sdfsdf', 'Phường Phú Bình', 17701323112);
INSERT INTO "public"."orders" VALUES (48, '2024-05-20 19:55:11.413', '123, to7', 'Dinh Huy', 'Không', '0358128004', 2, 30000, 750000, 2, 'Thành Phố Long Khánh', NULL, NULL, 'vnpay', 'yes', 'Đồng Nai', '123sdfsdf', 'Phường Phú Bình', 1770132313);

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
INSERT INTO "public"."permissions" VALUES (1, 'UPDATE');
INSERT INTO "public"."permissions" VALUES (2, 'DELETE');
INSERT INTO "public"."permissions" VALUES (3, 'CREATE');
INSERT INTO "public"."permissions" VALUES (4, 'READ');

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
INSERT INTO "public"."price" VALUES (1, 250000, '2024-03-31', 1, 2);
INSERT INTO "public"."price" VALUES (6, 250000, '2024-03-31', 6, 2);
INSERT INTO "public"."price" VALUES (7, 250000, '2024-03-31', 7, 2);
INSERT INTO "public"."price" VALUES (3, 250000, '2024-03-31', 3, 2);
INSERT INTO "public"."price" VALUES (9, 250000, '2024-03-31', 9, 2);
INSERT INTO "public"."price" VALUES (5, 250000, '2024-03-31', 5, 2);
INSERT INTO "public"."price" VALUES (2, 250000, '2024-03-31', 2, 2);
INSERT INTO "public"."price" VALUES (18, 250000, '2024-03-31', 18, 2);
INSERT INTO "public"."price" VALUES (20, 250000, '2024-03-31', 20, 2);
INSERT INTO "public"."price" VALUES (15, 250000, '2024-03-31', 15, 2);
INSERT INTO "public"."price" VALUES (14, 250000, '2024-03-31', 14, 2);
INSERT INTO "public"."price" VALUES (13, 250000, '2024-03-31', 13, 2);
INSERT INTO "public"."price" VALUES (11, 250000, '2024-03-31', 11, 2);
INSERT INTO "public"."price" VALUES (12, 250000, '2024-03-31', 12, 2);
INSERT INTO "public"."price" VALUES (17, 250000, '2024-03-31', 17, 2);
INSERT INTO "public"."price" VALUES (16, 250000, '2024-03-31', 16, 2);
INSERT INTO "public"."price" VALUES (19, 250000, '2024-03-31', 19, 2);
INSERT INTO "public"."price" VALUES (8, 250000, '2024-03-31', 8, 2);
INSERT INTO "public"."price" VALUES (10, 250000, '2024-03-31', 10, 2);
INSERT INTO "public"."price" VALUES (4, 250000, '2024-03-31', 4, 2);
INSERT INTO "public"."price" VALUES (23, 250000, '2024-03-31', 23, 2);
INSERT INTO "public"."price" VALUES (22, 250000, '2024-03-31', 22, 2);
INSERT INTO "public"."price" VALUES (24, 250000, '2024-03-31', 24, 2);
INSERT INTO "public"."price" VALUES (21, 250000, '2024-03-31', 21, 2);
INSERT INTO "public"."price" VALUES (25, 250000, '2024-03-31', 25, 2);

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
  "updated_by" int8,
  "price_id" int8
)
;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO "public"."product" VALUES (2, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/sbP3FH8/img2.png', 'Color Icons Tee', '2024-03-19', 't', '2024-03-19', 1, 1, 2);
INSERT INTO "public"."product" VALUES (3, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/BqRHK8H/img3.png', 'Dumb Heart Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL, 3);
INSERT INTO "public"."product" VALUES (5, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/C5MfS1q/img5.png', 'Dragowl Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL, 5);
INSERT INTO "public"."product" VALUES (6, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/Ns7jRHF/img6.png', 'Mixer Boxy Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL, 6);
INSERT INTO "public"."product" VALUES (7, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/wBMVLZL/img7.png', 'Cake Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL, 7);
INSERT INTO "public"."product" VALUES (9, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/y0nNwvc/img9.png', 'Metal Shirt', '2024-03-19', 't', '2024-03-19', NULL, NULL, 9);
INSERT INTO "public"."product" VALUES (18, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/PD8yRj8/img18.png', 'EMBROIDERY BASIC KHAKI SHORT', '2024-03-19', 't', '2024-03-19', NULL, NULL, 18);
INSERT INTO "public"."product" VALUES (20, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/tYBDN5N/img20.png', 'Metal Dress Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL, 20);
INSERT INTO "public"."product" VALUES (8, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/W5hj6Qd/img8.png', 'Short-sleeve Oxford Shirt', '2024-03-19', 't', '2024-03-19', NULL, NULL, 8);
INSERT INTO "public"."product" VALUES (10, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/SVg7Pyd/img10.png', 'Curves Jacket', '2024-03-19', 't', '2024-03-19', NULL, NULL, 10);
INSERT INTO "public"."product" VALUES (11, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/wcGvKVZ/img11.png', 'Line Track Jacket', '2024-03-19', 't', '2024-03-19', NULL, NULL, 11);
INSERT INTO "public"."product" VALUES (12, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/St92S7c/img12.png', 'Double Front Jacket', '2024-03-19', 't', '2024-03-19', NULL, NULL, 12);
INSERT INTO "public"."product" VALUES (13, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/xXNsjgW/img13.png', 'SIGNATURE ZIPPER HOODIE', '2024-03-19', 't', '2024-03-19', NULL, NULL, 13);
INSERT INTO "public"."product" VALUES (16, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/kHxW7sP/img16.png', 'Basic Short SS2', '2024-03-19', 't', '2024-03-19', NULL, NULL, 16);
INSERT INTO "public"."product" VALUES (17, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/nnQxmL1/img17.png', '2Boxes Khaki Short', '2024-03-19', 't', '2024-03-19', NULL, NULL, 17);
INSERT INTO "public"."product" VALUES (19, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/9NYJgQj/img19.png', 'Balloon Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL, 19);
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



', 'https://i.ibb.co/VJPcnkn/img23.png', 'Hindless Track Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL, 22);
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



', 'https://i.ibb.co/VJPcnkn/img23.png', 'Sidelines Parachute Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL, 23);
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



', 'https://i.ibb.co/FW3Dm0L/img24.png', 'Folded Parachute Pants', '2024-03-19', 'f', '2024-03-19', NULL, NULL, 24);
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



', 'https://i.ibb.co/tMgF4vp/img4.png', 'Crewman Tee', '2024-03-19', 't', '2024-03-19', NULL, NULL, 4);
INSERT INTO "public"."product" VALUES (1, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/xzLTzp4/img-1.webp', 'Venti Logo Tee ABC', '2024-03-19', 't', '2024-03-19', 1, 1, 1);
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



', 'https://i.ibb.co/hB1hWn6/img25.png', 'SIGNATURE DRESS PANTS', '2024-03-19', 't', '2024-03-19', NULL, NULL, 25);
INSERT INTO "public"."product" VALUES (14, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/nMGW7xq/img14.png', 'Basic Sweater V1.0', '2024-03-19', 't', '2024-03-19', NULL, NULL, 14);
INSERT INTO "public"."product" VALUES (15, 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.

• Chất liệu : Prime Cotton 100% – Vải mới siêu ưu việt. Dày dặn, thoáng mát, giảm nhăn đến 70% so với vải cotton thông thường.

• Size: S / M / L / XL

Form áo tôn dáng, phù hợp mọi phong cách, từ casual đến streetwear. Chất lượng đỉnh kout từ chất vải đến từng đường may tỉ mỉ, chiếc áo xinh xẻo này sẽ ko làm bae thất vọng! Mau mau rinh em nó về thui 💖😚', 'NOCTURNAL ® Venti Logo Tee

• Artwork sử dụng kỹ thuật in phồng size siêu to khổng lồ ấn tượng.



', 'https://i.ibb.co/FW2Nvgk/img15.png', 'Leather Varsity', '2024-03-19', 't', '2024-03-19', NULL, NULL, 15);
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



', 'https://i.ibb.co/Df488Fd/img21.png', 'Para Pants', '2024-03-19', 't', '2024-03-19', NULL, NULL, 21);

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
INSERT INTO "public"."product_categories" VALUES (17, 5);
INSERT INTO "public"."product_categories" VALUES (7, 2);
INSERT INTO "public"."product_categories" VALUES (1, 1);

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
INSERT INTO "public"."product_promotion" VALUES (3, 2);

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
INSERT INTO "public"."promotion" VALUES (2, '2024-03-14', 'Khuyến mãi hè', 15, '2024-05-30', 'Khuyến mãi hè', '2024-04-17', 't', 'https://i.ibb.co/xzLTzp4/img-1.webp', '2024-05-29', 2, 2);

-- ----------------------------
-- Table structure for refreshtoken
-- ----------------------------
DROP TABLE IF EXISTS "public"."refreshtoken";
CREATE TABLE "public"."refreshtoken" (
  "id" int8 NOT NULL,
  "expiry_date" timestamptz(6) NOT NULL,
  "token" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" int8
)
;

-- ----------------------------
-- Records of refreshtoken
-- ----------------------------
INSERT INTO "public"."refreshtoken" VALUES (5552, '2024-05-31 16:12:16.191483+07', '2f3bfad6-9717-46ab-b614-0b69c0100d21', 4);

-- ----------------------------
-- Table structure for resource_variation
-- ----------------------------
DROP TABLE IF EXISTS "public"."resource_variation";
CREATE TABLE "public"."resource_variation" (
  "id" int8 NOT NULL DEFAULT nextval('resource_variation_id_seq'::regclass),
  "resource_id" int8,
  "user_id" int8
)
;

-- ----------------------------
-- Records of resource_variation
-- ----------------------------
INSERT INTO "public"."resource_variation" VALUES (2, 1, 3);
INSERT INTO "public"."resource_variation" VALUES (3, 2, 2);
INSERT INTO "public"."resource_variation" VALUES (4, 3, 2);
INSERT INTO "public"."resource_variation" VALUES (1, 1, 2);
INSERT INTO "public"."resource_variation" VALUES (12, 2, 29);
INSERT INTO "public"."resource_variation" VALUES (13, 3, 29);
INSERT INTO "public"."resource_variation" VALUES (14, 1, 31);
INSERT INTO "public"."resource_variation" VALUES (17, 5, 31);

-- ----------------------------
-- Table structure for resource_variation_permissions
-- ----------------------------
DROP TABLE IF EXISTS "public"."resource_variation_permissions";
CREATE TABLE "public"."resource_variation_permissions" (
  "resource_variation_id" int8 NOT NULL,
  "permission_id" int8 NOT NULL
)
;

-- ----------------------------
-- Records of resource_variation_permissions
-- ----------------------------
INSERT INTO "public"."resource_variation_permissions" VALUES (2, 1);
INSERT INTO "public"."resource_variation_permissions" VALUES (2, 2);
INSERT INTO "public"."resource_variation_permissions" VALUES (3, 4);
INSERT INTO "public"."resource_variation_permissions" VALUES (4, 4);
INSERT INTO "public"."resource_variation_permissions" VALUES (1, 2);
INSERT INTO "public"."resource_variation_permissions" VALUES (3, 1);
INSERT INTO "public"."resource_variation_permissions" VALUES (12, 4);
INSERT INTO "public"."resource_variation_permissions" VALUES (12, 3);
INSERT INTO "public"."resource_variation_permissions" VALUES (13, 4);
INSERT INTO "public"."resource_variation_permissions" VALUES (17, 4);
INSERT INTO "public"."resource_variation_permissions" VALUES (14, 3);

-- ----------------------------
-- Table structure for resources
-- ----------------------------
DROP TABLE IF EXISTS "public"."resources";
CREATE TABLE "public"."resources" (
  "id" int8 NOT NULL DEFAULT nextval('resources_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of resources
-- ----------------------------
INSERT INTO "public"."resources" VALUES (5, 'ORDER');
INSERT INTO "public"."resources" VALUES (1, 'USER');
INSERT INTO "public"."resources" VALUES (3, 'POST');
INSERT INTO "public"."resources" VALUES (2, 'PRODUCT');
INSERT INTO "public"."resources" VALUES (4, 'CATEGORY');

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS "public"."reviews";
CREATE TABLE "public"."reviews" (
  "id" int8 NOT NULL DEFAULT nextval('reviews_id_seq'::regclass),
  "content" varchar(255) COLLATE "pg_catalog"."default",
  "is_deleted" bool NOT NULL,
  "rating" int4 NOT NULL,
  "reviewed_date" date,
  "status" bool NOT NULL,
  "type" int4 NOT NULL,
  "product_id" int8,
  "reviewed_by" int8,
  "order_detail_id" int8
)
;

-- ----------------------------
-- Records of reviews
-- ----------------------------
INSERT INTO "public"."reviews" VALUES (2, 'Sản phẩm đẹp!', 'f', 4, '2024-05-28', 't', 2, 2, 2, 7);
INSERT INTO "public"."reviews" VALUES (9, 'Vải đẹp!', 'f', 4, '2024-05-28', 't', 1, 3, 2, 8);

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
INSERT INTO "public"."roles" VALUES (3, 'SUPER_ADMIN');

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
INSERT INTO "public"."roles_users" VALUES (4, 1);
INSERT INTO "public"."roles_users" VALUES (5, 1);
INSERT INTO "public"."roles_users" VALUES (3, 2);
INSERT INTO "public"."roles_users" VALUES (29, 2);
INSERT INTO "public"."roles_users" VALUES (31, 2);
INSERT INTO "public"."roles_users" VALUES (32, 1);
INSERT INTO "public"."roles_users" VALUES (41, 2);

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
INSERT INTO "public"."size" VALUES (81, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 20);
INSERT INTO "public"."size" VALUES (38, '2024-05-29', 'XL', 't', 5, '2024-05-29', 2, 2, 9);
INSERT INTO "public"."size" VALUES (27, '2024-05-29', 'S', 't', 5, '2024-05-29', 2, 2, 7);
INSERT INTO "public"."size" VALUES (28, '2024-05-29', 'M', 't', 5, '2024-05-29', 2, 2, 7);
INSERT INTO "public"."size" VALUES (29, '2024-05-29', 'L', 't', 5, '2024-05-29', 2, 2, 7);
INSERT INTO "public"."size" VALUES (31, '2024-05-29', 'S', 't', 5, '2024-05-29', 2, 2, 8);
INSERT INTO "public"."size" VALUES (32, '2024-05-29', 'M', 't', 5, '2024-05-29', 2, 2, 8);
INSERT INTO "public"."size" VALUES (33, '2024-05-29', 'L', 't', 5, '2024-05-29', 2, 2, 8);
INSERT INTO "public"."size" VALUES (34, '2024-05-29', 'XL', 't', 5, '2024-05-29', 2, 2, 8);
INSERT INTO "public"."size" VALUES (22, '2024-05-29', 'XL', 't', 5, '2024-05-29', 2, 2, 5);
INSERT INTO "public"."size" VALUES (96, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 26);
INSERT INTO "public"."size" VALUES (35, '2024-05-29', 'S', 't', 5, '2024-05-29', 2, 2, 9);
INSERT INTO "public"."size" VALUES (36, '2024-05-29', 'M', 't', 5, '2024-05-29', 2, 2, 9);
INSERT INTO "public"."size" VALUES (37, '2024-05-29', 'L', 't', 5, '2024-05-29', 2, 2, 9);
INSERT INTO "public"."size" VALUES (20, '2024-05-29', 'M', 't', 5, '2024-05-29', 2, 2, 5);
INSERT INTO "public"."size" VALUES (23, '2024-05-29', 'S', 't', 1, '2024-05-29', 2, 2, 6);
INSERT INTO "public"."size" VALUES (40, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 10);
INSERT INTO "public"."size" VALUES (41, '2024-05-29', 'L', 't', 4, '2024-05-29', 2, 2, 10);
INSERT INTO "public"."size" VALUES (42, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 10);
INSERT INTO "public"."size" VALUES (43, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 11);
INSERT INTO "public"."size" VALUES (44, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 11);
INSERT INTO "public"."size" VALUES (45, '2024-05-29', 'L', 't', 4, '2024-05-29', 2, 2, 11);
INSERT INTO "public"."size" VALUES (47, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 12);
INSERT INTO "public"."size" VALUES (78, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 19);
INSERT INTO "public"."size" VALUES (26, '2024-05-29', 'XL', 't', 5, '2024-05-29', 2, 2, 6);
INSERT INTO "public"."size" VALUES (80, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 20);
INSERT INTO "public"."size" VALUES (82, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 21);
INSERT INTO "public"."size" VALUES (50, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 12);
INSERT INTO "public"."size" VALUES (46, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 11);
INSERT INTO "public"."size" VALUES (49, '2024-05-29', 'L', 't', 4, '2024-05-29', 2, 2, 12);
INSERT INTO "public"."size" VALUES (91, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 24);
INSERT INTO "public"."size" VALUES (90, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 23);
INSERT INTO "public"."size" VALUES (51, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 13);
INSERT INTO "public"."size" VALUES (89, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 23);
INSERT INTO "public"."size" VALUES (87, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 22);
INSERT INTO "public"."size" VALUES (86, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 22);
INSERT INTO "public"."size" VALUES (85, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 22);
INSERT INTO "public"."size" VALUES (84, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 21);
INSERT INTO "public"."size" VALUES (83, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 21);
INSERT INTO "public"."size" VALUES (24, '2024-05-29', 'M', 't', 5, '2024-05-29', 2, 2, 6);
INSERT INTO "public"."size" VALUES (52, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 13);
INSERT INTO "public"."size" VALUES (53, '2024-05-29', 'L', 't', 4, '2024-05-29', 2, 2, 13);
INSERT INTO "public"."size" VALUES (56, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 14);
INSERT INTO "public"."size" VALUES (57, '2024-05-29', 'L', 't', 4, '2024-05-29', 2, 2, 14);
INSERT INTO "public"."size" VALUES (58, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 14);
INSERT INTO "public"."size" VALUES (59, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 15);
INSERT INTO "public"."size" VALUES (60, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 15);
INSERT INTO "public"."size" VALUES (62, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 15);
INSERT INTO "public"."size" VALUES (63, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 16);
INSERT INTO "public"."size" VALUES (64, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 16);
INSERT INTO "public"."size" VALUES (107, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 30);
INSERT INTO "public"."size" VALUES (106, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 30);
INSERT INTO "public"."size" VALUES (104, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 29);
INSERT INTO "public"."size" VALUES (108, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 31);
INSERT INTO "public"."size" VALUES (103, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 29);
INSERT INTO "public"."size" VALUES (98, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 27);
INSERT INTO "public"."size" VALUES (48, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 12);
INSERT INTO "public"."size" VALUES (97, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 27);
INSERT INTO "public"."size" VALUES (95, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 26);
INSERT INTO "public"."size" VALUES (94, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 25);
INSERT INTO "public"."size" VALUES (93, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 25);
INSERT INTO "public"."size" VALUES (92, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 24);
INSERT INTO "public"."size" VALUES (77, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 19);
INSERT INTO "public"."size" VALUES (109, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 31);
INSERT INTO "public"."size" VALUES (66, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 16);
INSERT INTO "public"."size" VALUES (76, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 19);
INSERT INTO "public"."size" VALUES (74, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 18);
INSERT INTO "public"."size" VALUES (72, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 18);
INSERT INTO "public"."size" VALUES (71, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 18);
INSERT INTO "public"."size" VALUES (70, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 17);
INSERT INTO "public"."size" VALUES (69, '2024-05-29', 'L', 't', 4, '2024-05-29', 2, 2, 17);
INSERT INTO "public"."size" VALUES (68, '2024-05-29', 'M', 't', 4, '2024-05-29', 2, 2, 17);
INSERT INTO "public"."size" VALUES (67, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 17);
INSERT INTO "public"."size" VALUES (111, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 32);
INSERT INTO "public"."size" VALUES (112, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 32);
INSERT INTO "public"."size" VALUES (114, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 33);
INSERT INTO "public"."size" VALUES (115, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 33);
INSERT INTO "public"."size" VALUES (117, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 34);
INSERT INTO "public"."size" VALUES (118, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 34);
INSERT INTO "public"."size" VALUES (55, '2024-05-29', 'S', 't', 3, '2024-05-29', 2, 2, 14);
INSERT INTO "public"."size" VALUES (25, '2024-05-29', 'L', 't', 3, '2024-05-29', 2, 2, 6);
INSERT INTO "public"."size" VALUES (155, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 47);
INSERT INTO "public"."size" VALUES (154, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 46);
INSERT INTO "public"."size" VALUES (153, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 46);
INSERT INTO "public"."size" VALUES (152, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 46);
INSERT INTO "public"."size" VALUES (150, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 45);
INSERT INTO "public"."size" VALUES (119, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 34);
INSERT INTO "public"."size" VALUES (149, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 45);
INSERT INTO "public"."size" VALUES (147, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 44);
INSERT INTO "public"."size" VALUES (124, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 36);
INSERT INTO "public"."size" VALUES (121, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 35);
INSERT INTO "public"."size" VALUES (102, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 29);
INSERT INTO "public"."size" VALUES (101, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 28);
INSERT INTO "public"."size" VALUES (100, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 28);
INSERT INTO "public"."size" VALUES (131, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 39);
INSERT INTO "public"."size" VALUES (120, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 35);
INSERT INTO "public"."size" VALUES (130, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 38);
INSERT INTO "public"."size" VALUES (127, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 37);
INSERT INTO "public"."size" VALUES (126, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 37);
INSERT INTO "public"."size" VALUES (165, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 50);
INSERT INTO "public"."size" VALUES (166, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 50);
INSERT INTO "public"."size" VALUES (247, '2024-05-29', 'XL', 't', 0, '2024-05-29', 2, 2, 84);
INSERT INTO "public"."size" VALUES (21, '2024-05-29', 'L', 't', 8, '2024-05-29', 2, 2, 5);
INSERT INTO "public"."size" VALUES (248, '2024-05-29', 'S', 't', 0, '2024-05-29', 2, 2, 85);
INSERT INTO "public"."size" VALUES (122, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 36);
INSERT INTO "public"."size" VALUES (123, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 36);
INSERT INTO "public"."size" VALUES (254, '2024-05-29', 'L', 't', 0, '2024-05-29', 2, 2, 86);
INSERT INTO "public"."size" VALUES (255, '2024-05-29', 'XL', 't', 0, '2024-05-29', 2, 2, 86);
INSERT INTO "public"."size" VALUES (61, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 15);
INSERT INTO "public"."size" VALUES (99, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 28);
INSERT INTO "public"."size" VALUES (183, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 56);
INSERT INTO "public"."size" VALUES (184, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 56);
INSERT INTO "public"."size" VALUES (167, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 51);
INSERT INTO "public"."size" VALUES (240, '2024-05-29', 'M', 't', 0, '2024-05-29', 2, 2, 83);
INSERT INTO "public"."size" VALUES (168, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 51);
INSERT INTO "public"."size" VALUES (241, '2024-05-29', 'L', 't', 0, '2024-05-29', 2, 2, 83);
INSERT INTO "public"."size" VALUES (174, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 53);
INSERT INTO "public"."size" VALUES (175, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 53);
INSERT INTO "public"."size" VALUES (176, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 54);
INSERT INTO "public"."size" VALUES (151, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 45);
INSERT INTO "public"."size" VALUES (19, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 5);
INSERT INTO "public"."size" VALUES (156, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 47);
INSERT INTO "public"."size" VALUES (157, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 47);
INSERT INTO "public"."size" VALUES (158, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 48);
INSERT INTO "public"."size" VALUES (159, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 48);
INSERT INTO "public"."size" VALUES (249, '2024-05-29', 'M', 't', 0, '2024-05-29', 2, 2, 85);
INSERT INTO "public"."size" VALUES (250, '2024-05-29', 'L', 't', 0, '2024-05-29', 2, 2, 85);
INSERT INTO "public"."size" VALUES (105, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 30);
INSERT INTO "public"."size" VALUES (251, '2024-05-29', 'XL', 't', 0, '2024-05-29', 2, 2, 85);
INSERT INTO "public"."size" VALUES (252, '2024-05-29', 'S', 't', 0, '2024-05-29', 2, 2, 86);
INSERT INTO "public"."size" VALUES (30, '2024-05-29', 'XL', 't', 3, '2024-05-29', 2, 2, 7);
INSERT INTO "public"."size" VALUES (128, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 38);
INSERT INTO "public"."size" VALUES (133, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 39);
INSERT INTO "public"."size" VALUES (134, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 40);
INSERT INTO "public"."size" VALUES (135, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 40);
INSERT INTO "public"."size" VALUES (136, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 40);
INSERT INTO "public"."size" VALUES (137, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 41);
INSERT INTO "public"."size" VALUES (138, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 41);
INSERT INTO "public"."size" VALUES (139, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 41);
INSERT INTO "public"."size" VALUES (140, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 42);
INSERT INTO "public"."size" VALUES (141, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 42);
INSERT INTO "public"."size" VALUES (142, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 42);
INSERT INTO "public"."size" VALUES (143, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 43);
INSERT INTO "public"."size" VALUES (144, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 43);
INSERT INTO "public"."size" VALUES (145, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 43);
INSERT INTO "public"."size" VALUES (163, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 49);
INSERT INTO "public"."size" VALUES (164, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 50);
INSERT INTO "public"."size" VALUES (169, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 51);
INSERT INTO "public"."size" VALUES (170, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 52);
INSERT INTO "public"."size" VALUES (171, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 52);
INSERT INTO "public"."size" VALUES (172, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 52);
INSERT INTO "public"."size" VALUES (173, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 53);
INSERT INTO "public"."size" VALUES (177, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 54);
INSERT INTO "public"."size" VALUES (178, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 54);
INSERT INTO "public"."size" VALUES (179, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 55);
INSERT INTO "public"."size" VALUES (180, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 55);
INSERT INTO "public"."size" VALUES (181, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 55);
INSERT INTO "public"."size" VALUES (242, '2024-05-29', 'XL', 't', 0, '2024-05-29', 2, 2, 83);
INSERT INTO "public"."size" VALUES (243, '2024-05-29', 'S', 't', 0, '2024-05-29', 2, 2, 83);
INSERT INTO "public"."size" VALUES (244, '2024-05-29', 'S', 't', 0, '2024-05-29', 2, 2, 84);
INSERT INTO "public"."size" VALUES (245, '2024-05-29', 'M', 't', 0, '2024-05-29', 2, 2, 84);
INSERT INTO "public"."size" VALUES (246, '2024-05-29', 'L', 't', 0, '2024-05-29', 2, 2, 84);
INSERT INTO "public"."size" VALUES (253, '2024-05-29', 'M', 't', 0, '2024-05-29', 2, 2, 86);
INSERT INTO "public"."size" VALUES (39, '2024-05-29', 'S', 't', 4, '2024-05-29', 2, 2, 10);
INSERT INTO "public"."size" VALUES (182, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 56);
INSERT INTO "public"."size" VALUES (79, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 20);
INSERT INTO "public"."size" VALUES (88, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 23);
INSERT INTO "public"."size" VALUES (54, '2024-05-29', 'XL', 't', 4, '2024-05-29', 2, 2, 13);
INSERT INTO "public"."size" VALUES (65, '2024-05-29', 'L', 't', 4, '2024-05-29', 2, 2, 16);
INSERT INTO "public"."size" VALUES (73, '2024-05-29', 'L', 't', 4, '2024-05-29', 2, 2, 18);
INSERT INTO "public"."size" VALUES (75, '2024-05-29', 'S', 't', 6, '2024-05-29', 2, 2, 19);
INSERT INTO "public"."size" VALUES (110, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 31);
INSERT INTO "public"."size" VALUES (113, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 32);
INSERT INTO "public"."size" VALUES (116, '2024-05-29', 'XL', 't', 6, '2024-05-29', 2, 2, 33);
INSERT INTO "public"."size" VALUES (125, '2024-05-29', 'M', 't', 6, '2024-05-29', 2, 2, 37);
INSERT INTO "public"."size" VALUES (129, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 38);
INSERT INTO "public"."size" VALUES (132, '2024-05-29', 'L', 't', 6, '2024-05-29', 2, 2, 39);
INSERT INTO "public"."size" VALUES (146, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 44);
INSERT INTO "public"."size" VALUES (148, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 44);
INSERT INTO "public"."size" VALUES (160, '2024-05-29', 'XL', 't', 7, '2024-05-29', 2, 2, 48);
INSERT INTO "public"."size" VALUES (161, '2024-05-29', 'M', 't', 7, '2024-05-29', 2, 2, 49);
INSERT INTO "public"."size" VALUES (162, '2024-05-29', 'L', 't', 7, '2024-05-29', 2, 2, 49);

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
INSERT INTO "public"."user_info" VALUES (1, NULL, 'dinh37823@gmail.com', 'Dinh Huy Hoang', NULL, 1);
INSERT INTO "public"."user_info" VALUES (2, NULL, 'dinhhuyhoang1508@gmail.com', 'Dinh', NULL, 2);
INSERT INTO "public"."user_info" VALUES (3, NULL, 'huihiuhi@gmail.com', 'Huy', NULL, 3);
INSERT INTO "public"."user_info" VALUES (4, NULL, 'huihiuhdi@gmail.com', 'Huy', NULL, 4);
INSERT INTO "public"."user_info" VALUES (5, NULL, 'huihciuhi@gmail.com', 'Huy', NULL, 5);
INSERT INTO "public"."user_info" VALUES (21, NULL, '456@gmail.com', 'Hoang', NULL, 29);
INSERT INTO "public"."user_info" VALUES (24, 'https://i.ibb.co/yPsZj26/5a5e9d3e6811.gif', 'husihiuhi@gmail.com', 'Huy', '12312312311', 32);
INSERT INTO "public"."user_info" VALUES (23, NULL, 'prolaanhlk63@gmail.com', 'Hoàng Đinh', '0373131', 31);
INSERT INTO "public"."user_info" VALUES (33, NULL, '20130265@st.hcmuaf.edu.vn', 'Đinh Huy Hoàng', NULL, 41);

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
INSERT INTO "public"."users" VALUES (2, '2024-03-22', 't', '$2a$10$PtDIB6jguLhxveyJA6Lzmek1ubeGwKUX0nrp.WmlBqNlnV0fXTTw.', NULL, 'super-admin', NULL, NULL);
INSERT INTO "public"."users" VALUES (3, '2024-03-22', 't', '$2a$10$PtDIB6jguLhxveyJA6Lzmek1ubeGwKUX0nrp.WmlBqNlnV0fXTTw.', NULL, 'hine', NULL, NULL);
INSERT INTO "public"."users" VALUES (4, '2024-03-22', 't', '$2a$10$PtDIB6jguLhxveyJA6Lzmek1ubeGwKUX0nrp.WmlBqNlnV0fXTTw.', NULL, 'hine2', NULL, NULL);
INSERT INTO "public"."users" VALUES (5, '2024-03-22', 't', '$2a$10$PtDIB6jguLhxveyJA6Lzmek1ubeGwKUX0nrp.WmlBqNlnV0fXTTw.', NULL, 'hine3', NULL, NULL);
INSERT INTO "public"."users" VALUES (29, '2024-04-11', 't', '$2a$10$8wHyv1xAgjgNeJ4otEmvL.4xUvdj/WtjiryqYw/sN/6gXnIWMANhy', '2024-04-11', 'prolaanhlk', 2, 2);
INSERT INTO "public"."users" VALUES (32, '2024-03-22', 't', '$2a$10$PtDIB6jguLhxveyJA6Lzmek1ubeGwKUX0nrp.WmlBqNlnV0fXTTw.', '2024-05-28', 'hine4', NULL, 2);
INSERT INTO "public"."users" VALUES (31, '2024-04-11', 't', '$2a$10$A/DTo5kLtwf4SA1y6.zuSOZQqBubhsswfnDo7J3ZpBQQY7RgfzXIO', '2024-05-30', 'prolaanh', 2, 2);
INSERT INTO "public"."users" VALUES (1, '2024-03-22', 't', '$2a$10$.jjCE71IFp/jaWAKBWBkUe7JnAgLuUL1I9BbgsSZ6dUevelkBnZF6', NULL, 'dinh37823', NULL, NULL);
INSERT INTO "public"."users" VALUES (41, '2024-05-30', 't', '$2a$10$J5t7DoeGcNscK5lxaHReTuZMRKxgAmDRg6RU7dEevVIsEb3G8phRe', '2024-05-30', 'demo', NULL, NULL);

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
  "updated_by" int8,
  "color_code" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of variation
-- ----------------------------
INSERT INTO "public"."variation" VALUES (53, 'Đen', '2024-05-29', 't', '2024-05-29', 24, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (55, 'Đen', '2024-05-29', 't', '2024-05-29', 25, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (51, 'Xám', '2024-05-29', 't', '2024-05-29', 22, 2, 2, '#7D7D7D');
INSERT INTO "public"."variation" VALUES (12, 'Hồng', '2024-05-29', 't', '2024-05-29', 4, 2, 2, '#FF65C3');
INSERT INTO "public"."variation" VALUES (17, 'Hồng', '2024-05-29', 't', '2024-05-29', 6, 2, 2, '#FF65C3');
INSERT INTO "public"."variation" VALUES (36, 'Đen', '2024-05-29', 't', '2024-05-29', 16, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (37, 'Đen', '2024-05-29', 't', '2024-05-29', 16, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (5, 'Đen', '2024-05-29', 't', '2024-05-29', 2, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (40, 'Đen', '2024-05-29', 't', '2024-05-29', 18, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (44, 'Be', '2024-05-29', 't', '2024-05-29', 19, 2, 2, '#E2CBA9');
INSERT INTO "public"."variation" VALUES (41, 'Đen', '2024-05-29', 't', '2024-05-29', 18, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (83, 'Đen', '2024-05-29', 't', '2024-05-29', 1, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (6, 'Trắng', '2024-05-29', 't', '2024-05-29', 2, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (38, 'Trắng', '2024-05-29', 't', '2024-05-29', 16, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (42, 'Trắng', '2024-05-29', 't', '2024-05-29', 18, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (7, 'Đen', '2024-05-29', 't', '2024-05-29', 3, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (8, 'Trắng', '2024-05-29', 't', '2024-05-29', 3, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (11, 'Trắng', '2024-05-29', 't', '2024-05-29', 4, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (21, 'Xanh', '2024-05-29', 't', '2024-05-29', 8, 2, 2, '#E2CBA9');
INSERT INTO "public"."variation" VALUES (84, 'Xanh', '2024-05-29', 't', '2024-05-29', 1, 2, 2, '#E2CBA9');
INSERT INTO "public"."variation" VALUES (19, 'Kem', '2024-05-29', 't', '2024-05-29', 7, 2, 2, '#FEE5B1');
INSERT INTO "public"."variation" VALUES (16, 'Trắng', '2024-05-29', 't', '2024-05-29', 6, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (23, 'Trắng', '2024-05-29', 't', '2024-05-29', 9, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (27, 'Kem', '2024-05-29', 't', '2024-05-29', 11, 2, 2, '#FEE5B1');
INSERT INTO "public"."variation" VALUES (45, 'Đen', '2024-05-29', 't', '2024-05-29', 19, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (9, 'Đen', '2024-05-29', 't', '2024-05-29', 4, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (14, 'Đen', '2024-05-29', 't', '2024-05-29', 5, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (18, 'Đen', '2024-05-29', 't', '2024-05-29', 7, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (22, 'Đen', '2024-05-29', 't', '2024-05-29', 9, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (24, 'Đen', '2024-05-29', 't', '2024-05-29', 10, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (26, 'Đen', '2024-05-29', 't', '2024-05-29', 11, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (28, 'Đen', '2024-05-29', 't', '2024-05-29', 12, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (29, 'Đen', '2024-05-29', 't', '2024-05-29', 13, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (32, 'Đen', '2024-05-29', 't', '2024-05-29', 14, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (35, 'Đen', '2024-05-29', 't', '2024-05-29', 15, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (46, 'Đen', '2024-05-29', 't', '2024-05-29', 20, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (33, 'Trắng', '2024-05-29', 't', '2024-05-29', 14, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (50, 'Trắng', '2024-05-29', 't', '2024-05-29', 22, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (56, 'Trắng', '2024-05-29', 't', '2024-05-29', 25, 2, 2, '#F6F2F1');
INSERT INTO "public"."variation" VALUES (48, 'Đen', '2024-05-29', 't', '2024-05-29', 21, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (47, 'Xanh Rêu', '2024-05-29', 't', '2024-05-29', 20, 2, 2, '#355F3B');
INSERT INTO "public"."variation" VALUES (54, 'Xanh Rêu', '2024-05-29', 't', '2024-05-29', 24, 2, 2, '#355F3B');
INSERT INTO "public"."variation" VALUES (13, 'Xanh Rêu', '2024-05-29', 't', '2024-05-29', 4, 2, 2, '#355F3B');
INSERT INTO "public"."variation" VALUES (39, 'Xám', '2024-05-29', 't', '2024-05-29', 17, 2, 2, '#7D7D7D');
INSERT INTO "public"."variation" VALUES (49, 'Đen', '2024-05-29', 't', '2024-05-29', 22, 2, 2, '#000000');
INSERT INTO "public"."variation" VALUES (15, 'Đỏ', '2024-05-29', 't', '2024-05-29', 5, 2, 2, '#FA0303');
INSERT INTO "public"."variation" VALUES (86, 'Đỏ', '2024-05-29', 't', '2024-05-29', 1, 2, 2, '#FA0303');
INSERT INTO "public"."variation" VALUES (20, 'Đỏ', '2024-05-29', 't', '2024-05-29', 8, 2, 2, '#FA0303');
INSERT INTO "public"."variation" VALUES (43, 'Xám', '2024-05-29', 't', '2024-05-29', 18, 2, 2, '#7D7D7D');
INSERT INTO "public"."variation" VALUES (30, 'Kem', '2024-05-29', 't', '2024-05-29', 13, 2, 2, '#FEE5B1');
INSERT INTO "public"."variation" VALUES (10, 'Cacao', '2024-05-29', 't', '2024-05-29', 4, 2, 2, '#6B5555');
INSERT INTO "public"."variation" VALUES (85, 'Cacao', '2024-05-29', 't', '2024-05-29', 1, 2, 2, '#6B5555');
INSERT INTO "public"."variation" VALUES (25, 'Xám', '2024-05-29', 't', '2024-05-29', 10, 2, 2, '#7D7D7D');
INSERT INTO "public"."variation" VALUES (31, 'Xám', '2024-05-29', 't', '2024-05-29', 13, 2, 2, '#7D7D7D');
INSERT INTO "public"."variation" VALUES (34, 'Xám', '2024-05-29', 't', '2024-05-29', 14, 2, 2, '#7D7D7D');
INSERT INTO "public"."variation" VALUES (52, 'Đen', '2024-05-29', 't', '2024-05-29', 23, 2, 2, '#000000');

-- ----------------------------
-- Table structure for webhook
-- ----------------------------
DROP TABLE IF EXISTS "public"."webhook";
CREATE TABLE "public"."webhook" (
  "id" int8 NOT NULL DEFAULT nextval('webhook_id_seq'::regclass),
  "cancel" bool NOT NULL,
  "code" varchar(255) COLLATE "pg_catalog"."default",
  "order_code" varchar(255) COLLATE "pg_catalog"."default",
  "signature" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "success" bool NOT NULL
)
;

-- ----------------------------
-- Records of webhook
-- ----------------------------
INSERT INTO "public"."webhook" VALUES (29, 't', '00', '1716584696', NULL, 'CANCELLED', 'f');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."blogs_id_seq"
OWNED BY "public"."blogs"."id";
SELECT setval('"public"."blogs_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."categories_id_seq"
OWNED BY "public"."categories"."id";
SELECT setval('"public"."categories_id_seq"', 1, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."contact_id_seq"
OWNED BY "public"."contact"."id";
SELECT setval('"public"."contact_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."img_product_id_seq"
OWNED BY "public"."img_product"."id";
SELECT setval('"public"."img_product_id_seq"', 71, true);

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
SELECT setval('"public"."order_detail_id_seq"', 20, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_status_history_id_seq"
OWNED BY "public"."order_status_history"."id";
SELECT setval('"public"."order_status_history_id_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_status_id_seq"
OWNED BY "public"."order_status"."id";
SELECT setval('"public"."order_status_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."orders_id_seq"
OWNED BY "public"."orders"."id";
SELECT setval('"public"."orders_id_seq"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."permissions_id_seq"
OWNED BY "public"."permissions"."id";
SELECT setval('"public"."permissions_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."price_id_seq"
OWNED BY "public"."price"."id";
SELECT setval('"public"."price_id_seq"', 28, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_id_seq"
OWNED BY "public"."product"."id";
SELECT setval('"public"."product_id_seq"', 107, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."promotion_id_seq"
OWNED BY "public"."promotion"."id";
SELECT setval('"public"."promotion_id_seq"', 2, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."refreshtoken_seq"', 5601, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."resource_variation_id_seq"
OWNED BY "public"."resource_variation"."id";
SELECT setval('"public"."resource_variation_id_seq"', 24, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."resources_id_seq"
OWNED BY "public"."resources"."id";
SELECT setval('"public"."resources_id_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."reviews_id_seq"
OWNED BY "public"."reviews"."id";
SELECT setval('"public"."reviews_id_seq"', 7, true);

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
SELECT setval('"public"."size_id_seq"', 276, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_info_id_seq"
OWNED BY "public"."user_info"."id";
SELECT setval('"public"."user_info_id_seq"', 33, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 41, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."variation_id_seq"
OWNED BY "public"."variation"."id";
SELECT setval('"public"."variation_id_seq"', 99, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."webhook_id_seq"
OWNED BY "public"."webhook"."id";
SELECT setval('"public"."webhook_id_seq"', 29, true);

-- ----------------------------
-- Primary Key structure for table blogs
-- ----------------------------
ALTER TABLE "public"."blogs" ADD CONSTRAINT "blogs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table categories
-- ----------------------------
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table contact
-- ----------------------------
ALTER TABLE "public"."contact" ADD CONSTRAINT "contact_pkey" PRIMARY KEY ("id");

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
-- Uniques structure for table order_detail
-- ----------------------------
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "uk_3u6qtcw66edyu2pr514rckqbo" UNIQUE ("review_id");

-- ----------------------------
-- Primary Key structure for table order_detail
-- ----------------------------
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "order_detail_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table order_status
-- ----------------------------
ALTER TABLE "public"."order_status" ADD CONSTRAINT "order_status_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table order_status_history
-- ----------------------------
ALTER TABLE "public"."order_status_history" ADD CONSTRAINT "order_status_history_pkey" PRIMARY KEY ("id");

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
-- Uniques structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "uk_rs2iqes6ryntdb52d2vqpjirh" UNIQUE ("price_id");

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
ALTER TABLE "public"."refreshtoken" ADD CONSTRAINT "uk_81otwtvdhcw7y3ipoijtlb1g3" UNIQUE ("user_id");

-- ----------------------------
-- Primary Key structure for table refreshtoken
-- ----------------------------
ALTER TABLE "public"."refreshtoken" ADD CONSTRAINT "refreshtoken_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table resource_variation
-- ----------------------------
ALTER TABLE "public"."resource_variation" ADD CONSTRAINT "resource_variation_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table resources
-- ----------------------------
ALTER TABLE "public"."resources" ADD CONSTRAINT "resources_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table reviews
-- ----------------------------
ALTER TABLE "public"."reviews" ADD CONSTRAINT "uk_pdoxdvhk6k612mlg4cdpr6rgn" UNIQUE ("order_detail_id");

-- ----------------------------
-- Primary Key structure for table reviews
-- ----------------------------
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

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
-- Primary Key structure for table webhook
-- ----------------------------
ALTER TABLE "public"."webhook" ADD CONSTRAINT "webhook_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table blogs
-- ----------------------------
ALTER TABLE "public"."blogs" ADD CONSTRAINT "fk2o77ydbpqak4c9usc825x5qyo" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."blogs" ADD CONSTRAINT "fkjidd8cjtc34c0i5h0f88x062t" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE "public"."import_invoices" ADD CONSTRAINT "fkfjc34t3fayxclf908bohk115e" FOREIGN KEY ("size_id") REFERENCES "public"."size" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."import_invoices" ADD CONSTRAINT "fkkcxv16x6b0ntpaws14wtk1cc1" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."import_invoices" ADD CONSTRAINT "fkmrflrcorkr2r5tv7fns505nvi" FOREIGN KEY ("variation_id") REFERENCES "public"."variation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table log
-- ----------------------------
ALTER TABLE "public"."log" ADD CONSTRAINT "fkefuitn33qkpy6nonixjyyu3u0" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table order_detail
-- ----------------------------
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "fk99odrxqoo46o2j89j5xkn45uo" FOREIGN KEY ("variation_id") REFERENCES "public"."variation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "fkasuecybhagr9jmcjppi3mubiq" FOREIGN KEY ("size_id") REFERENCES "public"."size" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "fkb8bg2bkty0oksa3wiq5mp5qnc" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "fkgmbmiof4rjy07kou61x1qwutq" FOREIGN KEY ("review_id") REFERENCES "public"."reviews" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."order_detail" ADD CONSTRAINT "fkrws2q0si6oyd6il8gqe2aennc" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table order_status_history
-- ----------------------------
ALTER TABLE "public"."order_status_history" ADD CONSTRAINT "fk1k1lx20u4syfmvebwdv95qgub" FOREIGN KEY ("status_id") REFERENCES "public"."order_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."order_status_history" ADD CONSTRAINT "fknmcbg3mmbt8wfva97ra40nmp3" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "fk1abokg3ghque9pf2ujbxakng" FOREIGN KEY ("status_id") REFERENCES "public"."order_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."orders" ADD CONSTRAINT "fk32ql8ubntj5uh44ph9659tiih" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table price
-- ----------------------------
ALTER TABLE "public"."price" ADD CONSTRAINT "fkk4mbgqf5yru5ib5b6w5l6ukkj" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."price" ADD CONSTRAINT "fksvnafk3t6d97lxxm4rhs7jsny" FOREIGN KEY ("updated_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "fk2l5ugesxirs8wp4iqcmji7g8m" FOREIGN KEY ("price_id") REFERENCES "public"."price" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
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
-- Foreign Keys structure for table refreshtoken
-- ----------------------------
ALTER TABLE "public"."refreshtoken" ADD CONSTRAINT "fka652xrdji49m4isx38pp4p80p" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table resource_variation
-- ----------------------------
ALTER TABLE "public"."resource_variation" ADD CONSTRAINT "fk9k5o2912njohrv0c2x14ukfm" FOREIGN KEY ("resource_id") REFERENCES "public"."resources" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."resource_variation" ADD CONSTRAINT "fkpokxfmto6v3lgy3iseannb2t9" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table resource_variation_permissions
-- ----------------------------
ALTER TABLE "public"."resource_variation_permissions" ADD CONSTRAINT "fk546e9uircy14y8jaotuoh72tb" FOREIGN KEY ("resource_variation_id") REFERENCES "public"."resource_variation" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."resource_variation_permissions" ADD CONSTRAINT "fk960kb808521l7mga01cae503b" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table reviews
-- ----------------------------
ALTER TABLE "public"."reviews" ADD CONSTRAINT "fk7k2jqjfeof9hvds3j5b7rk53b" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."reviews" ADD CONSTRAINT "fk9yqmlf28ges8c30nj4v4hva7t" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."reviews" ADD CONSTRAINT "fkletxjv0aqobvsg4fp8vnu74xn" FOREIGN KEY ("order_detail_id") REFERENCES "public"."order_detail" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

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
