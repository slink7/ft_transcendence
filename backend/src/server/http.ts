import express from "express";
import http from "http";

import { metricsHandler, metricsMiddleware } from "../monitoring/metrics";

export function createHTTPServer() {
	const app = express();

	app.use(metricsMiddleware);

	app.get("/", (req, res) => {
		res.send("Backend running 🚀");
	});

	app.get("/health", (req, res) => {
		res.status(200).json({ status: "ok", service: "backend" });
	});

	app.get("/metrics", metricsHandler);

	return http.createServer(app);
}
