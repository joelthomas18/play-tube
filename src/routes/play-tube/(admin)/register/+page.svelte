<script>
  import { postJSONDATA, getJSONDATA } from "$lib/services/ajax-services";

  let registerInfo = {};
  const handleRegister = async () => {
    try {
      if (
        registerInfo.userName &&
        registerInfo.email &&
        registerInfo.password
      ) {
        let response = await postJSONDATA(
          "/api/handleRegister",
          registerInfo,
          true
        );
        if (response.status === "success") {
          registerInfo = "";
          location.href = "/play-tube/signin";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<!-- s -->

<div class=" flex items-center justify-center mt-[6%]">
  <div class="w-full max-w-sm">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          required
          bind:value={registerInfo.userName}
        />
      </div>
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
          bind:value={registerInfo.email}
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
          bind:value={registerInfo.password}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          on:click={handleRegister}
        >
          Register
        </button>
        <div class="flex flex-col gap-2">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/play-tube/signin"
          >
            Already a user? Sign in
          </a>
        </div>
      </div>
    </form>
  </div>
</div>
