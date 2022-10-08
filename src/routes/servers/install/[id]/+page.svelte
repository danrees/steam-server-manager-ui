<script lang="ts">
	import type { Server } from '$lib/types';
	import { variables } from '$lib/variables';
	import { Button, ListItem, Loading, UnorderedList } from 'carbon-components-svelte';
	import { onMount, onDestroy } from 'svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let messages: string[] = ['messages'];
	messages.push('second message');
	let eventSource: EventSource;
	onMount(async () => {
		eventSource = new EventSource(`${variables.basePath}/server/install/events`);
		eventSource.onmessage = (e) => {
			console.log(e.data);
			messages = [...messages, e.data];
		};
	});
	// onDestroy(async () => {
	// 	if (eventSource) {
	// 		eventSource.close();
	// 	}
	// });

	const load = async (): Promise<Server> => {
		const url = `${variables.basePath}/server/${data.id}`;
		const resp = await (await fetch(url)).json();
		//const text = await resp.json();
		console.log(resp);
		//const server = JSON.parse(resp);
		return resp;
	};

	const install = async (): Promise<void> => {
		const resp = await fetch(`${variables.basePath}/server/install/${data.id}`, { method: 'POST' });
	};

	let promise = load();
</script>

<h1>Install server</h1>
{#await promise}
	<Loading />
{:then server}
	<p>Name: {server.name} <Button on:click={() => install()}>Install</Button></p>
{/await}
<UnorderedList>
	{#each messages as m}
		<ListItem>{m}</ListItem>
	{/each}
</UnorderedList>
