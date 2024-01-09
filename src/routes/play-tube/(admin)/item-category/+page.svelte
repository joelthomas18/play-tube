<script>
  import { afterNavigate, goto } from "$app/navigation";
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  export let data;
  let allCategory = [];
  let allSubCategory = [];
  let itemCategoryData = {
    category: "",
    subCategory: "",
    itemCategoryName: "",
    itemCategoryDisplayName: "",
  };

  const getAllCategory = async () => {
    try {
      let response = await getJSONDATA("/api/getAllCategory");
      allCategory = await response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createItemCategory = async () => {
    try {
      let response = await postJSONDATA(
        "/api/createItemCategory",
        itemCategoryData,
        true
      );
      if (response.status === "success") {
        itemCategoryData = {};
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCategorySelection = async () => {
    let selected = itemCategoryData.category;
    try {
      let response = await getJSONDATA("/api/onCategorySelection", {
        category: selected,
      });
      allSubCategory = response.data;
      console.log(allSubCategory);
    } catch (error) {
      console.log(error);
    }
  };

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/");
    } else {
      getAllCategory();
    }
  });
</script>

<svelte:head></svelte:head>

<div class="mx-auto flex items-center justify-center">
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
          bind:value={itemCategoryData.category}
          on:change={onCategorySelection}
        >
          <option value="" selected disabled hidden
            >Please choose category</option
          >
          {#each allCategory as category (category._id)}
            <option value={category._id}>{category.categoryDisplayName}</option>
          {/each}
        </select>
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for=" Sub-category-display-name"
        >
          Sub-category-display-name
        </label>

        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          bind:value={itemCategoryData.subCategory}
        >
          {#each allSubCategory as subCategory (subCategory._id)}
            <option value="" selected disabled hidden
              >Please choose sub-category</option
            >

            <option value={subCategory._id}
              >{subCategory.subCategoryDisplayName}</option
            >
          {/each}
        </select>
      </div>
      <div class="mb-3">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="item-ategory-name"
        >
          Item-category-name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter an Item-category name"
          required
          bind:value={itemCategoryData.itemCategoryName}
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="Category-display-name"
        >
          Item-category-display-name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter an Item-category-display-name"
          required
          bind:value={itemCategoryData.itemCategoryDisplayName}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-evenly">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          on:click={createItemCategory}
        >
          Create
        </button>
        <div class="flex flex-col gap-2">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/play-tube/video"
          >
            Go to add video page
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
