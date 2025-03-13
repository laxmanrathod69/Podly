export const generateTextPrompt = (topic: string) => `
Generate a podcast episode script for the title/topic '${topic}' for an AI-powered podcast app called Podly. The episode should be engaging, informative, and focused on providing value to the audience. 

Start with a brief, catchy introduction to the topic to grab the listener's attention. Follow it with 3-4 main discussion points or subtopics that delve into the details of the topic. Include expert insights or actionable advice relevant to the subject matter, offering practical tips where appropriate. Conclude with a wrap-up, summarizing the key takeaways and encouraging listeners to engage, whether by subscribing, sharing, or exploring more resources.

Ensure the tone is friendly, conversational, and easy to follow. The script should be concise, aiming for a length that would take around 1-2 minutes to read aloud.`

// export const generateThumbnailPrompt = (prompt: string) => {
//   const isTitle =
//     prompt.includes(" ") || (!prompt.includes(",") && !prompt.includes(", "))
//   const promptTitle = isTitle ? prompt : ""
//   const promptKeywords = !isTitle ? prompt : ""

//   return `Generate a podcast imageUrl image for a podcast titled '${promptTitle || promptKeywords}' for Podly, an AI-powered podcast app. The image should be visually appealing, realistic, and relevant to the podcast topic. Use the following details for inspiration:

// 1. Podcast Title: ${promptTitle || promptKeywords}

// 2. Topics/Keywords: ${promptTitle || promptKeywords}

// 3. Visual Elements: Use symbols, icons, or images related to the podcast theme, such as:

//   • For a tech podcast: futuristic, sleek designs, gadgets, or abstract digital patterns.
//   • For a health podcast: peaceful, clean colors, nature, or wellness imagery (e.g., yoga poses, mindfulness symbols).
//   • For a music podcast: musical notes, instruments, vibrant colors, or performers.
//   • For a business or entrepreneurship podcast: professional office settings, people collaborating, modern office spaces, or graphs.

// 4. Overall Tone: The imageUrl should convey the feel of the podcast—whether it's energetic, calm, professional, or creative.

// 5. Text: The podcast title should be included in bold, legible text. The font should be clean and easy to read, even at smaller sizes.

// Make the image look realistic and professional, with a high-quality, polished finish. The color scheme should align with the mood and topic of the podcast, and the composition should be balanced to ensure the imageUrl stands out in a podcast directory.`
// }
