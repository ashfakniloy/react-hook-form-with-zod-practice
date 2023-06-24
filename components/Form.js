import { FormProvider } from "react-hook-form";

function Form({ hookForm, onSubmit, className, children }) {
  return (
    <FormProvider {...hookForm}>
      <form onSubmit={onSubmit} className={className} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
