
import { GoogleGenAI } from "@google/genai";
import { StaffInfo, DeviceInfo } from '../types';

export const generateLoanAgreement = async (staffInfo: StaffInfo, deviceInfo: DeviceInfo): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Generate a formal IT equipment loan agreement based on the following details.
    The tone should be professional and clear.
    The agreement should outline the user's responsibility to take care of the equipment and return it upon request or at the end of their employment.
    Do not use markdown formatting, just plain text with paragraphs.

    **Staff Details:**
    - Name: ${staffInfo.name}
    - Employee ID: ${staffInfo.employeeId}
    - Department: ${staffInfo.department}

    **Equipment Details:**
    - Device Type: ${deviceInfo.type}
    - Model: ${deviceInfo.model}
    - Serial Number: ${deviceInfo.serialNumber}

    Generate the agreement text now.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating loan agreement:", error);
    return "Failed to generate loan agreement. Please check the details and try again.";
  }
};
