# Claude notes

## Prompt
```
Create me a mariadb sql script that selects a database name, drops existing tables and creates new tables as follows.

list table, including primary key id, foreign key owner id linking to shopper table, list name as type string.

shopper table, including primary key id, username as type string

listItem table, including primary key id, foreign key list id linking to list table, order as integer, price as floating point and name as string.

Then create a script that populates that database with sample data, with 2 shopper records, 4 list records linked to the shopper records and at least 4 listItem records linked to each list record.
```

## Output

### Check for relevant skills >
No specific SQL skill — I'll write these directly.

### Created 2 files, read a file >
Here's what was created:
**schema.sql** — run this first. It:
- Creates (if needed) the shopping_list_db database and selects it
- Drops listItem → list → shopper in the correct dependency order
- Recreates all three tables with the specified columns and constraints:
  - shopper — id (PK), username (VARCHAR)
  - list — id (PK), owner_id (FK → shopper), list_name (VARCHAR)
  - listItem — id (PK), list_id (FK → list), `order` (INT), price (DECIMAL 10,2), name (VARCHAR)
  - Both FKs use ON DELETE CASCADE so removing a shopper/list cleans up its children automatically
  - order is backtick-quoted as it's a reserved word in SQL

**seed.sql** — run this second. It inserts:
- 2 shoppers (alice, bob)
- 4 lists (2 each)
- 20 listItems (5 per list)

To run:
```bash
bashmariadb -u <user> -p < schema.sql
mariadb -u <user> -p < seed.sql
```

## Notes
Good output, it even inferred various details for the sample data based on the title of the `shopper` table. It also created the price table to be to two decimal places.

Not having used MariaDB before, I had to research the various CREATE TABLE options it had provided. They are set to the defaults, but it is typically good to explicitly state these anyway.
- [ENGINE=InnoDB](https://mariadb.com/docs/server/server-usage/tables/create-table#storage-engine)
- [DEFAULT CHARSET=utf8mb4](https://mariadb.com/docs/server/server-usage/tables/create-table#default-character-set-charset)

Changes to make;
- Database name, as expected as this was put into the prompt to generate a placeholder.
- Rename the `order` column as this is a reserved SQL word. Claude did successfully pick up on this in the notes.
- Need to add `UNIQUE` to `shopper.username` column during creation. (Can't make the position unique in the list item table as different lists will use the same position numbers.)
