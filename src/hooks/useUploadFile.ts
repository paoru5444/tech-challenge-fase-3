import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import { useAuth } from "../context/auth.context";
import { File } from "../screens/transactions/models";

interface FechFileResponse {
  _bodyInit?: {
    _data?: File;
  };
  blob(): Promise<Blob>;
}

export function useUpload() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [blob, setBlob] = useState({});

  const getFile = async () => {
    try {
      const result: DocumentPickerResponse = await DocumentPicker.pickSingle({
        allowMultiSelection: false,
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });

      const response = (await fetch(result.uri)) as FechFileResponse;

      const blob: Blob = await response.blob();

      setFile(response?._bodyInit?._data);
      setBlob(blob);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  interface UploadFileProps {
    transactionId: string;
    file: File;
    blob: Blob;
  }

  const uploadFile = async ({ transactionId, file, blob }: UploadFileProps) => {
    try {
      if (!transactionId) {
        throw new Error("TransactionId é inválido");
      }
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `users/${user?.uid}/transactions/${transactionId}/${file.name}`,
      );
      await uploadBytes(storageRef, blob, { contentType: file?.type });

      const url = await getDownloadURL(storageRef);

      return {
        url,
      };
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return { uploadFile, getFile, file, blob };
}
