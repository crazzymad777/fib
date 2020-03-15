-- queries dump
CREATE TABLE IF NOT EXISTS `queries` (
  `ip` varchar(39) NOT NULL COMMENT 'according to google ipv6 max length is 39 characters',
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `source` int(11) unsigned NOT NULL DEFAULT 0,
  `result` double unsigned NOT NULL DEFAULT 0
) DEFAULT CHARSET=ascii;
