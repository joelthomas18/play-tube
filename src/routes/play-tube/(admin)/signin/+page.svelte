<script>
  import { postJSONDATA, getJSONDATA } from "$lib/services/ajax-services";
  let signInDetails = {};

  const handleSignin = async () => {
    try {
      let response = await postJSONDATA(
        "/api/handleSignin",
        signInDetails,
        true
      );

      if (response.status === "success") {
        signInDetails = "";
        location.href = "/play-tube/home";
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<svelte:head></svelte:head>

<div class="flex items-center justify-center mt-[9%]">
  <div class="w-full max-w-sm">
    <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Email"
          type="email"
          placeholder="Email"
          required
          bind:value={signInDetails.email}
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          required
          bind:value={signInDetails.password}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          on:click={handleSignin}
        >
          Sign In
        </button>
        <div class="flex flex-col">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/play-tube/register"
          >
            New user? <br />Create a new account
          </a>
        </div>
      </div>
    </form>
  </div>
</div>
