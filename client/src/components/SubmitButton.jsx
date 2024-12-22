function SubmitButton(props) {
  return (
    <div className="mb-10px">
      <input
        type="submit"
        value={props.value}
        className="w-[230px] md:w-[300px]
        bg-[#50f] hover:bg-[#229] duration-500
        rounded-md text-white p-[8px] cursor-pointer"
      />
    </div>
  );
}

export default SubmitButton;
