const Input = ({ value, setvalue, label, placeholder, type, width, ...rest }) => {
  return (
    <>
      {' '}
      <div className="relative" style={{ direction: 'rtl' }}>
        <div className="text-border relative z-10 " style={{ direction: 'rtl' }}>
          <label
            className="text-label font-normal  bg-light text-dominant-500 px-2"
            style={{ direction: 'rtl' }}>
            {label}
          </label>
        </div>
        <input
          autoComplete="off"
          className={`${
            width ? width : 'w-full'
          } h-[48px] rounded border-2 border-dominant-200 bg-gray-100 px-4 text-6 text-dominant direction-ltr text-right focus:outline-none  focus:ring focus:ring-accent`}
          placeholder={placeholder ? placeholder : ''}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          type={type}
          {...rest}
        />
      </div>
    </>
  );
};

export default Input;
