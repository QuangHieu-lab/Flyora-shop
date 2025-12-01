import React, { useState, useEffect } from "react";
// // import {
// //   FaPhoneAlt,
// //   FaEnvelope,
// //   FaFacebookMessenger,
// //   FaTimes,
// // } from "react-icons/fa";

function FloatingContact() {
    //   //   const [open, setOpen] = useState(false);
    //   //   return (
    //   //     <div className="fixed bottom-6 right-6 z-50">
    //   //       {open && (
    //   //         <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4 w-[260px] relative">
    //   //           <button
    //   //             onClick={() => setOpen(false)}
    //   //             className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
    //   //           >
    //   //             <FaTimes size={18} />
    //   //           </button>
    //   //           <ul className="p-4 space-y-3">
    //   //             <li className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600">
    //   //               <FaPhoneAlt className="text-orange-500" />
    //   //               <a href="tel:033678915">Gọi ngay cho chúng tôi</a>
    //   //             </li>
    //   //             <li className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600">
    //   //               <FaFacebookMessenger className="text-blue-500" />
    //   //               <a
    //   //                 href="https://m.me/yourpageid"
    //   //                 target="_blank"
    //   //                 rel="noopener noreferrer"
    //   //               >
    //   //                 Chat qua Messenger
    //   //               </a>
    //   //             </li>
    //   //             <li className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-500">
    //   //               <FaEnvelope className="text-teal-400" />
    //   //               <a href="mailto:youremail@example.com">
    //   //                 Liên hệ chúng tôi qua email
    //   //               </a>
    //   //             </li>
    //   //           </ul>
    //   //         </div>
    //   //       )}
    //   //       {!open && (
    //   //         <button
    //   //           onClick={() => setOpen(true)}
    //   //           className={`w-[70px] h-[70px] flex items-center justify-center rounded-full border-4 border-white bg-black shadow-2xl transition-transform duration-200 ${
    //   //             open ? "scale-90" : "scale-100"
    //   //           }`}
    //   //         >
    //   //           <FaFacebookMessenger size={28} className="text-white" />
    //   //         </button>
    //   //       )}
    //   //     </div>
    //   //   );

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/chatbot";
        script.setAttribute("chatbot_id", "687f4a3ced905abd4d1fa39e");
        script.setAttribute("data-type", "default");
        script.async = true;
        document.body.appendChild(script);

        //     // Cleanup nếu component bị unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    //   return null;
}

export default FloatingContact;
