'use server';
/**
 * @fileOverview A flow to provide personalized recommendations from the Smart Buddy.
 *
 * - getSmartBuddyPersonalizedRecommendations - A function that returns personalized recommendations.
 * - SmartBuddyPersonalizedRecommendationsInput - The input type for the getSmartBuddyPersonalizedRecommendations function.
 * - SmartBuddyPersonalizedRecommendationsOutput - The return type for the getSmartBuddyPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartBuddyPersonalizedRecommendationsInputSchema = z.object({
  partnerPerformance: z
    .string()
    .describe('The performance data of the business partner.'),
  downlineActivity: z
    .string()
    .describe('The activity data of the partner downline.'),
});
export type SmartBuddyPersonalizedRecommendationsInput =
  z.infer<typeof SmartBuddyPersonalizedRecommendationsInputSchema>;

const SmartBuddyPersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Personalized recommendations for the business partner to optimize income and advance pool level.'
    ),
});
export type SmartBuddyPersonalizedRecommendationsOutput =
  z.infer<typeof SmartBuddyPersonalizedRecommendationsOutputSchema>;

export async function getSmartBuddyPersonalizedRecommendations(
  input: SmartBuddyPersonalizedRecommendationsInput
): Promise<SmartBuddyPersonalizedRecommendationsOutput> {
  return smartBuddyPersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartBuddyPersonalizedRecommendationsPrompt',
  input: {
    schema: SmartBuddyPersonalizedRecommendationsInputSchema,
  },
  output: {
    schema: SmartBuddyPersonalizedRecommendationsOutputSchema,
  },
  prompt: `You are a Smart Buddy, an AI assistant that provides personalized recommendations to business partners based on their performance and downline activity.

  Provide actionable recommendations to optimize income and advance pool level. KEEP YOUR RESPONSE TO 2-3 SHORT, CONCISE SENTENCES.

  Partner Performance: {{{partnerPerformance}}}
  Downline Activity: {{{downlineActivity}}}

  Recommendations:`,
});

const smartBuddyPersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'smartBuddyPersonalizedRecommendationsFlow',
    inputSchema: SmartBuddyPersonalizedRecommendationsInputSchema,
    outputSchema: SmartBuddyPersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
