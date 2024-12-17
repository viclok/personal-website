<svelte:head>
	<title>Battle Log</title>
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

<h1>Choose your quest</h1>

<div class="text-column">
	<form method="POST" action="?/requestGoal">
		<label>
			I would like to
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
	<form method ="POST" action="?/reroll">
		<button type="submit">Reroll</button>
	</form>
{/if}
