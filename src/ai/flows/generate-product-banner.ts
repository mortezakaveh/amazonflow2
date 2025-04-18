// @ts-nocheck
'use server';
/**
 * @fileOverview A product banner generation AI agent.
 *
 * - generateProductBanner - A function that handles the product banner generation process.
 * - GenerateProductBannerInput - The input type for the generateProductBanner function.
 * - GenerateProductBannerOutput - The return type for the generateProductBanner function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateProductBannerInputSchema = z.object({
  productTitle: z.string().describe('The title of the product.'),
  productDescription: z.string().describe('The description of the product.'),
  productImageLink: z.string().describe('The URL of the product image.'),
});
export type GenerateProductBannerInput = z.infer<typeof GenerateProductBannerInputSchema>;

const GenerateProductBannerOutputSchema = z.object({
  bannerImage: z.string().describe('The URL of the generated banner image.'),
});
export type GenerateProductBannerOutput = z.infer<typeof GenerateProductBannerOutputSchema>;

export async function generateProductBanner(input: GenerateProductBannerInput): Promise<GenerateProductBannerOutput> {
  return generateProductBannerFlow(input);
}

const decideIfProductNeededInBanner = ai.defineTool({
  name: 'decideIfProductNeededInBanner',
  description: 'Decides whether a product should be included in the banner image based on its description and title.',
  inputSchema: z.object({
    productTitle: z.string().describe('The title of the product.'),
    productDescription: z.string().describe('The description of the product.'),
  }),
  outputSchema: z.boolean().describe('Whether the product should be included in the banner image.'),
},async input => {
    // Implement the logic to decide if the product should be in the banner
    // For example, if the description mentions unique visual features, include the product
    return input.productDescription.length > 50;
  }
);

const generateProductBannerPrompt = ai.definePrompt({
  name: 'generateProductBannerPrompt',
  tools: [decideIfProductNeededInBanner],
  input: {
    schema: z.object({
      productTitle: z.string().describe('The title of the product.'),
      productDescription: z.string().describe('The description of the product.'),
      productImageLink: z.string().describe('The URL of the product image.'),
    }),
  },
  output: {
    schema: z.object({
      bannerImage: z.string().describe('The URL of the generated banner image.'),
    }),
  },
  prompt: `You are an AI assistant specializing in generating product banner prompts for DALL-E 3 or similar image generation models.

  Instructions: Use the information about the product to formulate a detailed prompt for generating a visually appealing banner image. Consider the product's title, description, and image link.

  Reasoning: Use the decideIfProductNeededInBanner tool to determine if the product itself should be present in the banner.  If the product is needed, incorporate it creatively. If not, focus on a background or theme that complements the product.

  Product Title: {{{productTitle}}}
  Product Description: {{{productDescription}}}

  Banner Prompt: Based on the above information, create a prompt suitable for DALL-E 3. The prompt should be detailed and creative, describing the desired banner image.

  Output Format: Provide ONLY the URL of the generated banner image in the 'bannerImage' field.
  `,
});

const generateProductBannerFlow = ai.defineFlow<
  typeof GenerateProductBannerInputSchema,
  typeof GenerateProductBannerOutputSchema
>({
  name: 'generateProductBannerFlow',
  inputSchema: GenerateProductBannerInputSchema,
  outputSchema: GenerateProductBannerOutputSchema,
}, async input => {
  const {output} = await generateProductBannerPrompt(input);
  return output!;
});

