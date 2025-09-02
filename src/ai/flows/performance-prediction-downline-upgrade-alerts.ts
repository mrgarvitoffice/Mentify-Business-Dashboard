'use server';

/**
 * @fileOverview An AI agent that provides performance predictions and downline upgrade alerts.
 *
 * - getDownlineUpgradeAlerts - A function that retrieves AI-powered alerts when members of a downline are close to achieving a new pool level.
 * - DownlineUpgradeAlertsInput - The input type for the getDownlineUpgradeAlerts function.
 * - DownlineUpgradeAlertsOutput - The return type for the getDownlineUpgradeAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DownlineUpgradeAlertsInputSchema = z.object({
  downlineData: z.string().describe('JSON string of the downline data, including current pool level, business volume, and ID.'),
});
export type DownlineUpgradeAlertsInput = z.infer<typeof DownlineUpgradeAlertsInputSchema>;

const DownlineUpgradeAlertsOutputSchema = z.object({
  alerts: z.array(
    z.object({
      downlineMemberId: z.string().describe('The ID of the downline member.'),
      currentPool: z.string().describe('The current pool level of the downline member.'),
      nextPool: z.string().describe('The next pool level the downline member can achieve.'),
      businessVolumeNeeded: z
        .number()
        .describe('The business volume needed for the downline member to reach the next pool level.'),
      recommendation: z.string().describe('A personalized recommendation to help the downline member upgrade.'),
    })
  ).describe('A list of alerts for downline members close to achieving a new pool level.'),
});
export type DownlineUpgradeAlertsOutput = z.infer<typeof DownlineUpgradeAlertsOutputSchema>;

export async function getDownlineUpgradeAlerts(input: DownlineUpgradeAlertsInput): Promise<DownlineUpgradeAlertsOutput> {
  return downlineUpgradeAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'downlineUpgradeAlertsPrompt',
  input: {schema: DownlineUpgradeAlertsInputSchema},
  output: {schema: DownlineUpgradeAlertsOutputSchema},
  prompt: `You are an AI assistant that analyzes downline data and provides alerts for members who are close to achieving a new pool level.

  Analyze the following downline data:
  {{downlineData}}

  Provide a list of alerts for downline members who are close to achieving a new pool level. Include the downline member's ID, current pool, next pool, business volume needed, and a personalized recommendation to help them upgrade.

  Format the output as a JSON object that matches the schema.
  `,
});

const downlineUpgradeAlertsFlow = ai.defineFlow(
  {
    name: 'downlineUpgradeAlertsFlow',
    inputSchema: DownlineUpgradeAlertsInputSchema,
    outputSchema: DownlineUpgradeAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
