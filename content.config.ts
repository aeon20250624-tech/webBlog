import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    top: defineCollection({
      source: '**/*.md',
      type: 'page',
    }),

    blog: defineCollection({
      source: "2.blog/*.md",
      type: "page",
      schema: z.object({
        draft: z.boolean(),
        tag: z.array(z.string()),
        date: z.string(),
        rawbody: z.string(),
      }),
    }),
  }
})
