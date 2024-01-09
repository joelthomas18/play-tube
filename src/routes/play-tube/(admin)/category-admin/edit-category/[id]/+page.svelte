<script>
  import { page } from "$app/stores";
  import { afterNavigate, goto } from "$app/navigation";
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  export let data;

  let payload = {};
  let categoryId;
  let categoryData = {};
  const getCategoryData = async () => {
    categoryId = $page.params.id;
    payload = { _id: categoryId };
    try {
      let response = await postJSONDATA("/api/getCategoryById", payload);
      categoryData = await response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async () => {
    if (categoryData.categoryName && categoryData.categoryDisplayName) {
      try {
        let response = await postJSONDATA(
          "/api/editCatgeory",
          categoryData,
          true
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/");
    } else {
      getCategoryData();
    }
  });
</script>

<div class="mx-auto flex items-center justify-center mt-10">
  <div class="w-full max-w-sm">
    <form class="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for=" Category-name"
        >
          Category-name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Category-name"
          type="text"
          placeholder="Enter a category name"
          required
          bind:value={categoryData.categoryName}
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="Category-display-name"
        >
          Category-display-name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="Category-display-name"
          type="text"
          placeholder="Enter a category-display-name"
          required
          bind:value={categoryData.categoryDisplayName}
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          on:click={editCategory}
        >
          Edit
        </button>
        <div class="flex flex-col gap-2">
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/play-tube/category-admin"
          >
            Go back
          </a>
        </div>
      </div>
    </form>
  </div>
</div>
