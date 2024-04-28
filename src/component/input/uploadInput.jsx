/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import upload from 'asset/image/icon/upload/attach-square.png';
import axios from 'axios';
import { getFromLocalStorage } from 'component/storage/localStorage';

function FileUploadPage({ setFileAddres, setid, id, count }) {
  const [selectedfile, setSelectedfile] = useState();

  const token = JSON.parse(getFromLocalStorage('token'));
  const inputRef = useRef();
  useEffect(() => {
    selectedfile && Submithandler();
  }, [selectedfile]);

  useEffect(() => {
    setSelectedfile();
  }, [count]);

  const onchangehandler = (event) => {
    setSelectedfile(event.target.files[0]);
    setid && setid(Number(event.target.className));
  };

  const Submithandler = async () => {
    const formData = new FormData();
    formData.append('File', selectedfile);
    const res = await axios.post('http://192.168.0.29:7181/Blob/Upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    setFileAddres(res?.data?.data?.path);
  };

  return (
    <div onClick={() => inputRef.current.click()}>
      {' '}
      <form
        onSubmit={Submithandler}
        className="w-full border border-dominant-200 flex p-3 rounded-md cursor-pointer justify-between">
        <input
          type="file"
          name="file"
          onChange={(event) => onchangehandler(event)}
          ref={inputRef}
          hidden
          className={count && count}
        />
        {/* <input type="hidden" name="token" value={token} /> */}
        <p className="pr-5">
          {selectedfile ? selectedfile?.name : ' فرمتهای قابل پشتیبانی (PDF،PNG, JPEG)'}
        </p>
        <div>
          <button className="flex align-baseline" type="submit">
            <img src={upload} className="w-fit h-fit" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default FileUploadPage;
