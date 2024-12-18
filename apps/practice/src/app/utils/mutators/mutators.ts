// This file defines our "mutators".
//
// Mutators are how you change data in Replicache apps.
//
// They are registered with Replicache at construction-time and callable like:
// `myReplicache.mutate.createTodo({text: "foo"})`.
//
// Replicache runs each mutation immediately (optimistically) on the client,
// against the local cache, and then later (usually moments later) sends a
// description of the mutation (its name and arguments) to the server, so that
// the server can *re-run* the mutation there against the authoritative
// datastore.
//
// This re-running of mutations is how Replicache handles conflicts: the
// mutators defensively check the database when they run and do the appropriate
// thing. The Replicache sync protocol ensures that the server-side result takes
// precedence over the client-side optimistic result.
//
// If the server is written in JavaScript, the mutator functions can be directly
// reused on the server. This sample demonstrates the pattern by using these
// mutators both with Replicache on the client (see [id]].tsx) and on the server
// (see pages/api/replicache/[op].ts).
//
// See https://doc.replicache.dev/how-it-works#sync-details for all the detail
// on how Replicache syncs and resolves conflicts, but understanding that is not
// required to get up and running.

import type { WriteTransaction } from "replicache";

import type { Appointment } from "~/app/components/appointments/AppointmentList";
import type { Patient } from "~/app/components/patient/PatientDetails";
import type { Task } from "./tasks";
import { type Todo, type TodoUpdate, listTodos } from "./todo";

export type M = typeof mutators;
export const getTasksPath = (patientId: string, appointmentId: string) =>
	`patients/${patientId}/appointments/${appointmentId}/tasks/`;

export const getTaskPath = (task: Task) =>
	`${getTasksPath(task.patientId, task.appointmentId)}${task.id}`;

export const mutators = {
	async createAppointment(tx: WriteTransaction, appointment: Appointment) {
		console.log("createAppointment____", appointment);
		await tx.set(`appointment/${appointment.id}`, appointment);
	},

	async deleteItemAsync(tx: WriteTransaction, id: string) {
		console.log("deleteItemAsync____", id);
		await tx.del(id);
	},
	async createPatient(tx: WriteTransaction, patient: Patient) {
		console.log("createPatient____", patient);
		await tx.set(`patients/${patient.id}`, patient);
	},
	async createTask(tx: WriteTransaction, task: Task) {
		console.log("createTask____", task);
		const path = getTaskPath(task);
		console.log("path>>>", path);
		await tx.set(path, task);
	},
	async deleteTasks(tx: WriteTransaction, tasks: Task[]) {
		console.log("deleteTasks____", tasks);
		for (const task of tasks) {
			await tx.del(getTaskPath(task));
		}
	},
	updateTodo: async (tx: WriteTransaction, update: TodoUpdate) => {
		// In a real app you may want to validate the incoming data is in fact a
		// TodoUpdate. Check out https://www.npmjs.com/package/@rocicorp/rails for
		// some heper functions to do this.
		const prev = (await tx.get(update.id)) as Todo;
		const next = { ...prev, ...update };
		await tx.set(next.id, next);
	},

	deleteTodo: async (tx: WriteTransaction, id: string) => {
		await tx.del(id);
	},

	// This mutator creates a new todo, assigning the next available sort value.
	//
	// If two clients create new todos concurrently, they both might choose the
	// same sort value locally (optimistically). That's fine because later when
	// the mutator re-runs on the server the two todos will get unique values.
	//
	// Replicache will automatically sync the change back to the clients,
	// reconcile any changes that happened client-side in the meantime, and update
	// the UI to reflect the changes.
	createTodo: async (tx: WriteTransaction, todo: Omit<Todo, "sort">) => {
		const todos = await listTodos(tx);
		todos.sort(
			(t1: { sort: number }, t2: { sort: number }) => t1.sort - t2.sort,
		);

		const maxSort = todos.pop()?.sort ?? 0;
		await tx.set(todo.id, { ...todo, sort: maxSort + 1 });
	},
};
