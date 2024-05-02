-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ims
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inventories`
--

DROP TABLE IF EXISTS `inventories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventories` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_uuid` varchar(255) DEFAULT NULL,
  `seller_uuid` varchar(255) DEFAULT NULL,
  `model_id` int DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `item_description` text,
  `item_quantity` int DEFAULT NULL,
  `item_price` decimal(10,2) DEFAULT NULL,
  `selling_price` decimal(10,2) DEFAULT NULL,
  `item_image` varchar(255) DEFAULT NULL,
  `item_for_sale` enum('0','1') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventories`
--

LOCK TABLES `inventories` WRITE;
/*!40000 ALTER TABLE `inventories` DISABLE KEYS */;
INSERT INTO `inventories` VALUES (5,'efa4dfb4-2w2d-48sse-98a6-114awe4930d8','4d276e29-7983-4a7c-91a8-788af52f3396',1,'1','Exhaust-NS-200','Bajaj Genuine Silencer and Exhaust Pipe for Bajaj Pulsar 200NS with 200cc DTSi Engine in authentic quality and price. Express delivery across India',19,70.00,80.00,'https://w7.pngwing.com/pngs/912/899/png-transparent-exhaust-system-car-aftermarket-exhaust-parts-catalytic-converter-exhaust-gas-exhaust-system-exhaust-system-angle-car-thumbnail.png','0','2024-02-25 01:07:39','2024-04-24 06:35:57'),(6,'efa4feb4-092d-489e-98a6-114adb4930d8','4d276e29-7983-4a7c-91a8-788af52f3396',1,'1','Brakes','Brakes are responsible for slowing the motorcycle or bringing it to a complete stop.',20,120.00,135.00,'https://w7.pngwing.com/pngs/494/288/png-transparent-car-disc-brake-brembo-brake-wear-indicator-car-car-automobile-repair-shop-vehicle-thumbnail.png','0','2024-04-14 11:32:20','2024-04-24 06:35:57');
/*!40000 ALTER TABLE `inventories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 11:40:30
