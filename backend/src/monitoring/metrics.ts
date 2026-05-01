import type { NextFunction, Request, Response } from "express";
import * as client from "prom-client";

const register = new client.Registry();

client.collectDefaultMetrics({
	prefix: "wex_backend_",
	register,
});

const httpRequestsTotal = new client.Counter({
	name: "wex_backend_http_requests_total",
	help: "Total number of HTTP requests handled by the game backend.",
	labelNames: ["method", "route", "status_code"],
	registers: [register],
});

const httpRequestDuration = new client.Histogram({
	name: "wex_backend_http_request_duration_seconds",
	help: "HTTP request duration in seconds for the game backend.",
	labelNames: ["method", "route", "status_code"],
	buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
	registers: [register],
});

const websocketClients = new client.Gauge({
	name: "wex_backend_websocket_clients",
	help: "Current number of connected WebSocket clients.",
	registers: [register],
});

const roomsActive = new client.Gauge({
	name: "wex_backend_rooms_active",
	help: "Current number of active game rooms.",
	registers: [register],
});

const reconnectsTotal = new client.Counter({
	name: "wex_backend_websocket_reconnects_total",
	help: "Total number of successful WebSocket reconnects.",
	registers: [register],
});

const websocketMessagesTotal = new client.Counter({
	name: "wex_backend_websocket_messages_total",
	help: "Total number of WebSocket messages received by type.",
	labelNames: ["type"],
	registers: [register],
});

function routeName(req: Request): string {
	if (req.route?.path)
		return (`${req.baseUrl || ""}${String(req.route.path)}`);
	return (req.path || "unknown");
}

export function metricsMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.path === "/metrics")
		return (next());

	const endTimer = httpRequestDuration.startTimer();
	res.on("finish", () => {
		const labels = {
			method: req.method,
			route: routeName(req),
			status_code: String(res.statusCode),
		};

		httpRequestsTotal.inc(labels);
		endTimer(labels);
	});
	return (next());
}

export async function metricsHandler(_req: Request, res: Response) {
	res.setHeader("Content-Type", register.contentType);
	res.end(await register.metrics());
}

export function setRuntimeMetrics(connectedClients: number, activeRooms: number) {
	websocketClients.set(connectedClients);
	roomsActive.set(activeRooms);
}

export function recordReconnect() {
	reconnectsTotal.inc();
}

export function recordWebSocketMessage(type: string) {
	websocketMessagesTotal.inc({ type });
}
