<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  export let data;
  import { getJSONDATA, postJSONDATA } from "$lib/services/ajax-services";
  import Youtube from "svelte-youtube-embed";
  import { afterNavigate } from "$app/navigation";
  var allVideos = [];
  var showVideoPlayer = false;
  var selectedVideoUrl;
  let showOptions = false;
  let selectedOptionId;
  const handleOption = (id) => {
    selectedOptionId = id;
    showOptions = showOptions === true ? false : true;
  };

  async function onVideoSelection(url) {
    showVideoPlayer = true;
    selectedVideoUrl = url;
  }

  async function getAllVideoByItemCategoryId() {
    var response = await getJSONDATA("/api/getAllVideoByItemCategoryId", {
      itemCategory: $page.params.id,
    });
    allVideos = response.data;
  }

  afterNavigate(() => {
    if (data.userData.isAuthenticated === false) {
      goto("/play-tube/home");
    } else {
      getAllVideoByItemCategoryId();
    }
  });
</script>

<div
  class="flex container mx-auto flex-wrap justify-center md:justify-start gap-9 mt-4"
>
  {#if allVideos.length === 0}
    No videos available
  {/if}
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
            <button class="border border-black rounded-md p-1">Delete</button>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
{#if showVideoPlayer}
  <div
    class="absolute px-3 md:px-0 w-[500px] top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4"
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
