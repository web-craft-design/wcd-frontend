import { baseURL } from "@/utils/db-queries/getData";
import BigText from "@/components/gsap/BigText";

export default function TeamSection({ data }) {
  return (
    <>
      <BigText position="end">Lerne uns Kennen!</BigText>

      <div className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-5">
          <div className="max-w-2xl xl:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">{data.content}</p>
          </div>
          <ul role="list" className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3">
            {data.team.data.map((person) => (
              <li key={person.attributes.name} className="flex flex-col gap-10 pt-12 sm:flex-row">
                <img className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src={baseURL + person.attributes.media.data.attributes.url} alt="" />
                <div className="max-w-xl flex-auto">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.attributes.name}</h3>
                  <p className="text-base leading-7 text-gray-600">{person.attributes.position}</p>
                  <p className="mt-6 text-base leading-7 text-gray-600">{person.attributes.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
