<footer>
	<div>
		<a href="/about">About</a>
	</div>
	<div class="made">
		Made with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path
				d="M9.693 17.934l-.003-.001-.006-.003-.021-.01a8.112 8.112 0 01-.355-.172 20.748 20.748 0 01-3.917-2.592C3.266 13.361 1 10.608 1 7a5 5 0 019-3 5 5 0 019 3c0 3.608-2.266 6.361-4.39 8.156a20.745 20.745 0 01-4.196 2.729 7.809 7.809 0 01-.077.035l-.021.01-.006.003-.002.001a.766.766 0 01-.615 0z"
			/>
		</svg> in Malmö
	</div>
	<div>
		<a href="https://github.com/mattlehrer/strange-attractors">
			<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path
					fill-rule="evenodd"
					d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
					clip-rule="evenodd"
				/>
			</svg>
			<span class="sr-only">Github</span>
		</a>
	</div>
</footer>

<style>
	footer {
		width: max(70%, 300px);
		margin: auto auto 0 auto;
		max-width: 1200px;
		padding: 5rem 2rem 2rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		opacity: 0.6;

		@media screen and (min-width: 451px) {
			width: 100%;
			margin: auto auto 0 auto;
		}
	}

	a {
		color: var(--light-color);
		text-decoration: none;
	}

	.made {
		display: flex;
		align-items: center;
		order: initial;

		@media screen and (max-width: 450px) {
			order: 1;
			margin-top: 1rem;
		}
	}

	svg {
		display: inline-block;
		height: 1.5rem;
		width: 1.5rem;
		margin-inline: 0.25rem;
	}
</style>
