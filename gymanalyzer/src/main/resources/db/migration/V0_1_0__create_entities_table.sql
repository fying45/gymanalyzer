CREATE TABLE day(
    day_date DATE PRIMARY KEY,
    sleeping_time INT,
    weight REAL,
    active_calories INT,
    vo_2_max REAL,
    swimming_distance INT
);

CREATE TABLE exercise (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    primary_muscle_group VARCHAR(255) [],
    secondary_muscle_group VARCHAR(255) [],
    area VARCHAR(255) NOT NULL
);

CREATE TABLE gym_workout (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    series_type VARCHAR(255) NOT NULL,
    volume INT NOT NULL,
    weight INT NOT NULL,
    exercise_id BIGINT NOT NULL REFERENCES exercise (id) ON DELETE CASCADE,
    day_date DATE NOT NULL REFERENCES day(day_date) ON DELETE CASCADE
);