
{{operation}} {{operationName}}{{#if finalArgsTop}}({{#each finalArgsTop}}{{alias}}: {{type}}{{#unless @last}}, {{/unless}}{{/each}}){{/if}} {
    {{operationName}}{{#if args}}({{#each args}}{{name}}: {{alias}}{{#unless @last}}, {{/unless}}{{/each}}){{/if}}{{#if fields}} {
        {{fields}}
    }{{/if}}
    {{#if unionObjectArr}}
    {{#each unionObjectArr}}
    {{operationName}}{{#if args}}({{#each args}}{{name}}: {{alias}}{{#unless @last}}, {{/unless}}{{/each}}){{/if}}{{#if fields}} {
        {{fields}}
    }{{/if}}
    {{/each}}
    {{/if}}
}
