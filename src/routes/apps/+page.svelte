<script lang="ts">
	import {
		Button,
		Column,
		Grid,
		Row,
		TextInput,
		UnorderedList,
		ListItem,
		Link
	} from 'carbon-components-svelte';
	import type { App } from '$lib/types';
	import { variables } from '$lib/variables';

	let searchTerm: string;
	let apps: App[] = [];
	const url = variables.basePath;

	const searchFn = async (term: string): Promise<void> => {
		const body = new URLSearchParams();
		body.append('term', `${term}`);
		const resp = await fetch(`${url}/apps/search`, {
			method: 'POST',
			body: body
		});
		const text = await resp.text();
		apps = JSON.parse(text);
	};
</script>

<Grid>
	<Row>
		<Column><h1>Steam Search</h1></Column>
	</Row>
	<Row>
		<Column>
			<TextInput
				id="search"
				labelText="Search Term"
				placeholder="search ..."
				bind:value={searchTerm}
			/>
		</Column>
	</Row>
	<Row>
		<Column>
			<Button
				on:click={() => {
					searchFn(searchTerm);
				}}>Search</Button
			>
		</Column>
	</Row>
	<Row>
		<Column>
			<UnorderedList>
				{#each apps as a}
					<ListItem>
						<Link href={`/server/create?name=${a.name}&id=${a.appid}`}
							>{`ID: ${a.appid} Name: ${a.name}`}</Link
						></ListItem
					>
				{/each}
			</UnorderedList>
		</Column>
	</Row>
</Grid>
