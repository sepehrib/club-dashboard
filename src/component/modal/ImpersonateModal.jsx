/* eslint-disable no-unused-vars */
import { Dialog, Transition } from '@headlessui/react';
import Button from 'component/button/Button';
import { Fragment, useState } from 'react';
import Input from 'component/input/Input';
import { GetImpersonateTokenReq } from 'pages/User/Api/UserReq';
import { useNavigate } from 'react-router';
import getBaseUrl from 'getBaseUrl';

export default function ImpersonateModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState();

  const baseUrl = getBaseUrl();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const GetImpersonateToken = async () => {
    const res = await GetImpersonateTokenReq({ username });
    if (res?.token) {
      window.open(baseUrl + `impersonate/?token=${res?.token}`);
    }
    console.log(res?.token);
  };
  const disable = Boolean(username?.length == 10) || Boolean(username?.length == 11);

  return (
    <>
      <div className=" flex items-center pt-2">
        <Button name="ورود به صفحه کاربر " width="w-full" disable={true} func={openModal} />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-100"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="relative inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform border border-dominant-400 shadow-2xl overflow-hidden rounded-2xl border-2 border-accent rounded-md p-6 text-left align-middle rounded-lg transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex  font-medium leading-6 text-accent-300 text-start justify-between">
                    <p>کدملی مورد نظر را وارد کنید </p>
                    <p
                      className="font-extrabold text-base cursor-pointer border-2 border-accent rounded-full h-6 w-6 text-center items-center inset-0  "
                      onClick={closeModal}>
                      {' '}
                      X{' '}
                    </p>
                  </Dialog.Title>
                  <div className="mt-2 p-1">
                    <div className="flex justify-center w-full">
                      <div className="relative" style={{ direction: 'rtl' }}>
                        <div className="text-border relative z-10 " style={{ direction: 'rtl' }}>
                          <label
                            className="text-label font-normal  bg-light text-dominant-500 px-2 flex"
                            style={{ direction: 'rtl' }}>
                            نام کاربری
                          </label>
                        </div>
                        <input
                          className="h-[48px] rounded border-2 border-dominant-200 bg-gray-100 px-4 text-6 text-dominant direction-ltr text-right focus:outline-none  focus:ring focus:ring-accent"
                          value={username}
                          placeholder="نام کاربری کاربر را وارد کنید "
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      type="button"
                      name="ورود"
                      width="w-1/5"
                      disable={disable}
                      func={GetImpersonateToken}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
