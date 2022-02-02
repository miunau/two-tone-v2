import { arrayStore } from "./arrayStore.js";
import dataSetsIndex from "../dataSets/dataSetsIndex.js";
import { writable } from "svelte/store";

const dataSetsStore = (initial) => {
    const store = arrayStore(initial);
    const load = async ({ position, data_id, title, source, importDataFrom, dataType = 'json' }) => {
        let structuredData;
        console.log('adding', position, data_id, title, source, importDataFrom, dataType);
        if(typeof importDataFrom === 'function') {
            // Handle async loading..
            const _data = await Promise.resolve(importDataFrom());
            structuredData = _data.default || _data; // importing a json file returns fields in both the root and under .default
        }
        if(dataType === 'csv') {
            // parse csv into json
            // data = parseCSV(data);
        }
        store.push({
            position,
            data_id,
            title,
            source,
            structuredData
        });
    }

    return {
        ...store,
        load,
        loadMany: async(items) => {
            return Promise.all(
                items.map(load)
            );
        }
    };
};

export const dataSets = dataSetsStore([]);

dataSets.loadMany(dataSetsIndex.map( ( dataset, index  ) =>
{
    return {
        position: index,
        data_id: dataset.id,
        title: dataset.metadata.title,
        source:  dataset.metadata.source,
        importDataFrom: dataset.attachments.data
    }
}));

/*
let destructedDataSets = () => {

    const dataSets = 
    dataSetsStore.set(dataSets);
};
destructedDataSets();
*/
