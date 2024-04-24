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
-- Table structure for table `vehicle_companies`
--

DROP TABLE IF EXISTS `vehicle_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_companies` (
  `companies_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(45) DEFAULT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`companies_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_companies`
--

LOCK TABLES `vehicle_companies` WRITE;
/*!40000 ALTER TABLE `vehicle_companies` DISABLE KEYS */;
INSERT INTO `vehicle_companies` VALUES (1,'Suzuki','https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2.svg'),(3,'Toyota','https://brand.toyota.com/content/dam/brandhub/guidelines/logo/two-column/BHUB_Logo_ToyotaLogo_01.svg'),(4,'Ford','https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg'),(5,'BMW','https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg'),(6,'Nissan','https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg'),(7,'Chevrolet','https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2.svg'),(8,'Mercedes-Benz','https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg'),(9,'Audi','https://brand.toyota.com/content/dam/brandhub/guidelines/logo/two-column/BHUB_Logo_ToyotaLogo_01.svg'),(10,'Hyundai','https://di-uploads-pod5.dealerinspire.com/triplejsaipan/uploads/2018/05/HyundaiLogoStacked_4cblk-1024x659.gif');
/*!40000 ALTER TABLE `vehicle_companies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 13:58:19
