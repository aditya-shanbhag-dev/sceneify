"use client";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import {
  FieldButton,
  FieldSelect,
  FieldSwitch,
  FieldTextarea,
} from "@/components/formfields";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { toast } from "sonner";

export default function Home() {
  const loadingStates = [
    {
      text: "Calculating the dimensions",
    },
    {
      text: "Analyzing the image",
    },
    {
      text: "Describing the scene",
    },
    {
      text: "Finding a fitting subtitle",
    },
  ];

  const [advanced, setAdvanced] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [subtitle, setSubtitle] = useState("");
  const [colour, setColour] = useState<"yellow" | "white">("yellow");
  const [font, setFont] = useState<"HelveticaItalic" | "Arial">(
    "HelveticaItalic"
  );
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!files[0]) {
      toast.warning("Please upload an image first.");
      return;
    }
    setLoading(true);

    const form = new FormData();

    form.append("image", files[0]);

    if (advanced) {
      const sub = subtitle.trim();
      const data: any = { colour, font };
      if (sub.length > 0) data.subtitle = sub;
      form.append("additionalParams", JSON.stringify(data));
    }

    const res = await fetch("/api/generate", {
      method: "POST",
      body: form,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setResultUrl(url);
    setLoading(false);
  }

  return (
    <div className="flex justify-center relative items-start m-5 rounded-2xl border border-border bg-card shadow-sm gap-2 z-100">
      {loading && (
        <div className="absolute inset-0 z-500 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Loader
            loading={loading}
            duration={3500}
            loadingStates={loadingStates}
          />
        </div>
      )}
      <div className="flex flex-col max-w-3xl gap-2 items-center justify-center border border-border bg-background p-2 rounded-lg">
        <FileUploader onChange={setFiles} />
        <div className="p-3 mt-3 flex flex-col gap-3 items-start">
          <FieldSwitch checked={advanced} onChange={setAdvanced} />
          {advanced && (
            <>
              <FieldTextarea value={subtitle} onChange={setSubtitle} />
              <FieldSelect
                font={font}
                setFont={setFont}
                colour={colour}
                setColour={setColour}
              />
            </>
          )}
          <div onClick={handleGenerate}>
            <FieldButton />
          </div>
        </div>
      </div>
      <div className="m-4 rounded-lg flex-1 bg-background flex items-center justify-center overflow-hidden max-h-[710px]">
        {resultUrl && (
          <img src={resultUrl} className="w-full h-full object-contain" />
        )}
      </div>
    </div>
  );
}

export function FileUploader({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) {
  const handleFileUpload = (files: File[]) => {
    onChange?.(files);
    console.log(files);
  };

  return (
    <div className="border border-dashed bg-background border-border rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
