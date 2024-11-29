import {useFormStatus} from 'react-dom';

export default function SubmitButton({children, className=''}) {
  const {pending} = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={"bg-gray-800 disabled:bg-black text-white disabled:text-gray-200 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center hover:bg-gray-800 rounded-md" + className}
    >
      {pending && (
        <span>Saving...</span>
      )}
      {!pending && children}
    </button>
  );
}
