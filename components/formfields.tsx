import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { Wand } from "lucide-react";

export function FieldSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="w-full max-w-md mb-5">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="adv-option">Customize Subtitle</FieldLabel>
          <FieldDescription>
            Enable advanced options for more customization. Manually add
            subtitles, adjust styles, and fine-tune the output to match your
            vision. (More options coming soon!)
          </FieldDescription>
        </FieldContent>
        <Switch id="adv-option" checked={checked} onCheckedChange={onChange} />
      </Field>
    </div>
  );
}

export function FieldTextarea({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
            <Textarea
              id="subtitle"
              placeholder="Enter your own subtitle..."
              rows={4}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}

export function FieldSelect({
  font,
  setFont,
  colour,
  setColour,
}: {
  font: "HelveticaItalic" | "Arial";
  setFont: (v: "HelveticaItalic" | "Arial") => void;
  colour: "yellow" | "white";
  setColour: (v: "yellow" | "white") => void;
}) {
  return (
    <div className="w-full max-w-md flex gap-2 mb-4">
      <Field>
        <FieldLabel>Font Style</FieldLabel>
        <Select value={font} onValueChange={(v) => setFont(v as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HelveticaItalic">
              Helvetica Neue Medium Italic
            </SelectItem>
            <SelectItem value="Arial">Arial Bold Normal</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel>Colour</FieldLabel>
        <Select value={colour} onValueChange={(v) => setColour(v as any)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yellow">Yellow</SelectItem>
            <SelectItem value="white">White</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}

export function FieldButton() {
  return (
    <Field orientation="horizontal">
      <Button type="submit" className="hover:scale-110 cursor-pointer">
        Generate <Wand />
      </Button>
    </Field>
  );
}
