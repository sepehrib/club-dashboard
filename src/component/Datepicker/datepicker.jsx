import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const DatePickerPersian = ({ value, onchange, title, name }) => {
  //   const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  //     arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
  //     fixNumbers = (str) => {
  //       if (typeof str === 'string') {
  //         for (var i = 0; i < 10; i++) {
  //           str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
  //         }
  //       }
  //       return str;
  //     };

  return (
    <div className=" h-full relative  flex flex-col">
      <p className="font-IRANYekanX font-normal text-sm   rounded-md  text-gray-700 mr-3 w-fit z-10">
        {title}
      </p>

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={value}
        onChange={(date) => {
          onchange(new Date(date).toISOString(), name);
        }}
        name={name}
        render={
          <input className="w-full h-[48px] border-2 border-dominant-200 rounded-lg  flex text-center" />
        }
      />
    </div>
  );
};

export default DatePickerPersian;
