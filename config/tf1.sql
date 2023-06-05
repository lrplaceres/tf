-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-06-2023 a las 04:47:28
-- Versión del servidor: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- Versión de PHP: 8.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tf1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notes`
--

CREATE TABLE `notes` (
  `uid` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `creator` varchar(100) NOT NULL,
  `date_open` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notes`
--

INSERT INTO `notes` (`uid`, `name`, `status`, `creator`, `date_open`) VALUES
('13ef4f6c-a6a5-41f0-9f1f-9e183eb6f311', 'Lazaro', 'new', '62433bf7-bc9b-43ef-a583-f9b01caad742', '2023-06-04 21:33:00'),
('21216385-449a-4398-8982-170e40b009d8', 'correo', 'new', '62433bf7-bc9b-43ef-a583-f9b01caad742', '2023-06-04 21:34:22'),
('9a1f39e8-1bb6-4a30-85af-83371226aa51', '77', 'new', '62433bf7-bc9b-43ef-a583-f9b01caad742', '2023-06-04 21:33:18'),
('aff59a12-b342-4fc9-bb29-b4df741852e3', '0554', 'new', '62433bf7-bc9b-43ef-a583-f9b01caad742', '2023-06-04 17:05:13'),
('baef5487-cfc0-46fb-a137-abcadd405774', '159', 'new', '62433bf7-bc9b-43ef-a583-f9b01caad742', '2023-06-04 17:01:28'),
('e729496e-4b78-4f13-95ac-860ae1c7024b', '2', 'new', '62433bf7-bc9b-43ef-a583-f9b01caad742', '2023-06-04 21:42:37'),
('f58225f0-3a46-4d64-ae2d-65576412be94', '101', 'new', '64cd9c7b-1226-4987-90a5-be74cb50a1c9', '2023-06-04 21:48:07'),
('f604322c-d331-4adf-a882-2dc511d833a6', 'Acta', 'new', '62433bf7-bc9b-43ef-a583-f9b01caad742', '2023-06-04 21:33:38'),
('f717633f-3eb9-44ed-b87a-69458679486d', '1236', 'new', '62433bf7-bc9b-43ef-a583-f9b01caad742', '2023-06-04 17:07:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `uid` varchar(100) NOT NULL,
  `note` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL DEFAULT 0,
  `cant` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `uid` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `price` float NOT NULL,
  `category` varchar(100) NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`uid`, `name`, `description`, `price`, `category`, `enabled`) VALUES
