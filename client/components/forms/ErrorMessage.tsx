type Props = {
  error: any;
  visible: any;
};

const ErrorMessage = ({ error, visible }: Props) => {
  return <div className="text-bc-danger text-sm">{error}</div>;
};

export default ErrorMessage;
