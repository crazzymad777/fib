-- phpMyAdmin SQL Dump
-- version 4.9.4deb1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Мар 11 2020 г., 19:42
-- Версия сервера: 10.3.22-MariaDB-0ubuntu0.19.10.1
-- Версия PHP: 7.3.11-0ubuntu0.19.10.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `d1`
--

-- --------------------------------------------------------

--
-- Структура таблицы `queries`
--

CREATE TABLE `queries` (
  `ip` varchar(39) NOT NULL COMMENT 'according to google ipv6 max length is 39 characters',
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `source` int(11) NOT NULL,
  `result` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
