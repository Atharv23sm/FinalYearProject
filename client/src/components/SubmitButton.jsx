export default function SubmitButton(props) {
  return (
    <div className="mb-10px">
      <input
        type="submit"
        value={props.value}
        className="w-full px-10 bg-[#50f] hover:bg-[#229] duration-500 rounded-md text-white p-[8px] cursor-pointer"
      />
    </div>
  );
}
