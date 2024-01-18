const key = import.meta.env.VITE_API_KEY;

export const generate = async (text) => {
  const prefix = "Generate 5 of concise questions and answers in an array of JSON objects from the following text:\n";
  const suffix = '\nFor example, format the output like this:\n[\n{\n"question": "question goes here",\n"answer": "answer goes here"\n}\n]\n\nOnce again, keep it at 5 question and answer pairs. Do not include additional dialogues.';

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "command",
      prompt:
        prefix +
        text.substring(0, 4096 - (prefix.length + suffix.length))
        + suffix
      ,
      temperature: 0,
      max_tokens: 500,
    }),
  };

  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", options);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};