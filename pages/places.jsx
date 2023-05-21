import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import thumbnail from "/components/Christoffleberg.jpeg";

const people = [
  {
    name: "Christoffel National Park",
    title:
      " If you enjoy nature and outdoor activities, visit Christoffel National Park. It's the largest national park on the island and offers hiking trails, wildlife spotting opportunities, and stunning views from the top of Mount Christoffel.",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Shete Boka National Park",
    title:
      " Another natural gem in Curacao, Shete Boka National Park is known for its rugged coastline and dramatic wave action. Explore the park's trails, caves, blowholes, and tidal pools, and witness the power of the sea.",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

export default function Example() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {people.map((person) => (
        <li
          key={person.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <div className="relative mr-5 mx-auto h-32 w-32 flex-shrink-0 rounded-full">
              <Image
                className={"text-white "}
                src={thumbnail}
                layout="fill"
                objectFit="cover"
                objectPosition={"50% 57%"}
                alt=""
              />
            </div>
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {person.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{person.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Outdoors
                </span>
              </dd>
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}
