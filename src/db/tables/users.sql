CREATE TABLE users ( 
    id uuid DEFAULT uuid_generate_v4 () UNIQUE, 
    username TEXT UNIQUE, 
    google_id TEXT UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    user_stats_id uuid REFERENCES users_stats(id) UNIQUE NOT NULL
);