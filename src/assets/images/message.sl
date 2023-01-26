CREATE DATABASE tournament_system;
USE tournament_system;

CREATE TABLE Tournament (
    id INT PRIMARY KEY AUTO_INCREMENT,
    format VARCHAR(255),
    mode VARCHAR(255),
    name VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE PointSystem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kill_point FLOAT,
    kill_point_multiplier FLOAT,
    rank INT,
    rank_point FLOAT
);

CREATE TABLE Player (
    id INT PRIMARY KEY AUTO_INCREMENT,
    discord_id VARCHAR(255) UNIQUE,
    avatarURL VARCHAR(255),
    email VARCHAR(255),
    game_int INT,
    name VARCHAR(255),
    password VARCHAR(255),
    platform VARCHAR(255)
);

CREATE TABLE GameResult (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_id INT,
    kill_count INT,
    rank INT,
    team_id INT,
    total_hurt INT,
    FOREIGN KEY (player_id) REFERENCES Player(id)
);

CREATE TABLE Standings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    score FLOAT,
    type VARCHAR(255)
);

CREATE TABLE Group (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE TournamentPointSystem (
    tournament_id INT,
    pointsystem_id INT,
    PRIMARY KEY (tournament_id, pointsystem_id),
    FOREIGN KEY (tournament_id) REFERENCES Tournament(id),
    FOREIGN KEY (pointsystem_id) REFERENCES PointSystem(id)
);

CREATE TABLE TournamentGroup (
    tournament_id INT,
    group_id INT,
    PRIMARY KEY (tournament_id, group_id),
    FOREIGN KEY (tournament_id) REFERENCES Tournament(id),
    FOREIGN KEY (group_id) REFERENCES `Group`(id)
);

CREATE TABLE GroupPlayer (
    group_id INT,
    player_id INT,
    PRIMARY KEY (group_id, player_id),
    FOREIGN KEY (group_id) REFERENCES `Group`(id),
    FOREIGN KEY (player_id) REFERENCES Player(id)
);

CREATE TABLE GameResultStandings (
    gameresult_id INT,
    standings_id INT,
    PRIMARY KEY (gameresult_id, standings_id),
    FOREIGN KEY (gameresult_id) REFERENCES GameResult(id),
    FOREIGN KEY (standings_id) REFERENCES Standings(id)
);

CREATE TABLE StandingRelation (
    standings_id INT,
    gameresult_id INT,
    group_id INT,
    tournament_id INT,
    PRIMARY KEY (standings_id),
    FOREIGN KEY (standings_id) REFERENCES Standings(id),
    FOREIGN KEY (gameresult_id) REFERENCES GameResult(id) NULL,
    FOREIGN KEY (group_id) REFERENCES `Group`(id) NULL,
    FOREIGN KEY (tournament_id) REFERENCES Tournament(id) NULL,
    CHECK ((gameresult_id IS NOT NULL OR group_id IS NOT NULL OR tournament_id IS NOT NULL))
);