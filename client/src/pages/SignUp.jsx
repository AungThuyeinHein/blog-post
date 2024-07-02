/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* {Left side} */}
        <div className="flex-1">
          <Link to={"/"} className="font-bold dark:text-white text-4xl">
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              B@C's{" "}
            </span>
            <span>Blog</span>
          </Link>
          <div className="text-sm mt-5 ">
            This is a blog for Node.js Developer.So you can read and discuss
            about!!!
          </div>
        </div>
        {/* {Right side} */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your Username." />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
              <Label value="Your Email." />
              <TextInput type="email" placeholder=" Email" id="email" />
            </div>
            <div className="">
              <Label value="Your Password." />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an Account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}