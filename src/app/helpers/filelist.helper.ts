/**
  * @param files Array of files to add to the FileList
  * @returns FileList
  */
export function fileListItems(files: File[]): FileList {
  const b = new ClipboardEvent('').clipboardData || new DataTransfer();
  for (let i = 0, len = files.length; i < len; i++) b.items.add(files[i]);
  return b.files;
}
