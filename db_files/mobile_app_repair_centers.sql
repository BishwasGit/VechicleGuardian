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
-- Table structure for table `repair_centers`
--

DROP TABLE IF EXISTS `repair_centers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair_centers` (
  `repaircenters_id` int NOT NULL AUTO_INCREMENT,
  `repaircenter_id` int unsigned DEFAULT NULL,
  `repaircenter_fname` varchar(200) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `map` varchar(255) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `documents` varchar(500) DEFAULT NULL,
  `status` int DEFAULT '1',
  `verification` varchar(20) DEFAULT 'NotVerified',
  PRIMARY KEY (`repaircenters_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair_centers`
--

LOCK TABLES `repair_centers` WRITE;
/*!40000 ALTER TABLE `repair_centers` DISABLE KEYS */;
INSERT INTO `repair_centers` VALUES (1,1,'bajaj repari center','kalimati,kathmandu','27.689878091287703, 85.28768927582482','9869233345','https://asset.cloudinary.com/dpftkbsu6/da21061a4c53be3d19303d7c129041e1',1,'Verified'),(2,1,'Ripetixe','Sitapaila,Kathmandu','27.688994614545774, 85.28788244432107','9804887299','https://asset.cloudinary.com/dpftkbsu6/da21061a4c53be3d19303d7c129041e1',1,'Verified');
/*!40000 ALTER TABLE `repair_centers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-14 23:50:14
