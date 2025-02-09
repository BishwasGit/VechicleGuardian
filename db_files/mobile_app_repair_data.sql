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
-- Table structure for table `repair_data`
--

DROP TABLE IF EXISTS `repair_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repair_data` (
  `repairData_id` int NOT NULL AUTO_INCREMENT,
  `vehicleDetails_id` int DEFAULT NULL,
  `repaircenter_workers_id` int DEFAULT NULL,
  `repair_date` varchar(45) DEFAULT NULL,
  `total_cost` varchar(45) DEFAULT NULL,
  `changes_made` text,
  `completion_time` text,
  `pdf_url` varchar(500) DEFAULT NULL,
  `markedCompleted` enum('YES','NO') DEFAULT 'NO',
  PRIMARY KEY (`repairData_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair_data`
--

LOCK TABLES `repair_data` WRITE;
/*!40000 ALTER TABLE `repair_data` DISABLE KEYS */;
INSERT INTO `repair_data` VALUES (1,2,1,'3/4/2024, 10:40 PM','38000','[{\"changesMade\":\"Brake oil \",\"cost\":\"15000\"},{\"changesMade\":\"Engine repair\",\"cost\":\"23000\"}]','3/4/2024, 10:40 PM','https://res.cloudinary.com/dpftkbsu6/image/upload/v1709571329/invoice/gys0bokqpdmu0hj8h3fl.pdf','NO'),(3,2,1,'3/5/2024, 2:47 PM','13456','[{\"changesMade\":\"Testing\",\"cost\":\"13456\"}]','3/5/2024, 2:47 PM','https://res.cloudinary.com/dpftkbsu6/image/upload/v1709629379/invoice/y3udagzqxobe8bxdpwvv.pdf','NO'),(4,3,1,'3/5/2024, 3:15 PM','12000','[{\"changesMade\":\"Test\",\"cost\":\"12000\"}]','3/5/2024, 3:15 PM','https://res.cloudinary.com/dpftkbsu6/image/upload/v1709631020/invoice/iwavahhyvisggi5oqghn.pdf','NO'),(5,2,1,'3/5/2024, 3:16 PM','12000','[{\"changesMade\":\"Testinggg\",\"cost\":\"12000\"}]','3/5/2024, 3:16 PM','https://res.cloudinary.com/dpftkbsu6/image/upload/v1709631093/invoice/pnf3ekrdlnpailh9c4pc.pdf','NO'),(6,3,1,'3/5/2024, 3:18 PM','20000','[{\"changesMade\":\"Final testing \",\"cost\":\"20000\"}]','3/5/2024, 3:18 PM','https://res.cloudinary.com/dpftkbsu6/image/upload/v1709631191/invoice/egmdfvt9prek9zax1a6a.pdf','NO');
/*!40000 ALTER TABLE `repair_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 11:40:43
