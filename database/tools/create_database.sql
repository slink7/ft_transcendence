CREATE TABLE Theme (
    id_theme INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    l_left VARCHAR(7) NOT NULL,
    l_right VARCHAR(7) NOT NULL,
    s_left VARCHAR(7) NOT NULL,
    s_right VARCHAR(7) NOT NULL,
    t VARCHAR(7) NOT NULL,
    square VARCHAR(7) NOT NULL,
    rod VARCHAR(7) NOT NULL

);
CREATE TABLE Player (
    id_player INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    hash_pwd VARCHAR(150) NOT NULL,
    profile_color VARCHAR(7),
    last_sign DATE,
    id_theme INT NOT NULL,
    UNIQUE(id_player),
    UNIQUE(username),
    UNIQUE(email),
    FOREIGN KEY (id_theme) REFERENCES Theme(id_theme)
);
CREATE TABLE Friend (
    id_player INT NOT NULL,
    id_friend INT NOT NULL,
    statue VARCHAR(50) NOT NULL,
    send_date DATE NOT NULL,
    PRIMARY KEY (id_player, id_friend),
    FOREIGN KEY (id_player) REFERENCES Player(id_player),
    FOREIGN KEY (id_friend) REFERENCES Player(id_player)
);
CREATE TABLE Gamemode (
    id_gamemode INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lvl_start INT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL
);
CREATE TABLE Game (
    id_game INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    game_name VARCHAR(50) NOT NULL,
    date_start TIMESTAMP NOT NULL,
    date_end TIMESTAMP NOT NULL,
    id_gamemode INT NOT NULL,
    FOREIGN KEY (id_gamemode) REFERENCES Gamemode(id_gamemode)
);
CREATE TABLE Score (
    id_player INT,
    id_game INT,
    level INT NOT NULL,
    score INT NOT NULL,
    line_cleared INT NOT NULL,
    win BOOLEAN NOT NULL,
    FOREIGN KEY (id_player) REFERENCES Player(id_player),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);
CREATE TABLE Chat (
    id_message INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_player INT,
    id_game INT,
    message VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_player) REFERENCES Player(id_player),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);