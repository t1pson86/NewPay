-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 26 2024 г., 11:01
-- Версия сервера: 8.0.30
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `game_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Компьютерные игры'),
(2, 'Мобильные игры'),
(3, 'Приложения');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_category` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `id_category`) VALUES
(1, 'Fortnite', 'Fortnite — компьютерная онлайн-игра, разработанная американской компанией Epic Games совместно с People Can Fly и выпущенная в ранний доступ в 2017 году.', 'fortnite.png', 1),
(2, 'Dota 2', 'Dota 2 — многопользовательская командная компьютерная игра в жанре MOBA, разработанная и изданная корпорацией Valve', 'dota2.png', 1),
(3, 'Pubg Mobile', 'PUBG Mobile — условно-бесплатная мобильная многопользовательская онлайн-игра в жанре королевской битвы', 'pubgmobile.png', 2),
(4, 'Clash of Clans', 'Clash of Сlans — стратегическая игра, созданная финской студией-разработчиком Supercell для мобильных устройств.', 'clashoflclans.png', 2),
(5, 'Spotify', 'Spotify — стриминговый сервис, позволяющий прослушивать музыкальные композиции, аудиокниги и подкасты.', 'spotify.png', 3),
(6, 'Hamster Kombat', 'Hamster Kombat— это приложение внутри мессенджера Telegram, которое представляет собой модель криптобиржи. Пользователь играет за генерального директора биржи.', 'hamsterkombat.png', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `tovars`
--

CREATE TABLE `tovars` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `valute` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '$',
  `id_product` int NOT NULL,
  `id_user` int NOT NULL,
  `date_start` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `tovars`
--

INSERT INTO `tovars` (`id`, `name`, `description`, `image`, `price`, `valute`, `id_product`, `id_user`, `date_start`) VALUES
(1, 'Деревня 11lvl в Clash of Clans', 'Продам деревню, забор на макс, пушки тоже максимум', '12345clash_of_clans.png', 2000, '$', 4, 1, '2024-06-13 05:46:22.000000'),
(2, 'Деревня 6lvl', 'только апнулся, все стоковое', '123456clash_of_clans.png', 700, '$', 4, 2, '2024-06-06 08:47:59.000000'),
(3, 'скин на Sniper', 'Четкий скин на Снайпера, при покупке данного товара в подарок отдаю еще один скин на Вайпера ! ', '123dota.jpg', 900, 'руб', 2, 1, '2024-06-01 12:48:59.000000'),
(4, 'Деревня 8 lvl ', 'Деревня 8 лвла, с собой отдаю почту , без утерь ! За большей информацией - в подробное описание )', '1234567clash_of_clans.png', 200, '$', 4, 2, '2024-07-12 09:27:46.000000'),
(5, 'Аккаунт Хамстер Комбат ', 'Продам личный Аккаунт hamster Kombat , прибыль в час - 934к ! Чек подробное описание )', '345Hamster_Combat.webp', 300, '$', 6, 1, '2024-07-12 09:36:36.000000'),
(6, 'Аккаунт fortnite ', 'Продам личный аккаунт fortnite ! Есть много скинов , подробнее в описании ', '34534Fortnite.png', 555, '$', 1, 1, '2024-07-09 09:41:18.000000'),
(7, 'Аккаунт в Пабг Мобайл', 'Продаю Аккаунт под основу ! Есть олд скины , пару пушек на кил чат... Чек подробное описание )', '345345Pubg_Mobile.png', 1200, '$', 3, 2, '2024-07-02 09:44:30.000000'),
(8, 'Аккаунт - Spotify', 'Продаю свой аккаунт в Spotify ! Подписка на 3 месяца !!!', '5432Spotify.png', 756, '$', 5, 2, '2024-07-08 07:47:30.000000');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tg` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_start` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `token`, `image`, `name`, `tg`, `date_start`) VALUES
(1, 'artur@gmail.com', 'weohjoirgnjkrbgjp325435bjhkbsdlkjbgnjk', NULL, '123Avatar.png', 'Артур', NULL, '2024-06-06 06:37:19.000000'),
(2, 'bogdan@gmail.com', 'gvghvhafhbsfjasjhfuagfag86476hdbfhkdb', NULL, '1234Avatar.png', 'Богдан', 'https://t.me/goboz_b', '2024-06-11 14:38:03.000000'),
(3, 'python@gmail.com', 'd8578edf8458ce06fbc5bb76a58c5ca4', 'eccbc87e4b5ce2fe28308fd9f2a7baf3', NULL, 'Python', NULL, '2024-07-19 12:24:09.690533'),
(7, '12345@gmail.com', 'd8578edf8458ce06fbc5bb76a58c5ca4', NULL, NULL, 'Ivan', NULL, '2024-07-19 14:34:21.675776'),
(8, 'yarik_423_123@gmail.com', '8a4de95c87dd0e4e64463de65656f8d3', 'c9f0f895fb98ab9159f51fd0297e236d', NULL, 'yarik', NULL, '2024-07-19 19:17:10.202436');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Индексы таблицы `tovars`
--
ALTER TABLE `tovars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `tovars`
--
ALTER TABLE `tovars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tovars`
--
ALTER TABLE `tovars`
  ADD CONSTRAINT `tovars_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tovars_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
