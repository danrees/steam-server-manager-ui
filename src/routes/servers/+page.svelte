<script lang="ts">
	import { variables } from '$lib/variables';
	import {
		Button,
		Column,
		Grid,
		ListItem,
		Loading,
		Row,
		UnorderedList
	} from 'carbon-components-svelte';
	import type { Server } from '$lib/types';

	const url = `${variables.basePath}/server`;
	async function getServers(): Promise<Server[]> {
		let resp = await fetch(url);
		const serverList: Server[] | string = await resp.json();
		if (resp.ok && Array.isArray(serverList)) {
			return serverList;
		} else if (typeof serverList == 'string') {
			throw new Error(serverList);
		} else {
			throw new Error('shrug?');
		}
	}

	async function deleteServer(id: number): Promise<any> {
		let resp = await fetch(`${url}/${id}`, { method: 'DELETE' });
		if (resp.ok) {
			return;
		} else {
			throw new Error('unable to delete');
		}
	}

	let promise = getServers();
</script>

<Grid>
	<Row>
		<Column>
			<h1>Servers</h1>
		</Column>
	</Row>
	<Row
		><Column>
			{#await promise}
				<Loading />
			{:then list}
				<UnorderedList>
					{#each list as server}
						<ListItem>
							<p>{server.id} - {server.name}</p>
							<Button href={`/servers/install/${server.id}`}>Install</Button>
							<Button on:click={() => deleteServer(server.id)}>Delete</Button>
						</ListItem>
					{/each}
				</UnorderedList>
			{/await}
		</Column></Row
	>
</Grid>
