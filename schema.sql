-- Create tables
CREATE TABLE IF NOT EXISTS theaters (
    theater_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name)
);

CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    release_date DATE,
    runtime_minutes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(title)
);

CREATE TABLE IF NOT EXISTS daily_sales (
    sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
    theater_id INTEGER,
    movie_id INTEGER,
    sale_date DATE NOT NULL,
    total_sales DECIMAL(10,2) NOT NULL,
    tickets_sold INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (theater_id) REFERENCES theaters(theater_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    UNIQUE(theater_id, movie_id, sale_date)
);

-- Insert sample data
INSERT OR IGNORE INTO theaters (name, location) VALUES
    ('Cineplex Downtown', '123 Main St'),
    ('Starlight Cinema', '456 Park Ave');

INSERT OR IGNORE INTO movies (title, release_date, runtime_minutes) VALUES
    ('The Matrix Resurrections', '2023-12-22', 148),
    ('Dune: Part Two', '2024-03-01', 166);

INSERT OR IGNORE INTO daily_sales (theater_id, movie_id, sale_date, total_sales, tickets_sold) VALUES
    (1, 1, '2024-05-09', 2500.00, 250),
    (1, 2, '2024-05-09', 3200.00, 320),
    (2, 1, '2024-05-09', 1800.00, 180),
    (2, 2, '2024-05-09', 2900.00, 290),
    (1, 1, '2024-05-10', 2100.00, 210),
    (1, 2, '2024-05-10', 3500.00, 350),
    (2, 1, '2024-05-10', 1600.00, 160),
    (2, 2, '2024-05-10', 3100.00, 310);