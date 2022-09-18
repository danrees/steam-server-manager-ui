<script lang="ts">
	import { Button, Content, Form, FormGroup, TextInput } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { variables } from '$lib/variables';

	let id: string = $page.url.searchParams.get('id') || '';
	let name: string = $page.url.searchParams.get('name') || '';
	let login: string = 'anonymous';
	let install_dir: string = name
		? `/home/steam/${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`
		: '';
	const url = `${variables.basePath}/server'`;
	async function save(): Promise<void> {
		const resp = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({ name: name, login: login, install_dir: install_dir })
		});

		if (resp.ok) {
			console.log('saved');
		} else {
			const msg = await resp.text();
			console.log('failed');
			throw new Error(msg);
		}
	}
</script>

<Content>
	<Form>
		<FormGroup>
			<TextInput id="id" bind:value={id} placeholder="Enter steam id for server" labelText="ID" />
			<TextInput id="name" bind:value={name} placeholder="Enter server name" labelText="Name" />
			<TextInput
				bind:value={login}
				placeholder="Enter steam login (probably anonymous)"
				labelText="Login"
			/>
			<TextInput
				bind:value={install_dir}
				placeholder="Enter install directory"
				labelText="Instal Directory"
			/>
			<Button on:click={save}>Save</Button>
		</FormGroup>
	</Form>
</Content>
