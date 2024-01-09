<script>
  import { page } from "$app/stores";
  import { afterNavigate, goto } from "$app/navigation";
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  export let data;
  let payload = {};
  let videoId;
  let videoData = {};

  let allCategory = [];
  let allSubCategory = [];
  let allItemCategory = [];
  let searchTags = [];

  const getVideoData = async () => {
    videoId = $page.params.id;
    payload = { _id: videoId };

    let response = await postJSONDATA("/api/getVideoById", payload);

    videoData = await response.data;

    let selected = videoData.category;
    let subCategoryResponse = await getJSONDATA(
      "/api/getSubCategoryByCategoryId",
      { category: selected }
    );
    allSubCategory = await subCategoryResponse.data;

    let selectedSubCatgeory = videoData.subCategory;

    let itemCategoryResponse = await getJSONDATA(
      "/api/getItemCategoryByCategoryId",
      { subCategory: selectedSubCatgeory }
    );
    allItemCategory = await itemCategoryResponse.data;
  };

  const getAllCategory = async () => {
    let response = await getJSONDATA("/api/getAllCategory");
    allCategory = await response.data;
    console.log(allCategory);
  };

  const onCategorySelection = async () => {
    videoData.subCategory = null;
    videoData.category = null;
    allSubCategory = [];
    allItemCategory = [];
    let selected = videoData.category;
    let response = await getJSONDATA("/api/getSubCategoryByCategoryId", {
      category: selected,
    });
    allSubCategory = await response.data;
    console.log(allSubCategory);
  };

  const onSubCategorySelection = async () => {
    videoData.itemCategory = null;
    allItemCategory = [];
    let selected = videoData.subCategory;
    let response = await getJSONDATA("/api/getItemCategoryByCategoryId", {
      subCategory: selected,
    });
    allItemCategory = await response.data;
    console.log(allItemCategory);
  };

  const onTagChange = async () => {
    videoData.tags = videoData.tags.replace(" ", "-");
    if (videoData.tags.split(",")[1]) {
      videoData.searchTags = [
        ...videoData.searchTags,
        videoData.tags.split(",")[0],
      ];
      videoData.tags = "";
    }
  };

  const removeTag = async (tagIndex) => {
    videoData.searchTags.splice(tagIndex, 1);
    videoData.searchTags = videoData.searchTags;
  };

  const editVideo = async () => {
    if (videoData.subCategory && videoData.itemCategory) {
      let response = await postJSONDATA("/api/editVideo", videoData, true);
    }
  };

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/play-tube/home");
    } else {
      getVideoData();
      getAllCategory();
    }
  });
</script>

{#if videoData}
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
          {#if allCategory.length > 0}
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              bind:value={videoData.category}
              on:change={onCategorySelection}
            >
              {#each allCategory as category (category._id)}
                <option value={category._id}
                  >{category.categoryDisplayName}</option
                >
              {/each}
            </select>
          {/if}
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for=" Sub-category-display-name"
          >
            Sub-category-display-name
          </label>
          {#if allSubCategory.length > 0}
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              bind:value={videoData.subCategory}
              on:change={onSubCategorySelection}
              >{#each allSubCategory as subCategory (subCategory._id)}
                <option value={subCategory._id}
                  >{subCategory.subCategoryDisplayName}</option
                >
              {/each}
            </select>
          {/if}
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for=" Item-category-display-name"
          >
            Item-category-display-name
          </label>
          {#if allItemCategory.length > 0}
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              bind:value={videoData.itemCategory}
            >
              {#each allItemCategory as itemCategory (itemCategory._id)}
                <option value={itemCategory._id}
                  >{itemCategory.itemCategoryDisplayName}</option
                >
              {/each}
            </select>
          {/if}
        </div>
        <div class="">
          <label class="block text-gray-700 text-sm font-bold" for="title">
            Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter a title"
            required
            bind:value={videoData.title}
          />
        </div>
        <div class="">
          <label
            class="block text-gray-700 text-sm font-bold"
            for="description"
          >
            Description
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter a description"
            required
            bind:value={videoData.description}
          />
        </div>
        <div class="">
          <label class="block text-gray-700 text-sm font-bold" for="url">
            Video url
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter video url"
            required
            bind:value={videoData.videoUrl}
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold" for="searchtags">
            Searchtags
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter searchtags"
            on:keyup={onTagChange}
            bind:value={videoData.tags}
          />
          <div
            class="text-white text-center flex flex-wrap p-1 gap-1 items-center"
          >
            {#if videoData.searchTags && videoData.searchTags.length > 0}
              {#each videoData.searchTags as tag, tagindex}
                <small
                  class=" md:text-3xlborder-1 bg-black text-white p-1 rounded-md"
                  >{tag}
                  <span
                    on:click={() => {
                      removeTag(tagindex);
                    }}
                    class="cursor-pointer text-xl text-center text-red-700"
                    >x</span
                  ></small
                >
              {/each}
            {/if}
          </div>
        </div>
        <div class="flex items-center justify-evenly">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            on:click={editVideo}
          >
            Edit
          </button>
          <div class="flex flex-col gap-2">
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/play-tube/home"
            >
              Go back
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}
