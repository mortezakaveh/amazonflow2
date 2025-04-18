'use server';
/**
 * @fileOverview A social media caption generator AI agent.
 * 
 * - generateSocialMediaCaption - A function that handles the social media caption generation process.
 * - GenerateSocialMediaCaptionInput - The input type for the generateSocialMediaCaption function.
 * - GenerateSocialMediaCaptionOutput - The return type for the generateSocialMediaCaption function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {RssItem} from '@/services/rss';
import {Product} from '@/services/google-merchant';

const GenerateSocialMediaCaptionInputSchema = z.object({
  platform: z.enum(['X', 'Instagram', 'Facebook']).describe('The social media platform for the caption.'),
  item: z.union([
    z.object({
      type: z.literal('rss'),
      data: z.custom<RssItem>(() => true),
    }),
    z.object({
      type: z.literal('product'),
      data: z.custom<Product>(() => true),
    }),
  ]).describe('The item to generate a caption for.'),
});
export type GenerateSocialMediaCaptionInput = z.infer<typeof GenerateSocialMediaCaptionInputSchema>;

const GenerateSocialMediaCaptionOutputSchema = z.object({
  caption: z.string().describe('The generated social media caption.'),
  tone: z.string().describe('The tone of the generated caption.'),
  length: z.string().describe('The length of the generated caption.'),
});
export type GenerateSocialMediaCaptionOutput = z.infer<typeof GenerateSocialMediaCaptionOutputSchema>;

export async function generateSocialMediaCaption(input: GenerateSocialMediaCaptionInput): Promise<GenerateSocialMediaCaptionOutput> {
  return generateSocialMediaCaptionFlow(input);
}

const determineCaptionTone = ai.defineTool({
  name: 'determineCaptionTone',
  description: 'Determines the appropriate tone for a social media caption based on the platform and item.',
  inputSchema: z.object({
    platform: z.enum(['X', 'Instagram', 'Facebook']).describe('The social media platform.'),
    itemType: z.enum(['rss', 'product']).describe('The type of item (RSS feed or product).'),
  }),
  outputSchema: z.string().describe('The tone of the caption (e.g., informative, funny, promotional).'),
}, async (input) => {
  // Implement logic to determine the caption tone based on the platform and item type.
  // For example, a product on Instagram might have a promotional tone, while an RSS feed on X might be informative.
  if (input.platform === 'Instagram' && input.itemType === 'product') {
    return 'promotional';
  } else if (input.platform === 'X' && input.itemType === 'rss') {
    return 'informative';
  } else {
    return 'neutral';
  }
});

const determineCaptionLength = ai.defineTool({
  name: 'determineCaptionLength',
  description: 'Determines the appropriate length for a social media caption based on the platform.',
  inputSchema: z.object({
    platform: z.enum(['X', 'Instagram', 'Facebook']).describe('The social media platform.'),
  }),
  outputSchema: z.string().describe('The length of the caption (e.g., short, medium, long).'),
}, async (input) => {
  // Implement logic to determine the caption length based on the platform.
  // For example, X captions should be short, while Instagram captions can be longer.
  if (input.platform === 'X') {
    return 'short';
  } else if (input.platform === 'Instagram') {
    return 'medium';
  } else {
    return 'medium';
  }
});

const generateSocialMediaCaptionPrompt = ai.definePrompt({
  name: 'generateSocialMediaCaptionPrompt',
  input: {
    schema: z.object({
      platform: z.string().describe('The social media platform for the caption.'),
      itemTitle: z.string().describe('The title of the item.'),
      itemDescription: z.string().describe('The description of the item.'),
      tone: z.string().describe('The tone of the caption.'),
      length: z.string().describe('The length of the caption.'),
    }),
  },
  output: {
    schema: z.object({
      caption: z.string().describe('The generated social media caption.'),
    }),
  },
  prompt: `You are an expert social media manager. Generate an SEO-optimized social media caption for the following item, considering the platform, tone, and length.

Platform: {{{platform}}}
Item Title: {{{itemTitle}}}
Item Description: {{{itemDescription}}}
Tone: {{{tone}}}
Length: {{{length}}}

Caption:`, 
  tools: [determineCaptionTone, determineCaptionLength],
});

const generateSocialMediaCaptionFlow = ai.defineFlow<
  typeof GenerateSocialMediaCaptionInputSchema,
  typeof GenerateSocialMediaCaptionOutputSchema
>({
  name: 'generateSocialMediaCaptionFlow',
  inputSchema: GenerateSocialMediaCaptionInputSchema,
  outputSchema: GenerateSocialMediaCaptionOutputSchema,
}, async input => {
  const {platform, item} = input;

  // Determine the item type (RSS or product).
  const itemType = item.type;

  // Extract item data based on the type.
  const itemData = item.data as RssItem | Product;

  // Determine caption tone and length using tools
  const tone = await determineCaptionTone({
    platform: platform,
    itemType: itemType,
  });

  const length = await determineCaptionLength({
    platform: platform,
  });

  const {output} = await generateSocialMediaCaptionPrompt({
    platform: platform,
    itemTitle: itemData.title,
    itemDescription: itemData.description,
    tone: tone,
    length: length,
  });

  return {
    caption: output!.caption,
    tone: tone,
    length: length,
  };
});











