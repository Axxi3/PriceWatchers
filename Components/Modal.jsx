'use client'

import { addUserEmailToProduct } from '@/lib/actions';
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import React, { Fragment, useState } from 'react'

export default function Modal(props) { 
    let [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setisSubmitting] = useState(false)
    const [email, setemail] = useState("") 
    const HandleSubmit=async (e)=>{ 
        e.preventDefault();
        setisSubmitting(true)

        await addUserEmailToProduct(props.id,email)



        setisSubmitting(false)
        setemail("") 
        alert("Email added successfully,please check the confirmation message or spam folder!!!")
        closeModal()
    }  
    const handleInputChange = (event) => {
        setemail(event.target.value);
      };
const openModal=()=> setIsOpen(true)
const closeModal=()=> setIsOpen(false)
  return (
    <>
    <button type='button' className='btn mt-8' onClick={openModal}>
        Track
    </button> 
  <Transition appear show={isOpen} as={Fragment}>
  <Dialog as='div' open={isOpen} onClose={closeModal} className="dialog-container bg-white-200">
     <div className="min-h-screen px-4 text-center ">
        <Transition.Child as={Fragment} enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-out duration-300' 
        leaveFrom='opacity-100' 
        leaveTo='opacity-0'>  
        
            <Dialog.Overlay className="fixed inset-0"/>
        </Transition.Child> 

        <Transition.Child 
        as={Fragment} enter='ease-out duration-300' 
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-0 scale-100'
        leave='ease-in duration-200' 
        leaveFrom='opacity-0 scale-100' 
        leaveto="opacity-0 scale-95">
                <div className="dialog-content">
                   <div className="flex flex-col gap-7">
                    <div className="Top-Sec flex justify-between items-center">  
                    <div className="logo border-[0.4px] rounded-[18px] border-black p-2">
                    <Image src={"/assets/icons/logo.svg"} alt='tag' width={30} height={30} className='object-contain'></Image>
                    </div>
                    <div className="close hover:cursor-pointer"onClick={closeModal}>
                    <Image src={"/assets/icons/x-close.svg"} alt='tag' width={30} height={30} className='object-contain'></Image>
                    </div>
                    </div>
                    <div className="modal-body flex flex-col gap-3">
                        <p className='text-[20px] font-semibold'>Stay updated with product pricing alerts right in your inbox!</p>
                        <p className='text-[16px]'>Never miss a bargain again with our timely alerts!</p>
                    </div> 
                    <form action="" onSubmit={HandleSubmit} className='w-[100%]'>
                        <label htmlFor="email">Email address</label>  
                        <div className="dialog-input_container">
                        <Image 
                      src="/assets/icons/mail.svg"
                      alt='mail'
                      width={18}
                      height={18}
                    /> 
                    <input  name='email'   type="email"
                      id="email" value={email} onChange={handleInputChange} className=' w-[100%] emailTyper h-[30px] rounded-[30px] active:border-none active:border-[0px]' placeholder='Enter your email address'/>
                        </div>
                        <button type="submit"
                    className="dialog-btn w-[100%]"
                  >{isSubmitting?"Submitting...." :"Track this product for me"}</button>
                    </form>
                   </div>
                </div>
        </Transition.Child>
     </div>
    </Dialog>
  </Transition>
    </>
  )
}
