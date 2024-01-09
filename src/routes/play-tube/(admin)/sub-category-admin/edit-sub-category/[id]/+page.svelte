<script>
  import { page } from "$app/stores";
  import { afterNavigate, goto } from "$app/navigation";
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  export let data;
  let payload = {};
  let allCategory = [];
  let subCategoryId;
  let subCategoryData;

  async function getSubCategoryData() {
    subCategoryId = $page.params.id;

    payload = { _id: subCategoryId };
    try {
      let response = await postJSONDATA("/api/getSubCategoryById", payload);
      subCategoryData = await response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllCategory() {
    try {
      let response = await getJSONDATA("/api/getAllCategory");
      allCategory = await response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const editSubCategory = async () => {
    if (
      subCategoryData.subCategoryName &&
      subCategoryData.subCategoryDisplayName
    ) {
      try {
        let response = await postJSONDATA(
          "/api/editSubCategory",
          subCategoryData,
          true
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/play-tube/home");
    } else {
      getAllCategory();
      getSubCategoryData();
    }
  });
</script>

{#if subCategoryData}
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
          {#if allCategory.length > 0}
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              bind:value={subCategoryData.category}
            >
              {#each allCategory as category (category._id)}
                <option value={category._id}
                  >{category.categoryDisplayName}</option
                >
              {/each}
            </select>
          {/if}
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
            on:click={editSubCategory}
          >
            Edit
          </button>
          <div class="flex flex-col gap-2">
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/play-tube/sub-category-admin"
            >
              Go back
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}
