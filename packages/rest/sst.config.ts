/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "rest",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
		};
	},
	async run() {
		const vpc = new sst.aws.Vpc("MyVpc", { bastion: true });
		const redis = new sst.aws.Redis("MyRedis", { vpc });
		const cluster = new sst.aws.Cluster("MyCluster", { vpc });
		// https://github.com/sst/sst/tree/dev/examples/aws-service-discovery [ would need  a NAT gateway $$$]
		const service = cluster.addService("MyService", {
			loadBalancer: {
				ports: [{ listen: "80/http" }],
			},
			link: [redis],
			dev: {
				command: "node --watch index.mjs",
			},
		});
	},
});
