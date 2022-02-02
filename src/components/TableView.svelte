<script>
    import Pagination from "./Pagination.svelte";
    import { dataSets } from "../stores/dataSetsStore.js";

    let pages = { pageCurrent: 1 , pageCount: 1, pageBreak: 4  };
</script>

    {#if $dataSets.length}
        {#each $dataSets as metadataObject, index (metadataObject.data_id)}
            <table class="table">
                <thead>{metadataObject.title.toUpperCase()}</thead>
                    {#each metadataObject.structuredData["fields"] as column}
                        <th>
                            <abbr class="has-background-success is-size-5 p-1" title={column.name}>
                                {column.name.trim()}
                            </abbr>
                            <span class="has-text-info is-size-8">
                                {column.type}
                            </span>
                        </th>
                    {/each}
                <tbody>
                <!-- key assigned from the first entry in the row or error code if null-->
                    {#each metadataObject.structuredData["rows"] as entry, currentRow (entry || '-1')}
                        {#if currentRow <= pages.pageBreak}
                            <tr>
                                <!--  key assigned from the first current index-->
                                {#each entry as cell, i ('cell'+i)}
                                    <td class="is-size-8">{cell}</td>
                                {/each}
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        {/each}
    {/if}

<!-- <Pagination pageCurrent="1" pageCount="1" pageBreak="3" />-->

