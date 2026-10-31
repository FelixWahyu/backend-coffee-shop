import fs from "fs";
import path from "path";

export function deleteFile(fileUrl?: string | null) {
  if (!fileUrl) return;

  // e.g., "/public/uploads/images/1721590000000-filename.jpg" -> "public/uploads/images/1721590000000-filename.jpg"
  const relativePath = fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl;
  const absolutePath = path.join(process.cwd(), relativePath);

  fs.unlink(absolutePath, (err) => {
    if (err) {
      console.error(`Failed to delete file at ${absolutePath}:`, err.message);
    } else {
      console.log(`Successfully deleted file at ${absolutePath}`);
    }
  });
}
