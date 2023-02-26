import { baseURL } from "@/utils/db-queries/getData";

export default function LogoGrid({ data }) {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">{data.title}</h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {data.media.data.map((tmp) => (
            <img loading="lazy" key={tmp.id} className="filter grayscale hover:grayscale-0 col-span-2 max-h-12 w-full object-contain lg:col-span-1" src={baseURL + tmp.attributes.url} alt={tmp.attributes.alternativeText} width={158} height={48} />
          ))}
        </div>
      </div>
    </div>
  );
}
