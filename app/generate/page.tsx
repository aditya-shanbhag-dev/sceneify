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

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBookmark,
  IconDownload,
  IconBrandX,
  IconClipboard,
} from "@tabler/icons-react";

const links = [
  {
    id: "download",
    title: "Download",
    icon: (
      <IconDownload className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    id: "copy",
    title: "Copy to Clipboard",
    icon: (
      <IconClipboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    id: "share",
    title: "Share it on X",
    icon: (
      <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    id: "fav",
    title: "Add to Favourites",
    icon: (
      <IconBookmark className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  }
];

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

export default function Home() {
  const [advanced, setAdvanced] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [subtitle, setSubtitle] = useState("");
  const handleFileUpload = (files: File[]) => {
    setFiles?.(files);
    console.log(files);
  };
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

    const form = new FormData();

    form.append("image", files[0]);

    if (advanced) {
      const sub = subtitle.trim();
      const data: any = { colour, font };
      if (sub.length > 0) data.subtitle = sub;
      form.append("additionalParams", JSON.stringify(data));
    }
    if (!advanced || !subtitle) {
      setLoading(true);
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || "server returned " + res.status);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id: string) {
    if (!resultUrl) return;

    switch (id) {
      case "download": {
        if (!resultUrl) return;
        const baseName = !files[0] ? 'image' : files[0].name.replace(/\.[^/.]+$/, "");
        const downloadName = "st_" + baseName + ".jpg";

        const a = document.createElement("a");
        a.href = resultUrl;
        a.download = downloadName;
        a.click();
        break;
      }

      case "copy": {
        if (!resultUrl) return;
        const blob = await fetch(resultUrl).then(r => r.blob());

        // convert to PNG so clipboard accepts it
        const bmp = await createImageBitmap(blob);
        const canvas = document.createElement("canvas");
        canvas.width = bmp.width;
        canvas.height = bmp.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(bmp, 0, 0);

        const pngBlob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((b) => {
            if (!b) {
              reject(new Error("failed to generate blob"));
              return;
            }
            resolve(b);
          }, "image/png");
        });

        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": pngBlob
            })
          ]);
          toast.success("Copied to clipboard!");
        } catch (err) {
          console.error(err);
          toast.error("Clipboard image not supported in this browser");
        }
        break;
      }

      case "share": {
        toast.info("This feature is not available at the moment");
        break;
      }

      case "fav": {
        toast.info("This feature is not available at the moment");
        break;
      }
    }
  }

  return (
    <div className="flex justify-center relative items-start m-5 rounded-2xl border border-border bg-card shadow-sm gap-2 z-100">
      {loading && (
        <div className="absolute inset-0 z-500 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Loader
            loading={loading}
            duration={4000}
            loadingStates={loadingStates}
          />
        </div>
      )}
      <div className="flex flex-col max-w-3xl gap-2 items-center justify-center border border-border bg-background overflow-hidden p-2 rounded-lg">
        <div className="border border-dashed bg-background border-border rounded-lg">
          <FileUpload onChange={handleFileUpload} />
        </div>
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
      <div className="m-4 flex-1 bg-card flex flex-col items-center justify-center rounded-lg gap-2">
        {resultUrl && (
          <>
            <div className="rounded-lg flex items-center justify-center overflow-hidden max-h-[625px]">
              <img src={resultUrl} className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center justify-end h-15 w-full pt-5">
              <FloatingDock items={links} onSelect={handleAction} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}