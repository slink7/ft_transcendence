import { createHTTPServer } from "./server/http";
import { createWebSocketServer } from "./server/websocket";
import { GameManager } from "./game/GameManager";

const PORT = 3000;

const gameManager = new GameManager();

const httpServer = createHTTPServer();

createWebSocketServer(httpServer, gameManager);

httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

setInterval(() => {
	gameManager.update();
	gameManager.broadcast();
}, 1000);
