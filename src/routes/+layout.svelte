<script lang="ts">
	import { Content, Header, HeaderNav, HeaderNavItem } from 'carbon-components-svelte';
	import 'carbon-components-svelte/css/white.css';
</script>

<Header platformName="Steam Server Manager" company="SSM" href="/">
	<HeaderNav>
		<HeaderNavItem href="/apps" text="Steam Applications" />
		<HeaderNavItem href="/servers" text="Servers" />
	</HeaderNav>
	<h1>Title</h1>
</Header>
<Content>
	<slot />
</Content>
