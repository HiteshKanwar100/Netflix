"use client"; // This is a client component
import axios from "axios";
import { useCallback, useState } from "react";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [variant, setVariant] = useState("login");
  const [showError, setShowError] = useState(false);
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
      setShowError(false);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <>
      <div className="relative h-full w-full bg-[url('/Images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover overflow-hidden ">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <img src="/Images/logo.png" alt="Logo" className="h-12"></img>
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-12 py-9 self-center  lg:w-2/5 lg:max-w-md rounded-md w-full">
              <div className="text-white text-4xl mb-8 font-semibold">
                <h2>{variant === "login" ? "Sign In" : "Create an Account"}</h2>
              </div>
              <div className="flex flex-col gap-4">
                {showError && (
                  <p className="text-red-700">
                    Email or Password Wrong.{" "}
                    <strong className="text-white font-thin">
                      Please Try Again
                    </strong>
                  </p>
                )}
                {variant === "register" && (
                  <Input
                    id="name"
                    value={name}
                    label="Username"
                    onChange={(ev: any) => {
                      setName(ev.target.value);
                    }}
                  ></Input>
                )}
                <Input
                  type="email"
                  id="email"
                  value={email}
                  label="Email"
                  onChange={(ev: any) => {
                    setEmail(ev.target.value);
                  }}
                ></Input>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  label="Password"
                  onChange={(ev: any) => {
                    setPassword(ev.target.value);
                  }}
                ></Input>
              </div>
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 rounded-md text-white w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Log In" : "Sign Up"}
              </button>
              <div className="flex flex-row items-center justify-center mt-8 gap-4">
                <div
                  onClick={() => {
                    signIn("google", { callbackUrl: "/profiles" });
                  }}
                  className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                            "
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() => {
                    signIn("github", { callbackUrl: "/profiles" });
                  }}
                  className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                            "
                >
                  <FaGithub size={30} />
                </div>
              </div>
              <p onClick={toggleVariant} className="text-neutral-500 mt-5">
                {variant === "login"
                  ? "First time using Netflix?"
                  : "Already have an Account?"}
                <span className="text-white ml-1 hover:underline cursor-pointer">
                  {variant === "login" ? "Create an Account" : " Log In"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;
