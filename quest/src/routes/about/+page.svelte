<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang='ts'>
	let { form } = $props();
	const displaySuggestions = (): string[] => {
		if (form?.suggestions) {
			let suggestionArray: string[] = form?.suggestions.split("@")
			return suggestionArray;
		}
		return ["An error has occurred"];
	};
</script>

<div class="text-column">
	<form method="POST">
		<label>
			Goal:
			<input name="user_goal" type="text" defaultValue="Get fit">
		</label>
		<label>
			Energy:
			<input name ="energy" type="number" min="1" max="10" defaultValue=5>
		</label>
		<button type="submit">Submit</button>
	</form>
</div>

{#if form}
	<ul>
		{#each displaySuggestions() as suggestion}
			<li>{suggestion}</li>
		{/each}
	</ul>

{/if}
