import { createHTTPServer } from "./server/http";
import { createWebSocketServer } from "./server/websocket";
import { GameManager } from "./game/GameManager";
import { CONFIG } from "./config"

const gameManager = new GameManager();

const httpServer = createHTTPServer();

createWebSocketServer(httpServer, gameManager);

httpServer.listen(CONFIG.PORT, () => {
	console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});

setInterval(() => {
	gameManager.update();
	gameManager.broadcast();
}, CONFIG.TICK_RATE);
