<!-- <script>
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  import { onMount } from "svelte";
  export let allVideos;

  let autoSearchArray = [];
  let autoSuggestions = [];
  let searchTerm = "";

  const getAllSearchTags = async () => {
    try {
      let response = await getJSONDATA("/api/getAllSearchTags");
      autoSearchArray = await response.data;
      console.log(autoSearchArray);
    } catch (error) {
      console.log(error);
    }
  };

  const searchVideo = async () => {
    autoSuggestions = [];
    try {
      let response = await postJSONDATA("/api/searchVideo", {
        searchTerm,
      });
      allVideos = await response.data;
      console.log(allVideos);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = () => {
    autoSuggestions = [];
    if (searchTerm.length > 2) {
      autoSuggestions = autoSearchArray.filter((item) => {
        if (item.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          return item;
        }
      });
    }
  };
  const searchVideoWithSuggestion = async (item) => {
    autoSuggestions = [];
    searchTerm = item;
    try {
      let response = await postJSONDATA("/api/searchVideo", {
        searchTerm: item,
      });
      allVideos = await response.data;
      console.log(allVideos);
    } catch (error) {
      console.log(error);
    }
  };
  onMount(() => {
    getAllSearchTags();
  });
</script>

<div class="translate-y-1/3 mb-5 mx-2 max-w-sm">
  <div class="relative w-96 max-w-lg">
    <form>
      <div
        class="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20"
      >
        <input
          type="text"
          class="block w-full flex-1 py-2 px-3 focus:outline-none"
          placeholder="Start Typing..."
          bind:value={searchTerm}
          on:keyup={onSearch}
        />
        <span
          class="m-1 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700"
        >
          <svg
            class="text-white"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            on:click={searchVideo}
            ><path
              fill="currentColor"
              d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z"
            /></svg
          >
        </span>
      </div>
    </form>
    <div class="absolute mt-2 w-full overflow-hidden rounded-md bg-white">
      <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
        {#each autoSuggestions as item}
          <p
            on:click={() => {
              searchVideoWithSuggestion(item);
            }}
            class="text-sm font-medium text-gray-600"
          >
            {item}
          </p>
        {/each}
      </div>
    </div>
  </div>
</div> -->
