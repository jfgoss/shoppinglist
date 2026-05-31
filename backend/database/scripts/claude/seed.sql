-- ============================================================
-- seed.sql
-- Populates shopping_list_db with sample data
-- Run AFTER schema.sql:  mariadb -u <user> -p < seed.sql
-- ============================================================

USE shopping_list_db;

-- ------------------------------------------------------------
-- shoppers  (2 records)
-- ------------------------------------------------------------
INSERT INTO shopper (username) VALUES
    ('alice_wonder'),
    ('bob_builder');

-- ------------------------------------------------------------
-- lists  (4 records, 2 per shopper)
-- ------------------------------------------------------------
INSERT INTO list (owner_id, list_name) VALUES
    (1, 'Weekly Groceries'),   -- alice's lists
    (1, 'Party Supplies'),
    (2, 'DIY Hardware Run'),   -- bob's lists
    (2, 'Office Essentials');

-- ------------------------------------------------------------
-- listItems  (≥ 4 items per list = 20 items total)
-- ------------------------------------------------------------
INSERT INTO listItem (list_id, `order`, price, name) VALUES
    -- List 1 · Weekly Groceries (alice)
    (1, 1,  1.49, 'Sourdough Bread'),
    (1, 2,  3.29, 'Whole Milk (2 L)'),
    (1, 3,  2.75, 'Free-Range Eggs (6)'),
    (1, 4,  4.99, 'Cheddar Cheese (400 g)'),
    (1, 5,  0.89, 'Bananas (bunch)'),

    -- List 2 · Party Supplies (alice)
    (2, 1,  6.99, 'Paper Plates (50 pk)'),
    (2, 2,  4.49, 'Plastic Cups (30 pk)'),
    (2, 3, 12.99, 'Balloons Assorted (100 pk)'),
    (2, 4,  8.50, 'Streamers & Bunting'),
    (2, 5,  3.75, 'Cocktail Napkins'),

    -- List 3 · DIY Hardware Run (bob)
    (3, 1,  7.49, 'Wood Screws M4 x 40 mm (100 pk)'),
    (3, 2, 14.99, 'Sandpaper Assorted Grits (20 pk)'),
    (3, 3,  5.25, 'Wood Filler (250 g)'),
    (3, 4, 22.50, 'Paint Roller & Tray Set'),
    (3, 5,  3.99, 'Masking Tape (50 m)'),

    -- List 4 · Office Essentials (bob)
    (4, 1,  2.49, 'Ballpoint Pens (10 pk)'),
    (4, 2,  5.99, 'A4 Printer Paper (500 sheets)'),
    (4, 3,  1.75, 'Sticky Notes (3 pk)'),
    (4, 4,  8.99, 'Lever Arch File'),
    (4, 5,  3.25, 'Highlighters Assorted (5 pk)');
    