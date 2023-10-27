import { Box, Button, Flex } from "@mantine/core";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";
import _ from "lodash";
import { useEffect } from "react";
import { FaEraser, FaEye, FaRedo, FaUndo } from "react-icons/fa";
import Signature, { PointGroup } from "signature_pad";

type Props = {
  savedSignature: string;
  setSavedSignature: (signature: string) => void;
  signaturePad: Signature | null;
  setSignaturePad: (signaturePad: Signature) => void;
  setSignIsEmpty: (isEmpty: boolean) => void;
  signIsEmpty: boolean;
};

export default function DigitalSignature({
  setSavedSignature,
  signaturePad,
  setSignaturePad,
  setSignIsEmpty,
  signIsEmpty,
}: Props) {
  // const [savedSignature, setSavedSignature] = useState<string>("");
  const signatureRedoArray: PointGroup[] = [];


  const readyPad = () => {
    const wrapper = document.getElementById("signature-pad");
    const canvas = wrapper?.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      canvas.getContext("2d")?.scale(1, 1);
      const tempSignaturePad = new Signature(canvas, {
        backgroundColor: "rgb(255, 255, 255)",
      });
      setSignaturePad(tempSignaturePad);
    }
  };

  const handleSave = () => {
    if (signaturePad) {
      setSignIsEmpty(signaturePad.isEmpty());
      setSavedSignature(signaturePad.toDataURL());
    }
  };

  const handleUndo = () => {
    if (signaturePad) {
      const signatureData = signaturePad.toData();
      const signatureRedoData = _.cloneDeep(signatureData); // Original data

      if (signatureData.length > 0) {
        signatureData.pop(); // Remove the last dot or line
        signaturePad.fromData(signatureData);
        const signatureRemovedData =
          signatureRedoData[signatureRedoData.length - 1];
        signatureRedoArray.push(signatureRemovedData);
      }
    }
    setSignIsEmpty(signaturePad?.isEmpty() ?? true);
  };

  const handleRedo = () => {
    if (signaturePad && signatureRedoArray.length !== 0) {
      const values = signaturePad.toData();
      const lastValue = signatureRedoArray[signatureRedoArray.length - 1];
      values.push(lastValue);
      signaturePad.fromData(values);
      signatureRedoArray.pop(); // Remove the redo item from array
    }
    setSignIsEmpty(signaturePad?.isEmpty() ?? true);
  };

  const handleClear = () => {
    if (signaturePad) {
      signaturePad.clear();
      setSavedSignature("");
    }
    setSignIsEmpty(signaturePad?.isEmpty() ?? true);
  };

  useEffect(() => {
    readyPad();
  }, []);

  return (
    <Box mt={"md"}>
      {signIsEmpty ? (<IconExclamationCircle size={60} color="red" />) : (<IconCheck size={60} color="blue" />)}
      <div id="signature-pad">
        <canvas className="signature-canvas" width="515" height="200"></canvas>
        <Flex gap={5} mt={"sm"}>
          <Button
            leftSection={<FaEye />}
            variant="outline"
            color={"blue"}
            onClick={handleSave}
          >
            Save Signature
          </Button>
          <Button
            leftSection={<FaUndo />}
            variant="outline"
            color={"yellow"}
            onClick={handleUndo}
          >
            Undo
          </Button>
          <Button
            leftSection={<FaRedo />}
            variant="outline"
            color={"grape"}
            onClick={handleRedo}
          >
            Redo
          </Button>
          <Button
            leftSection={<FaEraser />}
            variant="outline"
            color={"teal"}
            onClick={handleClear}
          >
            Clear
          </Button>
        </Flex>
      </div>
    </Box>
  );
}
