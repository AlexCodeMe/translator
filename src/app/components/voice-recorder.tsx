import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";

interface VoiceRecorderProps {
  handleSetText: (text: string) => void;
}

export default function VoiceRecorder({ handleSetText }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, {
          type: "audio/wav",
        });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result;
          if (typeof base64Audio !== "string") {
            return;
          }
          const formData = new FormData();
          formData.append("audioFile", base64Audio.split(",")[1]); // Changed key to "audioFile"
          try {
            const response = await fetch("/api/transcribe", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
              console.error("Error:", result.error);
              return;
            }

            console.log("Audio uploaded successfully", result);
            handleSetText(result.response);
          } catch (error) {
            console.error(
              "An error occurred while transcribing the audio:",
              error
            );
          }
        };
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex items-center p-4">
      <button
        type="button"
        onClick={toggleRecording}
        className={`w-12 h-12 rounded-full border flex items-center justify-center ${
          isRecording ? "bg-red-500 text-white" : ""
        }`}
      >
        {isRecording ? (
          <Square className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
