"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


interface AuthProps {
  type: "signup" | "signin";
}

export const Auth = ({ type }: AuthProps) => {
  const navigate = useRouter();
  const [postInputs, setPostInputs] = useState({
    email: "",
    password: "",  
  });

  async function sendRequest() {
    try {
      const endpoint = type === "signup" ? "signup" : "signin";
      const response = await axios.post(`/api/Admin/${endpoint}`, postInputs);

      const { token, message } = response.data;

      if (response.status === 200) {
        navigate.push("/");
      } else {
        alert(message || "Authentication failed");
      }
    } catch (e) {
      console.log(e);
      alert("An error occurred while signing in");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              {type === "signup" ? "Create an account" : "Sign in"}
            </div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link className="pl-2 underline" href={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            <LabelledInput
              label="Email"
              placeholder="example@admin.com"
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                })
              }
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="admin"
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                })
              }
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-sm text-slate-500 mt-4">
                To log in as an admin, use <strong>email: yourname@admin.com</strong> and <strong>password: admin</strong>.
        </p>
      </div>
     
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm text-black font-bold pt-2">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
