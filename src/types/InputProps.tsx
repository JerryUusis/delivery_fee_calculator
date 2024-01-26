export interface InputProps {
    labelText: string,
    handleChange: (
      inputType: string,
      event: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<number>>) => void,
      stateType: React.Dispatch<React.SetStateAction<number>>,
      dataTestId: string
      valueType?: string
  }
  