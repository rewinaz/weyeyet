import { useFormikContext } from "formik";
import TextInput from "../ui/TextInput";
import ErrorMessage from "./ErrorMessage";

type Props = {
  name: string;
  placeholder?: string;
};

const FormTextInput = ({ name, placeholder = "" }: Props) => {
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext<any>();
  return (
    <div className=" mb-4 w-full">
      <TextInput
        onInput={(e) => setFieldValue(name, e)}
        placeholder={placeholder}
        value={values[name]}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};

export default FormTextInput;
