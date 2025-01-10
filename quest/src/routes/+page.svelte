<svelte:head>
	<title>Battle Log</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang='ts'>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let { form } = $props();
	let questSelected = $state();
	let outcome = $state();
	let streak = writable(0);

	onMount(() => {
		const storedCount = localStorage.getItem('streak');
		streak = writable(storedCount ? Number(storedCount) : 0);

		streak.subscribe((value) => {
			localStorage.setItem("streak", value.toString());
			console.log(value.toString());
		})
	})

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
			streak.update((n) => n + 1);
		} else {
			outcome = "Try again tomorrow"
			streak.update((n) => n = 0);
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
		<h2>Current streak is {$streak}</h2>
	{/if}
{/if}
