export const useVoiceCategories = [
  {
    name: "Susan",
    id: "s3://voice-cloning-zero-shot/f6594c50-e59b-492c-bac2-047d57f8bdd8/susanadvertisingsaad/manifest.json",
  },
  {
    name: "Olivia",
    id: "s3://voice-cloning-zero-shot/9fc626dc-f6df-4f47-a112-39461e8066aa/oliviaadvertisingsaad/manifest.json",
  },
  {
    name: "Micah",
    id: "s3://voice-cloning-zero-shot/a5cc7dd9-069c-4fe8-9ae7-0c4bae4779c5/micahsaad/manifest.json",
  },
  {
    name: "Navya",
    id: "s3://voice-cloning-zero-shot/e5df2eb3-5153-40fa-9f6e-6e27bbb7a38e/original/manifest.json",
  },
  {
    name: "Axel",
    id: "s3://voice-cloning-zero-shot/def0cd31-1b8c-486e-82d2-050a0ea2965d/axelsaad/manifest.json",
  },
  {
    name: "Calvin",
    id: "s3://voice-cloning-zero-shot/743575eb-efdc-4c10-b185-a5018148822f/original/manifest.json",
  },
];

export const useVoiceType = (voiceType: string | null) => {
  const voiceId =
    useVoiceCategories.find(({ name }) => name === voiceType)?.id || null;
  return voiceId;
};
