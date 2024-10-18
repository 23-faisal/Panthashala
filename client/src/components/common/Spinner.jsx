import spinner from "../../assets/svg/spinner.svg";

const Spinner = () => {
  return (
    <div className=" flex items-center justify-center h-full ">
      <img className="w-64 h-64" src={spinner} alt="spinner" />
    </div>
  );
};

export default Spinner;
