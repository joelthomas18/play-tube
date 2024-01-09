<script>
  import Youtube from "svelte-youtube-embed";

  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  import { afterNavigate, goto } from "$app/navigation";

  export let data;
  let userName = data.userData.userName;

  let allVideos = data.allVideos;
  let showMsg = true;
  let welomeMsg = allVideos.length > 0 ? "Welcome back," : "welcome";
  let showVideoPlayer = false;
  let selectedVideoUrl;
  let showOptions = false;
  let selectedOptionId;
  const handleOption = (id) => {
    selectedOptionId = id;
    showOptions = showOptions === true ? false : true;
  };
  setTimeout(() => {
    showMsg = false;
  }, 3000);

  const onVideoSelection = (url) => {
    showVideoPlayer = true;
    selectedVideoUrl = url;
  };

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

  const deleteVideo = async (id) => {
    let payload = { _id: id };
    try {
      let response = await postJSONDATA("/api/deleteVideo", payload);
    } catch (error) {
      console.log(error);
    }
    getAllVideos();
  };

  afterNavigate(() => {
    console.log(data);
    if (data.userData.isAuthenticated === false) {
      goto("/");
    } else {
      getAllSearchTags();
    }
  });
</script>

<div class="flex justify-end mt-2">
  <a href="/play-tube/edit-section"
    ><button class="btn">Add/Edit Categories</button></a
  >
</div>
<div class="mb-5 max-w-sm mx-auto">
  <div class="w-86 max-w-lg">
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
    <div class="absolute mt-2 w-[387px] overflow-hidden rounded-md bg-white">
      {#each autoSuggestions as item}
        <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
          <p
            on:click={() => {
              searchVideoWithSuggestion(item);
            }}
            class="text-sm font-medium text-gray-600"
          >
            {item}
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>

<div
  class=" md:text-start flex flex-col leading-7 items-center justify-center mt-[45px] gap-2 xl:mx-4"
>
  {#if showMsg && userName !== undefined}
    <h1 class="font-bold font-sans md:text-3xl text-center">
      {welomeMsg} <span class="ml-1">{userName}</span>
    </h1>
  {/if}

  {#if allVideos.length === 0}
    <p class="mt-5 md:text-3xl font-mono text-center">
      Start enjoying play-tube library by creating a new category and you can
      have a sub-category.
    </p>
    <p class="mt-5 md:text-3xl font-mono text-center">
      What you can do is just copy your favourite video url and paste it inside
      the video adding section.
    </p>
    <a href="/play-tube/category">
      <button class="btn mt-5 md:border-2">Create Category</button></a
    >
  {/if}
</div>
<div
  class="flex container xl:justify-center mx-auto flex-wrap justify-center md:justify-center lg:justify-start lg:gap-6 md:gap-10 gap-9 mt-4"
>
  {#each allVideos as video (video._id)}
    <div
      class="flex text-black flex-col justify-center items-center max-w-sm rounded-lg shadow cursor-pointer border hover:border-black"
    >
      <img
        class="rounded-t-lg"
        src="https://i.ytimg.com/vi/{video.videoUrl}/mqdefault.jpg"
        alt=""
        on:click={() => {
          onVideoSelection(video.videoUrl);
        }}
      />
      <div class="">
        <h5 class="mb-2 text-2xl font-bold tracking-tight">
          {video.title}
        </h5>

        <p class="text-center">{video.description}</p>
      </div>
      <div class="ml-auto relative">
        <svg
          on:click={() => {
            handleOption(video._id);
          }}
          class="w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          id="option"
          ><g data-name="Layer 2"
            ><circle cx="5.11" cy="16" r="3.11"></circle><circle
              cx="16"
              cy="16"
              r="3.11"
            ></circle><circle cx="26.89" cy="16" r="3.11"></circle></g
          ></svg
        >
        {#if showOptions && selectedOptionId === video._id}
          <div
            class="flex flex-col absolute bottom-4 right-1 p-1 font-serif font-bold"
          >
            <a href="/play-tube/video-admin/edit-video/{video._id}">
              <button class="border border-black rounded-md p-1">Edit</button>
            </a>
            <button
              on:click={() => {
                deleteVideo(video._id);
                showOptions = false;
              }}
              class="border border-black rounded-md p-1">Delete</button
            >
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
{#if showVideoPlayer}
  <div
    class=" fixed px-3 md:px-0 w-[100%] md:w-[500px] top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4"
  >
    <Youtube id={selectedVideoUrl} />
    <svg
      on:click={() => {
        showVideoPlayer = false;
      }}
      class="h-10 w-10 absolute top-0 right-3 md:right-0 cursor-pointer"
      v
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <path
        fill="#F44336"
        d="M21.5 4.5H26.501V43.5H21.5z"
        transform="rotate(45.001 24 24)"
      ></path><path
        fill="#F44336"
        d="M21.5 4.5H26.5V43.501H21.5z"
        transform="rotate(135.008 24 24)"
      ></path>
    </svg>
  </div>
{/if}
