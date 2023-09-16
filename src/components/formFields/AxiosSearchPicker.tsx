import { Input, InputGroup } from "rsuite";

interface AxiosSearchPickerProps {
  placeholder: string;
}

const AxiosSearchPicker = ({ ...props }: AxiosSearchPickerProps) => {
  const CustomInputGroupWidthButton = ({ placeholder, ...props }: any) => (
    <InputGroup {...props} inside>
      <Input placeholder={placeholder} />
      <InputGroup.Button>
        <i className="fas fa-search"></i>
      </InputGroup.Button>
    </InputGroup>
  );
  return (
    <>
      <CustomInputGroupWidthButton placeholder={props.placeholder} />
    </>
  );
};

export { AxiosSearchPicker };
