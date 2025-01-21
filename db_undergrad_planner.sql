-- MySQL dump 10.13  Distrib 9.2.0, for macos15 (arm64)
--
-- Host: localhost    Database: undergrad_planner
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `snum` decimal(9,0) NOT NULL,
  `sname` varchar(30) DEFAULT NULL,
  `major` varchar(25) DEFAULT NULL,
  `standing` varchar(2) DEFAULT NULL,
  `age` decimal(3,0) DEFAULT NULL,
  PRIMARY KEY (`snum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (51135593,'Maria White','English','SR',21),(60839453,'Charles Harris','Architecture','SR',22),(99354543,'Susan Martin','Law','JR',20),(112348546,'Joseph Thompson','Computer Science','SO',19),(115987938,'Christopher Garcia','Computer Science','JR',20),(132977562,'Angela Martinez','History','SR',20),(269734834,'Thomas Robinson','Psychology','SO',18),(280158572,'Margaret Clark','Animal Science','FR',18),(301221823,'Juan Rodriguez','Psychology','JR',20),(318548912,'Dorthy Lewis','Finance','FR',18),(320874981,'Daniel Lee','Electrical Engineering','FR',17),(322654189,'Lisa Walker','Computer Science','SO',17),(348121549,'Paul Hall','Computer Science','JR',18),(351565322,'Nancy Allen','Accounting','JR',19),(451519864,'Mark Young','Finance','FR',18),(455798411,'Luis Hernandez','Electrical Engineering','FR',17),(462156489,'Donald King','Mechanical Engineering','SO',19),(550156548,'George Wright','Education','SR',21),(552455318,'Ana Lopez','Computer Engineering','SR',19),(556784565,'Kenneth Hill','Civil Engineering','SR',21),(567354612,'Karen Scott','Computer Engineering','FR',18),(573284895,'Steven Green','Kinesiology','SO',19),(574489456,'Betty Adams','Economics','JR',20),(578875478,'Edward Baker','Veterinary Medicine','SR',21);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-21 11:18:49
