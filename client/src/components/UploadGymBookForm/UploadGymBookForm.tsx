import { useRef, useState } from "react";
import { API_URL } from "../../constant";

type UploadCsvFormProps = {
  onSubmit?: () => void;
};

export const UploadCsvForm = ({ onSubmit }: UploadCsvFormProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>();

  const handleResetFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setFile(null);
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileOrNull = event.target.files && event.target.files[0];
    setFile(fileOrNull);
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    if (!file) return;

    const fileContent: BlobPart = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          return resolve(reader.result);
        }
      };
      reader.readAsText(file, "UTF-8");
      reader.onerror = reject;
    });
    const utf8Blob = new Blob([fileContent], { type: "text/csv;charset=UTF-8" });

    const formData = new FormData();
    formData.append("file", utf8Blob, file.name);

    const options = {
      method: "POST",
      body: formData,
    };

    fetch(API_URL.UPLOAD_GYMBOOK_LOG, options).then((response) => {
      if (response.ok) {
        if (onSubmit) {
          onSubmit();
        }

        handleResetFile();
      } else {
        throw new Error(`Failed to upload file:, ${response.statusText}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" ref={inputFileRef} onChange={handleFileChange} onReset={handleResetFile} />
      <button type="reset">Annuler</button>
      <button type="submit">Upload CSV</button>
    </form>
  );
};
