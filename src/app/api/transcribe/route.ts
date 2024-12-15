import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const formData = await req.formData();
  const audioFile = formData.get("audioFile");
  if (!audioFile) {
    return Response.json({ error: "No audio file provided" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY as string
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  try {
    const apiResponse = await model.generateContent([
      {
        inlineData: {
          mimeType: "audio/wave",
          data: audioFile as string,
        },
      },
      { text: "Please transcribe the audio file." },
    ]);

    const transcribedText = await apiResponse.response.text();

    console.log("transcribe.ts: ", { transcribedText });
    return Response.json({ response: transcribedText });
  } catch (error) {
    console.error("Error transcribing audio", error);
    return Response.json(
      { error: "Error transcribing audio: " + (error as Error).message },
      { status: 500 }
    );
  }
}
