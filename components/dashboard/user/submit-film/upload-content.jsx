import {
  DropzoneContent,
  Dropzone,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { Label } from "@/components/ui/label";

export default function UploadContent({
  label,
  title,
  content,
  setContent,
  maxSize,
  accept = { "video/*": [] },
  required = false,
}) {
  const handleDrop = (file) => {
    console.log(file);
    setContent(file);
  };

  return (
    <div>
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Dropzone
        accept={accept}
        maxSize={1024 * 1024 * maxSize}
        onDrop={handleDrop}
        onError={console.error}
        src={content}
        className=""
      >
        <DropzoneEmptyState title={title} />
        <DropzoneContent />
      </Dropzone>
    </div>
  );
}
