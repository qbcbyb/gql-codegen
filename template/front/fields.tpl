{{#each fields}}
{{#if isVisibleNormalType}}
{{name}}
{{/if}}
{{#if ../not_mutation}}
{{#if subResults}}
{{name}} {
    {{subResults}}
}
{{/if}}
{{/if}}
{{/each}}