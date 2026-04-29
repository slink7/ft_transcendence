INSERT INTO theme (l_left, l_right, s_left, s_right, t, square, rod) VALUES 
('#d99528','#be9825','#ff0000','#1fe500','#cb00b0','#fff200','#00e1ff');

INSERT INTO player (username, email,hash_pwd, profile_color, last_sign, id_theme) VALUES 
('donald', 'donaldtheduck@gmail.com','123456','#FFDE21', NULL, 1),
('jon', 'basic@gmail.com','123456','#6f0057', NULL, 1),
('shak', 'shak@gmail.com','123456','#fff3ae', NULL, 1),
('marps', 'marpstheduck@gmail.com','123456','#2151ff', NULL, 1),
('gildas', 'gildas@gmail.com','123456','#ff2121', NULL, 1);

INSERT INTO gamemode (lvl_start, width, height) VALUES (0 , 10, 18);

INSERT INTO game (game_name, date_start, date_end, id_gamemode) VALUES  
			('basic room', '2025-11-11 13:23:44','2025-11-11 13:25:44',1),
			('bigshak room', '2025-11-11 13:23:44','2025-11-11 13:25:44',1),
			('le marps room', '2025-11-11 13:23:44','2025-11-11 13:25:44',1),
			('le bon gildas room', '2025-11-11 13:23:44','2025-11-11 13:25:44',1);



INSERT INTO score (id_player, id_game, level, score, line_cleared) VALUES  
(1, 1, 12000, 20000000,120000,1),
(2, 1, 5, 71512,12001,0),
(3, 1, 6, 71212,120,0),
(4, 1, 12, 654564,1200,0),
(5, 1, 24, 4865645,120,0),
(1, 2, 12000, 2000000,120000,1),
(4, 2, 12, 654564,1200,0),
(5, 2, 24, 4865645,120,0),
(4, 3, 12, 654564,1200,1),
(5, 3, 24, 4865645,120,0),
(4, 4, 12, 654564,1200,0),
(5, 4, 24, 4865645,120,1);