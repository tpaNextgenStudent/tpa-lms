import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MarkdownContent } from './MarkdownContent';

export default {
  title: 'Common/MarkdownContent',
  component: MarkdownContent,
} as ComponentMeta<typeof MarkdownContent>;

const Template: ComponentStory<typeof MarkdownContent> = args => (
  <MarkdownContent {...args} />
);

export const Content = Template.bind({});
Content.args = {
  content: getSampleTextContent(),
};

export const Mermaid = Template.bind({});
Mermaid.args = {
  content: getSampleMermaidContent(),
};

function getSampleMermaidContent() {
  return `
  \`\`\`mermaid
  sequenceDiagram
  participant Alice
  participant Bob
  Alice->>John: Hello John, how are you?
      loop Healthcheck
  John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail!
  John-->>Alice: Great!
  John->>Bob: How about you?
      Bob-->>John: Jolly good!
  \`\`\`
  `;
}

function getSampleTextContent() {
  return `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nulla est, condimentum ac nisl a, pharetra condimentum velit. Suspendisse vel magna ultricies, pellentesque nisl eu, rutrum ante. Sed massa quam, lacinia vitae lobortis sit amet, euismod sed erat. Fusce nisl arcu, scelerisque non tortor non, ultrices pulvinar nunc. Sed in purus vitae risus eleifend elementum. Sed nec libero ultricies nisi rutrum congue imperdiet eu lorem. Suspendisse venenatis massa eget ligula vehicula, id gravida sapien feugiat. Aliquam lectus sapien, hendrerit sed efficitur eget, tristique at tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vehicula diam elit, vel viverra enim cursus tristique. Pellentesque congue urna est, vel iaculis risus fermentum vel. Maecenas in condimentum nulla. Phasellus nec velit dolor. Nulla in libero posuere tortor euismod fermentum et eget augue.

You can use *asterisks* or _underscores_ to achieve _italic text_: \`_italic_\`

Using **two of the above**, our text can become __bold__: \`**bold**\`

Three of these, give us an interesting ___bold-italic text___: \`___bold-italic___\`

In order to get a ~~strikethrough~~, you could use two tildes: \`~~strikethrough~~\`

[Links](https://facebook.com) can be placed with syntax like this: \`[Links](https://facebook.com)\`

\`inline code\` has syntax like this: \`\` \`inline code\` \`\`

- unordered list
- item 2
  - subitem 3

1. ordered list
2. nice

---

## image:
![alt text](http://unsplash.it/300/150)

---

## blockquote:

> content
> content

---

## table

| 123 | 123  | 123 | 123 | 123 |
|-----|------|-----|-----|-----|
| asd | asda | asd | aa  | aa  |
| aaa | aa   | aa  | aa  | aa  |

---

## Code blocks

no language:

\`\`\`
content
content
content
\`\`\`

with language:

\`\`\`ts
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)
\`\`\`

## Custom styles

<img src="https://unsplash.it/300/150" style="border: 5px solid red; width: 50%;" /> 
  `;
}
