import { FC } from 'react';
// interface ModalProps{
//   header:string
//   visible:bool
//   content:string

// }

const ModalFrame=()=> {

    // const { visible, onClose, header, children } = this.props;
    return <div >
        <div className="content">
          <div className="header">
            我是标题
            <button >Close</button>
          </div>
          <div className="content">我是内容</div>
        </div>
      </div>
  }


export default ModalFrame

// import React from 'react'

// const ModalFrame=()=>{
//   return <div>
//     <div className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center h-screen bg-center bg-no-repeat bg-cover outline-none min-w-screen animated fadeIn faster focus:outline-none"  style="background-image: url(https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1582&q=80);" id="modal-id">
//    	<div className="absolute inset-0 z-0 bg-black opacity-80"></div>
//     <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white shadow-lg rounded-xl ">

//       <div className="">

//         <div className="justify-center flex-auto p-5 text-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="flex items-center w-4 h-4 mx-auto -m-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="flex items-center w-16 h-16 mx-auto text-red-500" viewBox="0 0 20 20" fill="currentColor">
//   <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
// </svg>
//                         <h2 className="py-4 text-xl font-bold ">Are you sure?</h2>
//                         <p className="px-8 text-sm text-gray-500">Do you really want to delete your account?
//                 This process cannot be undone</p>    
//         </div>
       
//         <div className="p-3 mt-2 space-x-4 text-center md:block">
//             <button className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100">
//                 Cancel
//             </button>
//             <button className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-red-500 border border-red-500 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-red-600">Delete</button>
//         </div>
//       </div>
//     </div>
//   </div>
//   </div>
// }
// export default ModalFrame