export interface NumberInputProps {
    labelText: string,
    handleNumberInput: (
      event: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<number>>) => void,
      stateType: React.Dispatch<React.SetStateAction<number>>,
      dataTestId: string,
      valueType?: string,
      id: string
  }
  