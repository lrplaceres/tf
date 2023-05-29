-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: tf1
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `uid` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `price` float NOT NULL,
  `category` varchar(100) NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('02077527-bf9b-4bef-abcb-35f8950da57c','Tequila Olmeca Reposado','',450,'Shots',1),('a15f050d-8ba8-4ad3-adde-d9cf0f85f235','Cohiba Extra Pirámide','',1000,'Cigarros',1),('553cb934-3484-495a-bb33-b92d076c1a1f','Hookah','',2500,'Cigarros',1),('7259ee5a-dc67-47ae-bfe5-17e2826b9f8a','Cuba Libre','',300,'Coctelería',1),('724764f3-143d-4330-9c5e-3202d856cdec','Cubanito','',350,'Coctelería',1),('3ca991a5-eab4-49a5-ac0d-50979e08b55f','Calimocho','',300,'Coctelería',1),('0590950d-fa04-4121-88ec-76f341fa3cc4','Blood Mary','',350,'Coctelería',1),('cc6aa2a7-3629-4825-8f8c-6a2c78e9ecdd','Alexander','',350,'Coctelería',1),('1f5099a5-3a83-47d1-a69b-3d1deaa76b44','Montecristo Pirámide No.2','',750,'Cigarros',1),('8165ab7a-b7ad-464c-b5e2-3d5466e681e2','Línea de Oro Romeo y Julieta','',800,'Cigarros',1),('4f6f881e-bc27-42d9-9b74-120b1d9080d9','Cubata','',350,'Coctelería',1),('d5a4f776-966f-4fcf-80a6-14507ec80b85','Lamborghini','',500,'Coctelería',1),('f2d1bccf-1a45-41e0-93a7-f29f5d9a8365','Creama Ruavieja','',500,'Cremas',1),('379b042a-d212-44b9-afe1-4073364b7af8','Jaguermeifter','',500,'Licores',1),('27da4954-221c-42d0-ab13-46e25d864e4a','Martell','',400,'Cognac',1),('de696c11-dd1f-4ac8-90e4-fd6f65b07477','Torres 15','',600,'Brandy',1),('33d6ae0b-8cc9-49bb-b683-6c077e34f22c','Glen Livet','',750,'Whisky',1),('cc37293a-5b2d-4816-8078-fe76d7eb0f0b','Chivas Regal 25','',2500,'Whisky',1),('e6a00d2a-a685-4a1f-a922-8c3ffedcb99e','Ballantines 12','',650,'Whisky',1),('6f4941fb-35f9-40f0-86ba-3ac059e32467','Clan Cambell','',450,'Whisky',1),('c594a31b-8c5b-42f3-8bc5-6c1e00cbeb0e','Jhonie Walker Red Label','',650,'Whisky',1),('c928784f-eb4d-40cc-abf4-eee9a55d1a65','Jameson','',450,'Whisky',1),('cde675e5-4382-483a-ae67-7a8a1c174fcf','Black & White','',450,'Whisky',1),('143630b6-c52d-4762-8020-4a86e1db4dce','River Queen','',300,'Whisky',1),('f4befadc-2a0a-4a37-a146-7d0e70dd68fc','Old Premier','',250,'Whisky',1),('4f73aa98-0dc6-4a8c-9c13-e1a5571e72c7','Havana Club 7 años','',280,'Rones',1),('3113fdd2-9add-4cb7-b772-f67e3ab9fb13','Ron Santiago 11','',350,'Rones',1),('8b65b52e-3901-4a25-8a5d-0617e76a6722','Havana Club Unión','',300,'Rones',1),('4453f6c4-c336-4650-954b-54c8476b7211','Havana Club Unión','La botella',3000,'Premium',1),('6839b209-bc53-4b14-83ef-6a01b3bc02c6','Chivas Regal 25','La botella',40000,'Premium',1),('79c2ce21-8869-427f-8d17-c05b5f5fcf6a','JB + 1 Tigon ','',6000,'Ofertas',1),('93aa1788-501f-45cf-8219-2cbe702dd12c','Clan Cambell 1L+1Tigon','',6500,'Ofertas',1),('35cbe7f9-874e-4d37-9e0b-6bef4fbe5d60','Ballentines+1Tigon','',6000,'Ofertas',1),('439991ba-7693-4680-9718-c4caaa20aad4','Cristal','',250,'Cervezas',1),('9dd0e600-13a9-4fcd-b7b3-cb6226f9d2ed','Cerveza','',200,'Cervezas',1),('941bb443-eb45-453f-a6ed-70490480de38','Pizza c/queso','',300,'Tapas',1),('4009538d-29d3-409d-a3c4-2bb77a1be013','Croquetas de mariscos','',350,'Tapas',1),('aa052b69-cf40-4a79-8e18-8f6e56d265e0','Pizza c/ jamón y queso','',350,'Tapas',1),('912f66d1-d081-4423-98d4-cfb6ab639ea2','Aceitunas','',250,'Tapas',1),('cc38c3c7-d779-47d5-9281-c0e4c5c8cdba','San Jacobo','',350,'Tapas',1),('681c4882-68dd-4cc1-a3c5-224637cea84b','Tostones rellenos con atún','',300,'Tapas',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('c51c4c9a-806d-4a0d-b9db-bba7004468c9','salvas','$2a$10$CwTycUXWue0Thq9StjUM0ukkXRHpz7/l3Qymqj0Knt6sMyz/VRIJe','cantinero','Lazaro','ramon@cav.jovenclub.cu',1),('f724b996-a23f-4bdf-b957-0ac3c3828436','supervisor','$2a$10$CwTycUXWue0Thq9StjUM0u6jkKCtjXkX9NzBwLZLXIdrf/gkc2S7S','administrador','Lazaro Ricardo Rodriguez Placeres','informaticagob@gobiernocav.co.cu',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-28  1:21:46
