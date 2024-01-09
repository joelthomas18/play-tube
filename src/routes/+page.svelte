<script>
  import { afterNavigate, goto } from "$app/navigation";
  import NavBar from "$lib/components/NavBar.svelte";
  let test = true;
  export let data;
  afterNavigate(() => {
    if (data.userData.isAuthenticated) {
      goto("/play-tube/home");
    }
  });
</script>

<svelte:head>
  <style>
    /* body {
    background: url(/bg.jpg) no-repeat center center fixed;
    background-size: cover;
    overflow: hidden;
  } */
  </style>
</svelte:head>

<NavBar />
<div class="text-black text-center">
  <div
    class="flex flex-col items-center my-[18%] md:mt-[8%] gap-7 md:gap-10 justify-center"
  >
    <h1 class="text-center text-3xl md:text-6xl font-semibold font-serif">
      Welcome to Play tube
    </h1>
    <p
      class="text-center text-2xl md:text-2xl leading-7 font-mono xl:whitespace-break-spaces"
    >
      Play-tube is a platform where you can create your own youtube library by
      categorising based on your genre for free.
    </p>
    <a href="/play-tube/register" class="btn md:border-2 mt-3">Get Started</a>
  </div>
</div>

<style>
</style>
