-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mobile_app
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
-- Table structure for table `vehicle_details`
--

DROP TABLE IF EXISTS `vehicle_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_details` (
  `vehicleDetails_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `vehicle_type` varchar(45) DEFAULT NULL,
  `vehicle_number` varchar(45) DEFAULT NULL,
  `vehicle_lot_number` int DEFAULT NULL,
  `vehicle_company` varchar(45) DEFAULT NULL,
  `vehicle_model` varchar(45) DEFAULT NULL,
  `bill_book_details` text,
  `images` text,
  `status` int DEFAULT '1',
  `vehicle_for_income` int DEFAULT '0',
  PRIMARY KEY (`vehicleDetails_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_details`
--

LOCK TABLES `vehicle_details` WRITE;
/*!40000 ALTER TABLE `vehicle_details` DISABLE KEYS */;
INSERT INTO `vehicle_details` VALUES (1,1,'Two Wheeler','0525',60,'Suzuki','Breeza1200','{\"createdDate\":\"2023-03-02\",\"expiryDate\":\"2025-04-12\",\"ownerName\":\"Raju shrestha\",\"contactNumber\":\"9869133344\"}','{\"vehicleImage\":\"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540bishwasexpo%252FMobileApp/ImagePicker/aac3c3d7-b0b3-4e47-b75b-6bea57d3dd10.jpeg\",\"billBookImage\":\"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540bishwasexpo%252FMobileApp/ImagePicker/9784db59-d7ab-4716-a634-828272bb820d.jpeg\"}',1,1),(2,1,'Four Wheeler','8777',77,'Gghuuh','Vghthv','{\"createdDate\":\"3223-44-44\",\"expiryDate\":\"2222-55-44\",\"ownerName\":\"Sdghhhuu\",\"contactNumber\":\"9879466655\"}','{\"vehicleImage\":\"https://res.cloudinary.com/dpftkbsu6/image/upload/v1704621787/bill_book_image_9e0905e5-e51f-4382-9cac-a82c7b8ce453.jpg\",\"billBookImage\":\"https://res.cloudinary.com/dpftkbsu6/image/upload/v1704621814/bill_book_image_8bcad5bd-42eb-43ed-a07b-beff863fd26b.jpg\"}',1,1),(3,1,'Four Wheeler','9903',89,'Suzuui','Bireeez','{\"createdDate\":\"2089-88-22\",\"expiryDate\":\"2909-80-12\",\"ownerName\":\"Bishwas\",\"contactNumber\":\"9803466798\"}','{\"vehicleImage\":\"https://res.cloudinary.com/dpftkbsu6/image/upload/v1708337436/vehicle_image_105785bc-cd61-440f-b4ce-9f28664809e7.jpg\",\"billBookImage\":\"https://res.cloudinary.com/dpftkbsu6/image/upload/v1708337457/bill_book_image_aaa482bc-0a9e-4dee-9ecb-e96c9c039971.jpg\"}',1,1);
/*!40000 ALTER TABLE `vehicle_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-25 14:24:07
