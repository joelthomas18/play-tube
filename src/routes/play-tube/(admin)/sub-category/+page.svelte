<script>
  import { afterNavigate, goto } from "$app/navigation";

  export let data;
  import { postJSONDATA, getJSONDATA } from "$lib/services/ajax-services";
  let allCategory = [];
  let message = "";

  let subCategoryData = {
    category: "",
    subCategoryName: "",
    subCategoryDisplayName: "",
  };

  const getAllCategory = async () => {
    try {
      let response = await getJSONDATA("/api/getAllCategory");
      allCategory = await response.data;
      message =
        allCategory.length > 0
          ? "Please choose category"
          : "No categories available";
    } catch (error) {
      console.log(error);
    }
  };

  const createSubCategory = async () => {
    try {
      let response = await postJSONDATA(
        "/api/createSubCategory",
        subCategoryData,
        true
      );
      if (response.status === "success") {
        subCategoryData = {};
      }
    } catch (error) {
      console.log(error);
    }
  };

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/play-tube/home");
    } else {
      getAllCategory();
    }
  });
</script>

<svelte:head></svelte:head>

<div class="mx-auto flex items-center justify-center mt-8">
  <div class="w-full max-w-sm">
    <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for=" Category-name"
        >
          Category-display-name
        </label>

        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={subCategoryData.category}
        >
          <option value="" selected disabled hidden>{message}</option>
          {#each allCategory as category (category._id)}
            <option value={category._id}>{category.categoryDisplayName}</option>
          {/each}
        </select>
      </div>
      <div class="mb-3">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="Sub-category-display-name"
        >
          Sub-category-name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter a Sub-category name"
          required
          bind:value={subCategoryData.subCategoryName}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="Sub-category-display-name"
        >
          Sub-category-display-name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter a Sub-category-display-name"
          required
          bind:value={subCategoryData.subCategoryDisplayName}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          on:click={createSubCategory}
        >
          Create
        </button>
        <div class="flex flex-col gap-2">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/play-tube/item-category"
          >
            Create an item-category
          </a>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/play-tube/edit-section"
          >
            Go back
          </a>
        </div>
      </div>
    </form>
  </div>
</div>
