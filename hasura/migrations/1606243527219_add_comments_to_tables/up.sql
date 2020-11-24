-- This is just for adding some comments to UI for Data Dictionary to display
COMMENT ON TABLE actors IS 'The actors table';
COMMENT ON COLUMN actors.first_name IS 'Actor first name';
COMMENT ON COLUMN actors.last_name IS 'Actor last name';

COMMENT ON TABLE albums IS 'The albums table';
COMMENT ON COLUMN albums.title IS 'Album title';

COMMENT ON TABLE artists IS 'The artists table';
COMMENT ON COLUMN artists.name IS 'Artist name';

COMMENT ON TABLE categories IS 'The categories table';
COMMENT ON COLUMN categories.name IS 'Category name';

COMMENT ON TABLE customers IS 'The customers table';
COMMENT ON COLUMN customers.first_name IS 'Customer first name';
COMMENT ON COLUMN customers.last_name IS 'Customer last name';
COMMENT ON COLUMN customers.company IS 'Customer company';
COMMENT ON COLUMN customers.address IS 'Customer address';
COMMENT ON COLUMN customers.city IS 'Customer city';

COMMENT ON TABLE employees IS 'The employees table';
COMMENT ON COLUMN employees.first_name IS 'Employee first name';
COMMENT ON COLUMN employees.last_name IS 'Employee last name';
COMMENT ON COLUMN employees.address IS 'Employee address';
COMMENT ON COLUMN employees.city IS 'Employee city';

COMMENT ON TABLE film_actor IS 'The film_actor table';

COMMENT ON TABLE film_category IS 'The film_category table';

COMMENT ON TABLE films IS 'The films table';

COMMENT ON TABLE invoice_lines IS 'The invoice_lines table';

COMMENT ON TABLE media_types IS 'The media_types table';

COMMENT ON TABLE playlist_track IS 'The playlist_track table';

COMMENT ON TABLE playlists IS 'The playlists table';

COMMENT ON TABLE tracks IS 'The tracks table';