('02077527-bf9b-4bef-abcb-35f8950da57c', 'Tequila Olmeca Reposado', '', 450, 'Shots', 1),
('0590950d-fa04-4121-88ec-76f341fa3cc4', 'Blood Mary', '', 350, 'Coctelería', 1),
('143630b6-c52d-4762-8020-4a86e1db4dce', 'River Queen', '', 300, 'Whisky', 1),
('1f5099a5-3a83-47d1-a69b-3d1deaa76b44', 'Montecristo Pirámide No.2', '', 750, 'Cigarros', 1),
('27da4954-221c-42d0-ab13-46e25d864e4a', 'Martell', '', 400, 'Cognac', 1),
('3113fdd2-9add-4cb7-b772-f67e3ab9fb13', 'Ron Santiago 11', '', 350, 'Rones', 1),
('33d6ae0b-8cc9-49bb-b683-6c077e34f22c', 'Glen Livet', '', 750, 'Whisky', 1),
('35cbe7f9-874e-4d37-9e0b-6bef4fbe5d60', 'Ballentines+1Tigon', '', 6000, 'Ofertas', 1),
('379b042a-d212-44b9-afe1-4073364b7af8', 'Jaguermeifter', '', 500, 'Licores', 1),
('3ca991a5-eab4-49a5-ac0d-50979e08b55f', 'Calimocho', '', 300, 'Coctelería', 1),
('4009538d-29d3-409d-a3c4-2bb77a1be013', 'Croquetas de mariscos', '', 350, 'Tapas', 1),
('439991ba-7693-4680-9718-c4caaa20aad4', 'Cristal', '', 250, 'Cervezas', 1),
('4453f6c4-c336-4650-954b-54c8476b7211', 'Havana Club Unión', 'La botella', 3000, 'Premium', 1),
('4f6f881e-bc27-42d9-9b74-120b1d9080d9', 'Cubata', '', 350, 'Coctelería', 1),
('4f73aa98-0dc6-4a8c-9c13-e1a5571e72c7', 'Havana Club 7 años', '', 280, 'Rones', 1),
('553cb934-3484-495a-bb33-b92d076c1a1f', 'Hookah', '', 2500, 'Cigarros', 1),
('681c4882-68dd-4cc1-a3c5-224637cea84b', 'Tostones rellenos con atún', '', 300, 'Tapas', 1),
('6839b209-bc53-4b14-83ef-6a01b3bc02c6', 'Chivas Regal 25', 'La botella', 40000, 'Premium', 1),
('6f4941fb-35f9-40f0-86ba-3ac059e32467', 'Clan Cambell', '', 450, 'Whisky', 1),
('724764f3-143d-4330-9c5e-3202d856cdec', 'Cubanito', '', 350, 'Coctelería', 1),
('7259ee5a-dc67-47ae-bfe5-17e2826b9f8a', 'Cuba Libre', '', 300, 'Coctelería', 1),
('79c2ce21-8869-427f-8d17-c05b5f5fcf6a', 'JB + 1 Tigon ', '', 6000, 'Ofertas', 1),
('8165ab7a-b7ad-464c-b5e2-3d5466e681e2', 'Línea de Oro Romeo y Julieta', '', 800, 'Cigarros', 1),
('8b65b52e-3901-4a25-8a5d-0617e76a6722', 'Havana Club Unión', '', 300, 'Rones', 1),
('912f66d1-d081-4423-98d4-cfb6ab639ea2', 'Aceitunas', '', 250, 'Tapas', 1),
('93aa1788-501f-45cf-8219-2cbe702dd12c', 'Clan Cambell 1L+1Tigon', '', 6500, 'Ofertas', 1),
('941bb443-eb45-453f-a6ed-70490480de38', 'Pizza c/queso', '', 300, 'Tapas', 1),
('9dd0e600-13a9-4fcd-b7b3-cb6226f9d2ed', 'Cerveza', '', 200, 'Cervezas', 1),
('a15f050d-8ba8-4ad3-adde-d9cf0f85f235', 'Cohiba Extra Pirámide', '', 1000, 'Cigarros', 1),
('aa052b69-cf40-4a79-8e18-8f6e56d265e0', 'Pizza c/ jamón y queso', '', 350, 'Tapas', 1),
('c594a31b-8c5b-42f3-8bc5-6c1e00cbeb0e', 'Jhonie Walker Red Label', '', 650, 'Whisky', 1),
('c928784f-eb4d-40cc-abf4-eee9a55d1a65', 'Jameson', '', 450, 'Whisky', 1),
('cc37293a-5b2d-4816-8078-fe76d7eb0f0b', 'Chivas Regal 25', '', 2500, 'Whisky', 1),
('cc38c3c7-d779-47d5-9281-c0e4c5c8cdba', 'San Jacobo', '', 350, 'Tapas', 1),
('cc6aa2a7-3629-4825-8f8c-6a2c78e9ecdd', 'Alexander', '', 350, 'Coctelería', 1),
('cde675e5-4382-483a-ae67-7a8a1c174fcf', 'Black & White', '', 450, 'Whisky', 1),
('d5a4f776-966f-4fcf-80a6-14507ec80b85', 'Lamborghini', '', 500, 'Coctelería', 1),
('de696c11-dd1f-4ac8-90e4-fd6f65b07477', 'Torres 15', '', 600, 'Brandy', 1),
('e6a00d2a-a685-4a1f-a922-8c3ffedcb99e', 'Ballantines 12', '', 650, 'Whisky', 1),
('f2d1bccf-1a45-41e0-93a7-f29f5d9a8365', 'Creama Ruavieja', '', 500, 'Cremas', 1),
('f4befadc-2a0a-4a37-a146-7d0e70dd68fc', 'Old Premier', '', 250, 'Whisky', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `uid` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`uid`, `username`, `password`, `role`, `name`, `email`, `enabled`) VALUES
('2f13ad6a-ef40-432b-a82d-973021a8896a', 'dependiente', '$2a$10$CwTycUXWue0Thq9StjUM0uUteWeqdTVIh/mh3FHV0cwuBijF4CWta', 'dependiente', 'Dependiente', 'dependiente@gmail.com', 1),
('62433bf7-bc9b-43ef-a583-f9b01caad742', 'xetid', '$2a$10$CwTycUXWue0Thq9StjUM0uz1SlK6yBp9QFIXBe13pt9csXHfCVpCu', 'administrador', 'xetid', 'xetid@xetid.cu', 1),
('64cd9c7b-1226-4987-90a5-be74cb50a1c9', 'cantinero', '$2a$10$CwTycUXWue0Thq9StjUM0uvKzTF2a2k6m.3CYYha1IYqfwST2PgY2', 'cantinero', 'Cantinero', 'cantinero@gmail.com', 1),
('8f04773f-3a7d-4282-8112-49e895cbc339', 'cocinero', '$2a$10$CwTycUXWue0Thq9StjUM0uCPwXg977BJMsWnez8f2kuDuZmkj6vim', 'cocinero', 'Cocinero', 'cocinero@gmail.com', 1),
('f891cbdc-2537-4b41-a2e0-eac81a64c332', 'administrador', '$2a$10$CwTycUXWue0Thq9StjUM0u8EIAk6YdAxhZQCaekiefdgM7sDGY2jO', 'administrador', 'Administrador', 'administrador@gmail.com', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`name`);

--
-- Indices de la tabla `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`uid`) USING BTREE,
  ADD KEY `users_uid` (`creator`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `name_uid` (`name`),
  ADD KEY `note_uid` (`note`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`uid`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `users_uid` FOREIGN KEY (`creator`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `name_uid` FOREIGN KEY (`name`) REFERENCES `products` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `note_uid` FOREIGN KEY (`note`) REFERENCES `notes` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
