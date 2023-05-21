import { getSession } from "next-auth/react";
import Link from 'next/link';
import Image from "next/image";

import FormSignin from "/components/FormPageSignin/FormSignin";

export default function FormPageSignin({ redirect, from }) {
  return (
    <>
      <div className="min-h-screen flex flex-col -mt-14 items-center justify-center">
        <div className="relative h-14 w-[278px] cursor-pointer">
            <Link href='/'>
<a> <Image src="/logo.png" layout="fill" objectFit="cover" /> </a>
</Link>
          
        </div>
        {/* Content Section */}
        <div className="py-6 px-4 pt-4 mb-14 sm:px-6 lg:px-8 flex justify-center">
          <div className="max-w-md w-full space-y-8">
            <div className="flex flex-col items-center">
              <h2 className="mt-6 mb-10 text-center text-3xl font-bold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <FormSignin redirect={redirect} />
          </div>
        </div>
      </div>
    </>
  );
}


