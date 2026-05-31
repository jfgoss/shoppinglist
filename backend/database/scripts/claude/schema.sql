-- ============================================================
-- schema.sql
-- Creates the shopping list database schema
-- Usage: mariadb -u <user> -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS shopping_list_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE shopping_list_db;

-- ------------------------------------------------------------
-- Drop tables in dependency order (children first)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS listItem;
DROP TABLE IF EXISTS list;
DROP TABLE IF EXISTS shopper;

-- ------------------------------------------------------------
-- shopper
-- ------------------------------------------------------------
CREATE TABLE shopper (
    id       INT          NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- list
-- ------------------------------------------------------------
CREATE TABLE list (
    id         INT          NOT NULL AUTO_INCREMENT,
    owner_id   INT          NOT NULL,
    list_name  VARCHAR(255) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_list_shopper
        FOREIGN KEY (owner_id) REFERENCES shopper (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- listItem
-- ------------------------------------------------------------
CREATE TABLE listItem (
    id       INT            NOT NULL AUTO_INCREMENT,
    list_id  INT            NOT NULL,
    `order`  INT            NOT NULL,
    price    DECIMAL(10, 2) NOT NULL,
    name     VARCHAR(255)   NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT fk_listitem_list
        FOREIGN KEY (list_id) REFERENCES list (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
