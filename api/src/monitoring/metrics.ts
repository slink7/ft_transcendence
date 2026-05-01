import type { NextFunction, Request, Response } from "express";
import * as client from "prom-client";

const register = new client.Registry();

client.collectDefaultMetrics({
	prefix: "wex_api_",
	register,
});

const httpRequestsTotal = new client.Counter({
	name: "wex_api_http_requests_total",
	help: "Total number of HTTP requests handled by the public API.",
	labelNames: ["method", "route", "status_code"],
	registers: [register],
});

const httpRequestDuration = new client.Histogram({
	name: "wex_api_http_request_duration_seconds",
	help: "HTTP request duration in seconds for the public API.",
	labelNames: ["method", "route", "status_code"],
	buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
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
