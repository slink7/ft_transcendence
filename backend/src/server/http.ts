import express from "express";
import http from "http";

export function createHTTPServer() {
	const app = express();

	app.get("/", (req, res) => {
		res.send("Backend running 🚀");
	});

	return http.createServer(app);
}
