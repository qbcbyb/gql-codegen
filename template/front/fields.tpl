{{#each fields}}
{{#unless isObjectType}}
{{name}}
{{/unless}}
{{#if ../not_mutation}}
{{#if subResults}}
{{name}} {
    {{subResults}}
}
{{/if}}
{{/if}}
{{/each}}