<script lang="ts">
	import type { Server } from '$lib/types';
	import { variables } from '$lib/variables';
	import { Button, ListItem, UnorderedList } from 'carbon-components-svelte';
	import { onMount, onDestroy } from 'svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let messages: string[] = ['messages'];
	let eventSource: EventSource;
	onMount(async () => {
		eventSource = new EventSource(`${variables.basePath}/server/install/events`);
		eventSource.onmessage = (e) => {
			console.log(e.data);
			messages.push(e.data);
		};
	});
	onDestroy(async () => {
		eventSource.close();
	});

	const load = async (): Promise<Server> => {
		const url = `${variables.basePath}/server/${data.id}`;
		const resp = await fetch(url);
		const text = await resp.text();
		const server = JSON.parse(text);
		return server;
	};

	const install = async (): Promise<void> => {
		const resp = await fetch(`${variables.basePath}/install/${data.id}`, { method: 'POST' });
	};

	let promise = load();
</script>

<h1>Install server</h1>
{#await promise}
	<p>Loading Server...</p>
{:then server}
	<p>Name: {server.name} <Button on:click={() => install()}>Install</Button></p>
{/await}
<UnorderedList>
	{#each messages as m}
		<ListItem>{m}</ListItem>
	{/each}
</UnorderedList>
