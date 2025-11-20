import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateExcuseAI = async (situation, mode, customInput) => {
    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("API Key not found in environment variables");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const situationText = situation === 'custom' ? customInput : situation;

        const prompt = `
      당신은 '변명 생성기' AI입니다. 다음 상황과 모드에 맞춰서 창의적이고 자연스러운 변명을 하나만 작성해주세요.
      
      상황: ${situationText}
      모드: ${mode} (
        humor: 유머러스하고 과장된, SF적이거나 엉뚱한 변명.
        desperate: 정말 절박하고 처절하며 비굴할 정도로 용서를 비는 변명.
        polite: 매우 정중하고 예의 바르며, 비즈니스 매너를 갖춘 사과와 변명.
      )
      
      제약사항:
      1. 한국어로 작성하세요.
      2. 500자 이내로 작성하세요.
      3. 오직 변명 텍스트만 출력하세요. (따옴표나 부가 설명 없이)
      4. 상황에 딱 맞는 구체적인 내용을 포함하세요.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
