{{#each fields}}
{{#unless subResults}}
{{name}}: {},
{{/unless}}
{{#if ../not_mutation}}
{{#if subResults}}
{{name}}: {
    {{subResults}}
},
{{/if}}
{{/if}}
{{/each}}