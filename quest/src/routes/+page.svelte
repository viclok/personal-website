<svelte:head>
	<title>Battle Log</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang='ts'>
	let { form } = $props();
	let questSelected = $state();
	let outcome = $state();

	const displaySuggestions = (): string[] => {
		if (form?.suggestions) {
			let suggestionArray: string[] = form?.suggestions.split("@")
			return suggestionArray;
		}
		return ["An error has occurred"];
	};
	const selectQuest = (suggestion: string) => {
		questSelected = suggestion;
		// console.log(suggestion + 'and ' + questSelected);
	}

	const registerSuccess = (quest_outcome: boolean) => {
		// console.log(quest_outcome);
		if (quest_outcome) {
			outcome = "You won the day"
		} else {
			outcome = "Try again tomorrow"
		}
	}
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
	{#if !questSelected}
		<ul>
			{#each displaySuggestions() as suggestion, i}
				<li><button onclick={() => selectQuest(suggestion)}>{suggestion}</button></li>
			{/each}
		</ul>
		<form method ="POST" action="?/reroll">
			<button type="submit">Reroll</button>
		</form>
	{:else}
		<h1>{questSelected}</h1>
		<button onclick={() => registerSuccess(true)}>Victory</button>
		<button onclick={() => registerSuccess(false)}>Defeat</button>
		<h1>{outcome}</h1>
	{/if}
{/if}
