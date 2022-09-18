<script lang="ts">
	import { variables } from '$lib/variables';
	import { Column, Grid, ListItem, Row, UnorderedList } from 'carbon-components-svelte';
	import type { Server } from 'src/lib/types';

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
				<p>Loading Server list</p>
			{:then list}
				<UnorderedList>
					{#each list as server}
						<ListItem>{server.id} - {server.name}</ListItem>
					{/each}
				</UnorderedList>
			{/await}
		</Column></Row
	>
</Grid>
