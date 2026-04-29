INSERT INTO theme (theme_directory) VALUES ('ici');

INSERT INTO profile_picture (pp_directory) VALUES ('la');

INSERT INTO player (username, email,hash_pwd, color_pseudo, last_sign, id_pp, id_theme) VALUES 
('donald', 'donaldtheduck@gmail.com','123456','#FFDE21', NULL, 1, 1),
('basic', 'basic@gmail.com','123456','#6f0057', NULL, 1, 1),
('bigshak', 'donaldtheduck@gmail.com','123456','#fff3ae', NULL, 1, 1),
('le marps', 'donaldtheduck@gmail.com','123456','#2151ff', NULL, 1, 1),
('le bon gildas', 'donaldtheduck@gmail.com','123456','#ff2121', NULL, 1, 1);

INSERT INTO gamemode (lvl_start, width, height) VALUES (0 , 10, 18);

INSERT INTO party (party_name,date_start, date_end, id_gamemode) VALUES  
			('basic room', '2025-11-11 13:23:44','2025-11-11 13:25:44',1),
			('bigshak room', '2025-11-11 13:23:44','2025-11-11 13:25:44',1),
			('le marps room', '2025-11-11 13:23:44','2025-11-11 13:25:44',1),
			('le bon gildas room', '2025-11-11 13:23:44','2025-11-11 13:25:44',1);



INSERT INTO play (id_player, id_party, level, score, line_cleared) VALUES  
(1, 1, 12000, 20000000,120000),
(2, 1, 5, 71512,1200),
(3, 1, 6, 71212,120),
(4, 1, 12, 654564,1200),
(5, 1, 24, 4865645,120);

INSERT INTO play (id_player, id_party, level, score, line_cleared) VALUES  
(1, 2, 12000, 2000000,120000),
(4, 2, 12, 654564,1200),
(5, 2, 24, 4865645,120);


INSERT INTO play (id_player, id_party, level, score, line_cleared) VALUES  
(4, 3, 12, 654564,1200),
(5, 3, 24, 4865645,120);


INSERT INTO play (id_player, id_party, level, score, line_cleared) VALUES  
(4, 4, 12, 654564,1200),
(5, 4, 24, 4865645,120);

