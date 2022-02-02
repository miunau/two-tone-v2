<script>
    import {dataSetsStore} from "../stores/dataSetsStore.js";
    console.log($dataSetsStore);
</script>

<svelte:head>
    <title>Welcome</title>
</svelte:head>


    <h1 class="title">
        Data Sets
    </h1>

{#each $dataSetsStore as metadataObject }
    <div >
        {metadataObject.position} ▶︎ {metadataObject.title}
    </div>
    <div >
        <a class="has-text-light" href={metadataObject.source} target="_blank">source</a>
    </div>
{/each}


<style>

</style>
