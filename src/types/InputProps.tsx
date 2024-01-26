export interface InputProps {
    labelText: string,
    handleChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<number>>) => void,
      stateType: React.Dispatch<React.SetStateAction<number>>,
      dataTestId: string,
      valueType?: string,
      id: string
  }
  