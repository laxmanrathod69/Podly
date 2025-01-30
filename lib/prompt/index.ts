export const generateTextPrompt = (
  topic: string,
) => `prompt: Create a podcast episode script on ${topic}. The episode should be informative, engaging, and total characters should be ${2000} characters  long. Include a brief introduction that hooks the listener, followed by 3-4 main talking points. Incorporate relevant facts, statistics, or expert opinions to support your discussion. Conclude with a summary of key takeaways and a call-to-action for listeners.

      Please keep the language conversational and accessible to a general audience. Do not include a formal intro or outro segment. Instead, focus on delivering clean, concise, and valuable content throughout the episode.

      Remember to maintain a friendly and approachable tone, as if you're having a casual conversation with the listener. Feel free to include occasional humor or anecdotes where appropriate to keep the audience engaged.

      Lastly, provide suggestions for potential guest experts or interviewees who could add value to this episode topic.`

// export const generateTextPrompt = (topic: string) =>
//   `Generate a podcast episode script for the title/topic '${topic}' for an AI-powered podcast app called Podly. The episode should be engaging, informative, and focused on providing value to the audience. The script should include the following sections:

// 1. Introduction: A brief and catchy introduction to the topic.

// 2. Key Discussion Points: At least 3-4 main points or subtopics to discuss in detail.

// 3. Expert Insights/Advice: Offer relevant expert opinions, tips, or actionable advice based on the topic.

// 4. Conclusion: Wrap up with a summary, takeaway, or call to action (e.g., encouraging listeners to subscribe, share, or explore more resources).

// Ensure the tone is friendly and conversational, making it easy for listeners to follow along. Aim for a script length that would take around 5-6 minutes to read aloud.`

export const generateThumbnailPrompt = (prompt: string) => {
  const isTitle =
    prompt.includes(" ") || (!prompt.includes(",") && !prompt.includes(", "))
  const promptTitle = isTitle ? prompt : ""
  const promptKeywords = !isTitle ? prompt : ""

  return `Generate a podcast thumbnail image for a podcast titled '${promptTitle || promptKeywords}' for Podly, an AI-powered podcast app. The image should be visually appealing, realistic, and relevant to the podcast topic. Use the following details for inspiration:

1. Podcast Title: ${promptTitle || promptKeywords}

2. Topics/Keywords: ${promptTitle || promptKeywords}

3. Visual Elements: Use symbols, icons, or images related to the podcast theme, such as:

  • For a tech podcast: futuristic, sleek designs, gadgets, or abstract digital patterns.
  • For a health podcast: peaceful, clean colors, nature, or wellness imagery (e.g., yoga poses, mindfulness symbols).
  • For a music podcast: musical notes, instruments, vibrant colors, or performers.
  • For a business or entrepreneurship podcast: professional office settings, people collaborating, modern office spaces, or graphs.

4. Overall Tone: The thumbnail should convey the feel of the podcast—whether it's energetic, calm, professional, or creative.

5. Text: The podcast title should be included in bold, legible text. The font should be clean and easy to read, even at smaller sizes.

Make the image look realistic and professional, with a high-quality, polished finish. The color scheme should align with the mood and topic of the podcast, and the composition should be balanced to ensure the thumbnail stands out in a podcast directory.`
}
