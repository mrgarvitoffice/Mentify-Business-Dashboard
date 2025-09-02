"use server";

import { getDownlineUpgradeAlerts } from "@/ai/flows/performance-prediction-downline-upgrade-alerts";
import { getSmartBuddyPersonalizedRecommendations } from "@/ai/flows/smart-buddy-personalized-recommendations";
import { textToSpeech } from "@/ai/flows/tts";
import { mockDownlineDataForAI, mockDownlineActivityForAI, mockPartnerPerformanceForAI } from "@/lib/data";

export async function getAlertsAction() {
  try {
    const alerts = await getDownlineUpgradeAlerts({
      downlineData: mockDownlineDataForAI,
    });
    return alerts;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return { alerts: [] };
  }
}

export async function getBuddyRecommendationsAction(
  message: string // The user message could be used to tailor the prompt in a more advanced setup
) {
  try {
    // For now, we use mock data. In a real app, this data would be fetched based on the logged-in user.
    const recommendations = await getSmartBuddyPersonalizedRecommendations({
      partnerPerformance: mockPartnerPerformanceForAI,
      downlineActivity: mockDownlineActivityForAI,
    });
    return recommendations;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return {
      recommendations: "I'm sorry, I couldn't fetch recommendations at this time. Please try again later.",
    };
  }
}


export async function textToSpeechAction(text: string) {
  try {
    const response = await textToSpeech(text);
    return response;
  } catch (error) {
    console.error("Error in TTS action:", error);
    return { media: "" };
  }
}
