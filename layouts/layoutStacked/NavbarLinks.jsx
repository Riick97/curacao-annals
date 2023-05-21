import { useSession, signIn, signOut } from "next-auth/react";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarLinks({ navigation }) {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img className="h-8 w-40 rounded" src="/logo.png" alt="Your Company" />
      </div>
      {/* Navigation Links */}
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "px-3 py-2 rounded-md text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
