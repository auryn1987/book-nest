<script lang="ts">
	import bookNestLogo from '$assets/app-logo.svg';
	import { Button } from '$components';
</script>

<header>
	<a href="/">
		<img class="logo" src={bookNestLogo} alt="Book Nest Logo" />
	</a>
	<nav>
		<ul>
			<li>
				<Button isMenu={true} href="/register">Create Account</Button>
			</li>
			<li>
				<Button isMenu={true} isSecondary={true} href="/login">Login</Button>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 4vw;
	}

	ul {
		display: flex;
		column-gap: 24px;
	}

	.logo {
		height: 72px;
	}
</style>
