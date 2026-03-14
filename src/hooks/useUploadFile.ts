import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import DocumentPicker from "react-native-document-picker";
import { useAuth } from "../context/auth.context";

export function useUpload() {
  const { user } = useAuth();
  const [file, setFile] = useState({});
  const [blob, setBlob] = useState({});

  const getFile = async () => {
    const result = await DocumentPicker.pickSingle({
      allowMultiSelection: false,
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    });

    const response = await fetch(result.uri);
    const blob = await response.blob();

    setFile(response?._bodyInit?._data);
    setBlob(blob);
  };

  const uploadFile = async ({ transactionId, file, blob }) => {
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
  };

  return { uploadFile, getFile, file, blob };
}
