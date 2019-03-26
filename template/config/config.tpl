module.exports = {
    "files": {
        {{#if operations}}
        {{#each operations}}
        "{{operationName}}": {
            "noNeed": {{noNeed}},
            "exclude": [],
            "include": [{{#each args}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}],
            "fields": {
                {{#if fields}}
                {{fields}}
                {{/if}}
            }
        }{{#unless @last}},{{/unless}}
        {{/each}}
        {{/if}}
    },
    "unions": {
        // "someKey": "anotherKey",
        // --------or
        // "allTrainings": [
        //     "allColumns",
        //     {
        //         "allColumns": { "exclude": ["filter"] },
        //         "allTests": {}
        //     },
        //     { "allColumns": { "include": ["page"] } },
        //     { "allColumns": { "include": [] } },
        //     {
        //         "allColumns": {
        //             "exclude": ["filter", "page"],
        //             "include": ["page", "perPage"]
        //         }
        //     },
        //     "training"
        // ]
    }
};