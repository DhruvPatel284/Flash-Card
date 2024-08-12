"use client"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

const Publish = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [adminId , setAdminId] = useState('');
    const navigate = useRouter();


    useEffect(() => {
        const checkUser = async () => {
          try {
            const response = await axios.get('/api/Admin/getAdmin/');
            if (response.status === 200) {
                setAdminId(response.data.user.userId);
            }
          } catch (error) {
            console.error(error);
          }
        };
        checkUser();
      }, []);

    return <div className="bg-black min-h-[800px]">
        <Navbar />
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setQuestion(e.target.value)
                }} type="text" className="w-full bg-black border border-gray-300 text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Question" />

                <TextEditor onChange={(e) => {
                    setAnswer(e.target.value)
                }} />
                <button onClick={async () => {
                    
                    const response = await axios.post(`/api/FlashCard/addFlashcard`, {
                        question,
                        answer,
                        adminId
                    },);
                    navigate.push(`/dashboard`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
        <div className=" bg-black"></div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-purple-400 bg-black border-0 pl-2" placeholder="Write answer.." required />
            </div>
        </div>
       </div>
    </div>
    
}
export default Publish;