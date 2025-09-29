<script lang="ts">
	// https://svelte.dev/playground/modal?version=5.38.10#H4sIAAAAAAAACo1VzY7bNhB-FVYNEBuwrHXSBKhWdlOgBXpIbr1FgTEmRzZrihTIkR3HMNBjL7310ifpvUAPRd-iT1KQlLyy19sWMGBp-M03P5z5dEw01JjkyTsjQLERCkkoxskkqaRCl-TvjwkdGo_whmTS479umqnboSJvW4HDW3ZuNKEml-RJ4biVDS1KXZKsG2OJxZCVNTV7Ps3CW-f6_L7UHqiQmNuYfUTO2TNHQDiqQDkc35e6yB5YdbFqiYxmRnMl-XZ-HI3ZfMFGQwKyLY5Pi0DK6mAssugXOSJwJbXIz34h5-PnTsumQWIbBIF2ND55c0nF5sUiPpUUGPuXwtWg1KLAegHiB-Qkd1hkWC984N9_A8XK8q-f6j9-TsWfv6qyLLLo0NFmHe8x6wKfYk8KoxhX4Ny8TARWUkuSRqdKOiqT3lnJhamYscyiApJ6zcjEeiUdmNRMmbXkRabkwKNP3N8aSO29Gmt20kmjHQPnOWiDngeZqfwhR9Fa9IHCAWiN1h8RbL07VhVyYn__-EvrUPgDGAaxwMn7KlwDP_R1X-T0uApgdeskBxXy-E-4I9ty8kmCY6ZpjE_E29uVI9D8mqHPz1STIc_E83KjHUlqgw3Y2kJdA4VcKmPrAAHCtbEHxjfgy0MrXUAo33YheSDsgzQWo8no_129X4GO87IDRWbC8PhHYBuL1bxMNkSNy7Nsv99Pa7RWQp3uceUI7ZSbOhOS--hgD1kc3mRxA1ZksPDb1q9DMkkIP1KS-306TZ6QiOFGX4rE1ckTMuG3_3i5_34xYaVwNJ50ezhhfCOVsKjZySMaaxo3Gg8EREhQZv2gHuN7lmXsu-_fvf0mnHyrsEZN0eFZHNlR1I5jvApZDVRk3BFOz5YYjU6PFemzNGWxylSutfFDOJsdlkGflrjzNS83sMPlFg_d-yRCtFlqo6Um9FMkd7jEmObybPNLmab-XmJCPocgXLSRbn6MxiBSXhGNw5uKGLX0DIvCibF65gvHKYFdI7H5fN6Vfm5BoPUNPZ1KHYdQyF03wMc3FrVA213UV9OBZFqWXaP6a3wC91QvoSVTGd52vQjQ7kPwcHT1SbjM_rQID1Eeh18DKrJYjf_3HvFSHR0UhvNusropqeFjupeCNjl7-QLr-2hdGSvQphaEbF3O7qbXRznTRmNnakAIqdc5u4sj9RAlz1fAt8Kapo_n39fWtFrkzK5XMLqbsO43fTm-9me-7F3ve44z67IZIN-bBvWHHgla1kGgcvbJmNpzO8bbleTpCj9JtKO76csvJmw2ffXaR37tnwfR32zxUFmo0UX_jjZ89Y-9DpIF7byE5sxxUDi6m375atz1pBsGMv-Cn12AHxXzuHmDsioQ6O_FMQSHqWnpZvYBdjN70wCXdOgv7WbGZ8zsUaLdtHZQIV2j4JCzlTJ822dSZP3UXUrvh0lCINVeapHkYZVP_wDBV_Jn0gkAAA
	import Button from './Button.svelte';
	import { X } from '@lucide/svelte';

	interface Props {
		children: any;
		opened: boolean;
	}
	let { children, opened = $bindable(true) }: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (opened && dialog) dialog.showModal();
	});

	let canClose = false;
	setTimeout(() => {
		canClose = true;
	}, 500);

	function close() {
		if (!canClose) return;
		dialog?.close();
	}
</script>

{#if opened}
	<dialog
		bind:this={dialog}
		onclose={() => (opened = false)}
		onclick={(e) => {
			if (e.target === dialog) close();
		}}
		class="fixed top-1/2 left-1/2 -translate-1/2 backdrop:bg-black/30"
	>
		<div
			class="flex size-fit max-h-full max-w-full flex-col gap-4 border border-black bg-white p-2"
		>
			<div>{@render children?.()}</div>
			<hr />
			<Button principal={false} onclick={close}>
				<div class="flex items-center justify-center">
					<X strokeWidth={1} /> Fermer
				</div>
			</Button>
		</div>
	</dialog>
{/if}
