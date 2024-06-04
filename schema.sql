CREATE TABLE IF NOT EXISTS Projects (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    visibility TEXT NOT NULL,
    status TEXT NOT NULL,
    area REAL,
    location JSON,
    parking INTEGER,
    city TEXT,
    street TEXT,
    title TEXT NOT NULL,
    description TEXT,
    hero_image TEXT,
    images JSON,
    features JSON,
    nearby_milestones JSON,
    warranties JSON
);

CREATE TABLE IF NOT EXISTS Units (
    unit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    area REAL,
    floor INTEGER,
    special_area REAL,
    additional_info TEXT
    -- Add other unit-specific columns here
);

CREATE TABLE IF NOT EXISTS ProjectUnits (
    project_id INTEGER,
    unit_id INTEGER,
    PRIMARY KEY (project_id, unit_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (unit_id) REFERENCES Units(unit_id)
);

CREATE TABLE IF NOT EXISTS Interests (
    interest_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    moblie TEXT NOT NULL
);
