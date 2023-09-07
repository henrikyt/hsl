import { VehicleState } from "@prisma/client";
import { MqttClient, connectAsync } from "mqtt";
import { updateVehicles } from "../modules/vehicle/vehicle.service";
import { Log } from "../utils/log";
import { bbox2geohashes } from "../utils/geohash";
import { LatitudeParams } from "../modules/session/session.schema";

type HSLMessage = {
	desi: string;
	dir: string;
	oper: number;
	veh: number;
	tst: string;
	tsi: number;
	spd: number;
	hdg: number;
	lat: number;
	long: number;
	acc: number;
	dl: number;
	odo: number;
	drst: number;
	oday: string;
	jrn: number;
	line: number;
	start: string;
	loc: string;
	stop: number | string;
	route: string;
	occu: number;
	ttarr: string;
	ttdep: string;
};

type Coords = {
	latitudeStart: number;
	longitudeStart: number;
	latitudeEnd: number;
	longitudeEnd: number;
};

class HSLClient {
	client: MqttClient | undefined;
	log = Log("HSLClient");
	subscriptions = new Map<string, string[]>();

	async connect() {
		this.client = await connectAsync({ host: "mqtt.hsl.fi", port: 8883, protocol: "mqtts" });
		this.client.on("message", this.onMessage);
		this.log("connected");
	}

	onMessage(topic: string, message: Buffer) {
		const parsed = JSON.parse(message.toString());
		const state = Object.keys(parsed)[0];
		const msg: HSLMessage = parsed[state];
		const update = {
			id: msg.veh.toString() + msg.oper.toString(), // veh_id + oper
			state: state as VehicleState,
			description: msg.desi,
			operator: msg.oper,
			vehicleId: msg.veh,
			vehicleTime: msg.tst,
			speed: msg.spd,
			heading: msg.hdg,
			latitude: msg.lat,
			longitude: msg.long,
			acceleration: msg.acc,
			scheduleOffset: msg.dl,
			odometer: msg.odo,
			doorStatus: msg.drst,
			start: msg.start,
			stoppedAt: msg.stop?.toString(),
			route: msg.route,
			occupancy: msg.occu,
			arrival: msg.ttarr,
			departure: msg.ttdep,
		};
		updateVehicles([update]);
	}

	async disconnect() {
		await this.client?.endAsync();
		this.log("disconnected");
	}

	async subscribe(topic: string | string[] | undefined) {
		if (!topic) return;
		this.log("subscribe", topic);
		return await this.client?.subscribeAsync(topic);
	}

	async unsubscribe(topic: string | string[] | undefined) {
		if (!topic) return;
		this.log("unsubscribe", topic);
		return await this.client?.unsubscribeAsync(topic);
	}

	async startTracking({ latitudeStart, latitudeEnd, longitudeEnd, longitudeStart }: LatitudeParams, token: string) {
		this.log("tracking", latitudeStart, latitudeEnd, longitudeEnd, longitudeStart)
		this.unsubscribe(this.subscriptions.get(token));
		const topic = bbox2geohashes(latitudeStart, longitudeStart, latitudeEnd, longitudeEnd).map(
			(t) => `/hfp/v2/journey/ongoing/+/+/+/+/+/+/+/+/+/+/${t}/#`,
		);
		if (topic.length > 0) {
			this.subscriptions.set(token, topic);
			this.subscribe(topic);
		}
	}
}

// It would be better to use DI here, but for simplicity let's make it static
export const hsl = new HSLClient();
