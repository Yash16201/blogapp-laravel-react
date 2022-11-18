-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2022 at 11:56 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogapp_laravel_react`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blog_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `blog_title`, `user_id`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Test Context Redux Toolkit', 1, '2022-11-02 03:43:10', '2022-11-11 04:05:27', '1'),
(19, 'New', 1, '2022-11-02 03:46:19', '2022-11-03 02:03:21', '1'),
(20, 'Yash', 1, '2022-11-03 01:56:03', '2022-11-03 02:01:00', '1'),
(21, 'Reactjs', 1, '2022-11-03 02:01:32', '2022-11-03 03:00:24', '1'),
(22, 'Laravel', 1, '2022-11-03 02:03:10', '2022-11-03 02:59:30', '1'),
(25, 'Sql', 1, '2022-11-03 22:16:32', '2022-11-10 02:10:44', '0'),
(26, 'Context', 1, '2022-11-06 22:54:55', '2022-11-10 02:10:31', '0'),
(27, 'Redux', 1, '2022-11-10 02:51:00', '2022-11-11 03:11:10', '0'),
(29, 'Redux Toolkit', 1, '2022-11-11 03:25:29', '2022-11-11 03:25:29', '1'),
(30, 'Toolkit 2', 1, '2022-11-11 03:27:40', '2022-11-11 03:27:40', '1'),
(31, 'Toolkit 3', 1, '2022-11-11 03:29:15', '2022-11-11 03:29:15', '1'),
(35, 'Toolkit 4', 1, '2022-11-11 04:13:42', '2022-11-13 23:15:10', '0');

-- --------------------------------------------------------

--
-- Table structure for table `blog_details`
--

CREATE TABLE `blog_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blog_id` bigint(20) UNSIGNED NOT NULL,
  `post_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `blog_attachment_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visible_from` datetime NOT NULL,
  `visible_to` datetime NOT NULL,
  `status` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_details`
--

INSERT INTO `blog_details` (`id`, `blog_id`, `post_text`, `blog_attachment_1`, `visible_from`, `visible_to`, `status`) VALUES
(1, 1, 'Test Context Redux Toolkit', '202211100943xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-02 00:00:00', '2022-11-30 00:00:00', '1'),
(3, 19, 'New One', '202211030704D19CE146.jpeg', '2022-11-02 00:00:00', '2022-11-30 00:00:00', '1'),
(4, 20, 'Hi this is yash modi', '202211030726D19CE146.jpeg', '2022-11-03 00:00:00', '2022-11-30 00:00:00', '1'),
(5, 21, 'React Js', '202211030731xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-03 00:00:00', '2022-11-30 00:00:00', '1'),
(6, 22, 'Laravel', '202211030733xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-03 00:00:00', '2022-11-30 00:00:00', '1'),
(7, 25, 'Sql', '202211040346xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-04 00:00:00', '2022-11-24 00:00:00', '0'),
(8, 26, 'Context', '202211070424xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-08 00:00:00', '2022-11-30 00:00:00', '0'),
(9, 27, 'Redux', '202211100821xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-10 00:00:00', '2022-11-30 00:00:00', '0'),
(10, 29, 'Toolkit', '202211110855xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-11 00:00:00', '2022-11-30 00:00:00', '1'),
(11, 30, 'Toolkit 2', '202211110857xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-11 00:00:00', '2022-11-30 00:00:00', '1'),
(12, 31, 'Toolkit 3', '202211110859xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-11 00:00:00', '2022-11-23 00:00:00', '1'),
(13, 35, 'Toolkit 4', '202211110943xdoimgffXBIGS6uk7279087447494652976.png', '2022-11-11 00:00:00', '2022-11-30 00:00:00', '0');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_10_18_034723_create_blogs_table', 1),
(6, '2022_10_18_034735_create_blog_details_table', 1),
(7, '2022_10_19_071609_add_is_admin_to_users', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('Male','Female','Other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `gender`, `password`, `remember_token`, `created_at`, `updated_at`, `isAdmin`) VALUES
(1, 'test user', 'test@gmail.com', 'Male', '$2y$10$cme5cMyS0IE3WoROXU5Ll.ZjGnvv4dGuEbjmHBPp3dD70NYFgzZTK', NULL, '2022-10-31 22:26:50', '2022-10-31 22:26:50', 0),
(2, 'Yash', 'modiy2433@gmail.com', 'Male', '$2y$10$yKs0crLz3aBy2qkeXoWy1ekpaPqYDDwbByL2TBcyHhS9y36KEHrBa', NULL, '2022-11-01 03:16:21', '2022-11-01 03:16:21', 0),
(3, 'Bot User', 'bot@gmail.com', 'Male', '$2y$10$2aPBiwVjdwTGhUSbaW6EY.zM9gQQdEBP1UsPFIbBahg1z4oAn.T76', NULL, '2022-11-03 03:28:15', '2022-11-03 03:28:15', 0),
(4, 'Thunder', 'Thunder@gmail.com', 'Male', '$2y$10$iobJ28PVnPDyZGyXXfqhYOjWo3hRJ1vi7mtZbatUNCwMgTi6g0Rju', NULL, '2022-11-04 00:09:56', '2022-11-04 00:09:56', 0),
(5, 'Thunder two', 'Thunder2@gmail.com', 'Male', '$2y$10$/tog/k/NFQl5j3l5fAkNTO7o7yHq1.SnIgS8AyhJpIY2zdEDaGj4G', NULL, '2022-11-04 00:12:01', '2022-11-04 00:12:01', 0),
(6, 'context user', 'qwer123@gmail.com', 'Male', '$2y$10$cme5cMyS0IE3WoROXU5Ll.ZjGnvv4dGuEbjmHBPp3dD70NYFgzZTK', NULL, '2022-11-04 03:29:37', '2022-11-04 03:29:37', 0),
(9, 'Redux', 'redux@react.com', 'Male', '$2y$10$pDEvDYsp7zqI4e9U9CiMwuu3gBvInXbwTCilg4rwpZXe0B0PUYHUi', NULL, '2022-11-09 04:52:18', '2022-11-09 04:52:18', 0),
(10, 'Redux Toolkit', 'toolkit@redux.com', 'Male', '$2y$10$9WMKSXkh04LVcrKxxkR.a.Y6oJZuZLMGh3VTrRBvuqufC9zmHUvK.', NULL, '2022-11-11 01:10:05', '2022-11-11 01:10:05', 0),
(11, 'Typescript', 'typescript@react.com', 'Male', '$2y$10$Rzy9rYvp2EFvfNXhm9NUQOz7rMQCi9GJZHDnc/g8d7RqDbnsxb0Zq', NULL, '2022-11-18 05:20:25', '2022-11-18 05:20:25', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blogs_user_id_foreign` (`user_id`);

--
-- Indexes for table `blog_details`
--
ALTER TABLE `blog_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_details_blog_id_foreign` (`blog_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `blog_details`
--
ALTER TABLE `blog_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `blog_details`
--
ALTER TABLE `blog_details`
  ADD CONSTRAINT `blog_details_blog_id_foreign` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
