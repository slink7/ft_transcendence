CREATE TABLE Profile_Picture (
    id_pp INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pp_directory VARCHAR(50)
);
CREATE TABLE Theme (
    id_theme INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    theme_directory VARCHAR(50)
);
CREATE TABLE Player (
    id_player INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(50),
    hash_pwd VARCHAR(150),
    color_pseudo VARCHAR(7),
    last_sign DATE,
    id_pp INT,
    id_theme INT,
    FOREIGN KEY (id_pp) REFERENCES Profile_Picture(id_pp),
    FOREIGN KEY (id_theme) REFERENCES Theme(id_theme)
);
CREATE TABLE Friend (
    id_player INT,
    id_friend INT,
    statue VARCHAR(50),
    send_date DATE,
    PRIMARY KEY (id_player, id_friend),
    FOREIGN KEY (id_player) REFERENCES Player(id_player),
    FOREIGN KEY (id_friend) REFERENCES Player(id_player)
);
CREATE TABLE Gamemode (
    id_gamemode INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lvl_start INT,
    width INT,
    height INT
);
CREATE TABLE Party (
    id_party INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    party_name VARCHAR(50),
    date_start TIMESTAMP,
    date_end TIMESTAMP,
    id_gamemode INT,
    FOREIGN KEY (id_gamemode) REFERENCES Gamemode(id_gamemode)
);
CREATE TABLE Play (
    id_player INT,
    id_party INT,
    level INT,
    score INT,
    line_cleared INT,
    FOREIGN KEY (id_player) REFERENCES Player(id_player),
    FOREIGN KEY (id_party) REFERENCES Party(id_party)
);
CREATE TABLE Chat (
    id_message INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_player INT,
    id_party INT,
    message VARCHAR(50),
    FOREIGN KEY (id_player) REFERENCES Player(id_player),
    FOREIGN KEY (id_party) REFERENCES Party(id_party)
);