import express from "express";
import { Cluster } from "ioredis";
import { Resource } from "sst";

const redis = new Cluster(
	[{ host: Resource.MyRedis.host, port: Resource.MyRedis.port }],
	{
		dnsLookup: (address, callback) => callback(null, address),
		redisOptions: {
			tls: {},
			username: Resource.MyRedis.username,
			password: Resource.MyRedis.password,
		},
	},
);
const PORT = 80;

const app = express();

app.get("/", async (req, res) => {
	const startTime = Date.now();
	const counter = await redis.incr("counter");
	const hello = (await redis.get("hello")) || "no hello";
	const endTime = Date.now();

	console.log(
		`Hit counter: ${counter}, hello: ${hello}, time: ${endTime - startTime}`,
	);
	res.send(
		`Hit counter::::: ${counter}, hello: ${hello}, time: ${endTime - startTime}`,
	);
});

app.get("/hello", async (req, res) => {
	const startTime = Date.now();
	const counter = await redis.incr("counter");
	const setHello = await redis.set("hello", Math.random().toString());
	const endTime = Date.now();

	res.send(
		`Hit counter::::: ${counter},  setHello: ${setHello}, time: ${endTime - startTime}`,
	);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
