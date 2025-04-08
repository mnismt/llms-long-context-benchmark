
// Model families and their colors
export const modelFamilies = {
  Anthropic: ["claude-3-7-sonnet-20250219-thinking", "claude-3-7-sonnet-20250219", "claude-3-5-sonnet-20241022"],
  OpenAI: ["o1", "o3-mini", "gpt-4.5-preview", "chatgpt-4o-latest"],
  Google: [
    "gemini-2.5-pro-exp-03-25:free",
    "gemini-2.0-flash-thinking-exp:free",
    "gemini-2.0-pro-exp-02-05:free",
    "gemini-2.0-flash-001",
    "gemma-3-27b-it:free"
  ],
  DeepSeek: ["deepseek-r1", "deepseek-chat-v3-0324:free", "deepseek-chat:free"],
  Meta: ["llama-4-maverick:free", "llama-4-scout:free", "llama-3.3-70b-instruct"],
  Qwen: ["qwq-32b:free", "qwen-max"],
  Other: [
    "jamba-1-5-large",
    "dolphin3.0-r1-mistral-24b:free",
    "quasar-alpha",
  ],
};

export const familyColors = {
  Anthropic: "#D97757",
  OpenAI: "#21AC85",
  Google: "#EB493D",
  DeepSeek: "#4C6BFE",
  Meta: "#007CF2",
  Qwen: "#634CEC",
  Other: "#888888",
};

// Top performing models to show by default
export  const topModels = [
  "gemini-2.5-pro-exp-03-25:free",
  "chatgpt-4o-latest",
  "o1",
  "claude-3-7-sonnet-20250219-thinking",
  "deepseek-r1",
  "qwq-32b:free",
  "llama-4-maverick:free",
  "llama-4-scout:free"
];