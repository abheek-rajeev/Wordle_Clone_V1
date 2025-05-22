import React, { useEffect } from "react";
const Hint = () => {
  useEffect(() => {
    const fetchClue = async () => {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "microsoft/phi-4-reasoning-plus:free",
            messages: [
              {
                role: "user",
                content: "What is the meaning of life?",
                Format: {
                  word: "chock",
                  meanings: [
                    {
                      partOfSpeech: "...",
                      definitions: [
                        {
                          definition: "...",
                          synonyms: [],
                          antonyms: [],
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          }),
        }
      );
    };
  });
  return <></>;
};

export default Hint;
