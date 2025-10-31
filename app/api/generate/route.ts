import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createCanvas, loadImage, registerFont } from "canvas";
import { describeImage, generateSubtitle, } from "@/lib/utils";
import path from "path";

// ========== ZOD SCHEMA ==========
const GeneratePayloadSchema = z.object({
    image: z.any().refine((val) => val instanceof Blob, {
        message: "Image must be a Blob/File",
    }),
    additionalParams: z
        .object({
            subtitle: z.string().optional(),
            colour: z.enum(["yellow", "white"]).default("yellow"),
            font: z
                .enum(["HelveticaItalic", "Arial"])
                .default("HelveticaItalic"),
        })
        .optional(),
});

type GeneratePayload = z.infer<typeof GeneratePayloadSchema>;

// Draw subtitle text on the image buffer
async function addSubtitleToImage(
    imageBuffer: Buffer,
    subtitle: string | undefined,
    colour: "yellow" | "white",
    font: "HelveticaItalic" | "Arial"
): Promise<Buffer> {

    registerFont(path.join(process.cwd(),'/fonts/HelveticaNeue-MediumItalic.ttf'), { family: 'Helvetica Neue' });

    const img = await loadImage(imageBuffer);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    // Style setup
    const fontSize = Math.floor(img.height * 0.035);
    const colorMap = {
        yellow: "#FFE678",
        white: "#FFFFFF",
    };

    const fontFamily =
        font === "HelveticaItalic"
            ? "Helvetica Neue, Helvetica, Arial, sans-serif"
            : "Arial, sans-serif";

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = colorMap[colour];
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = 6;

    // Auto-wrap
    const maxWidth = img.width * 0.7;
    const words = subtitle?.split(" ") || [];
    const lines: string[] = [];
    let line = "";

    for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        const width = ctx.measureText(testLine).width;
        if (width < maxWidth) line = testLine;
        else {
            lines.push(line);
            line = word;
        }
    }
    if (line) lines.push(line);

    const totalHeight = lines.length * (fontSize + 10);
    let y = img.height - totalHeight - img.height * 0.05;

    for (const l of lines) {
        ctx.fillText(l, img.width / 2, y);
        y += fontSize + 10;
    }

    return canvas.toBuffer("image/jpeg");
}

// ========== MAIN ROUTE ==========
export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const formData = await req.formData();
        const rawPayload: Record<string, any> = {};

        formData.forEach((value, key) => {
            try {
                rawPayload[key] = JSON.parse(value as string); // try to parse JSON
            } catch {
                rawPayload[key] = value;
            }
        });

        const parsed = GeneratePayloadSchema.safeParse(rawPayload);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid payload", details: z.treeifyError(parsed.error) },
                { status: 400 }
            );
        }

        const { image, additionalParams } = parsed.data as GeneratePayload;
        const colour = additionalParams?.colour ?? "yellow";
        const font = additionalParams?.font ?? "HelveticaItalic";
        let subtitle = additionalParams?.subtitle;

        // Convert image Blob → Buffer
        const imageBuffer = Buffer.from(await image.arrayBuffer());

        // === IF USER DIDN’T PROVIDE SUBTITLE ===
        if (!subtitle) {
            console.log("No subtitle provided — generating automatically...");

            // --- Step 1: Pollinations - Analyze image
            const pollinationsData = await describeImage(imageBuffer);
            const description = pollinationsData?.choices?.[0]?.message?.content;
            if (!description) throw new Error("Pollinations failed to describe the image.");
            console.log("Pollinations Done.....");

            // --- Step 2: Gemini - Generate subtitle line
            const geminiData = await generateSubtitle(description);
            subtitle = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "The silence says everything.";
            console.log("Gemini Done.....");

        }

        // === STEP 3: Draw subtitle ===
        const finalBuffer = await addSubtitleToImage(imageBuffer, subtitle, colour, font);

        // Convert to pure ArrayBuffer
        const arrayBuffer = Uint8Array.from(finalBuffer).buffer;

        // STEP 4: Return
        return new NextResponse(arrayBuffer, {
            headers: { "Content-Type": "image/jpeg" },
        });

    } catch (err: any) {
        console.error("Error in /generate:", err);

        if (err.name === "FetchError" || err.message.includes("timeout")) {
            return NextResponse.json(
                { error: "The image request timed out. Please try again." },
                { status: 504 }
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error", details: err.message },
            { status: 500 }
        );
    }
}
