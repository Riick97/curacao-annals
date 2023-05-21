import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarMobile({ userNavigation, user, navigation }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  return (
    <Disclosure.Panel className="border-b border-gray-700 md:hidden">
      <div className="space-y-1 px-2 py-3 sm:px-3">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block px-3 py-2 rounded-md text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-700 pt-4 pb-3">
        <div className="mt-3 space-y-1 px-2">
          {session?.user && <Disclosure.Button
            onClick={async () => {
              await signOut({
                redirect: false,
              });
              router.push("/formPageSignin");
            }}
            as="a"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Sign Out
          </Disclosure.Button>}
          {!session?.user && <Disclosure.Button
            onClick={async () => {
              router.push("/formPageSignin");
            }}
            as="a"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Sign In
          </Disclosure.Button>}
        </div>
      </div>
    </Disclosure.Panel>
  );
}
