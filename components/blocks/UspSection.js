import { baseURL } from "@/utils/db-queries/getData";

export default function UspSection({ data }) {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img src={baseURL + data.media.data.attributes.url} alt="" className=" filter grayscale blur-md absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <p className="text-base font-semibold leading-8 text-primary-300">{data.subtitle}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{data.title}</h2>
          <p className="mt-6 text-lg leading-8 text-white">{data.content}</p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {data.uspList.map((usp) => (
            <div key={usp.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
              <dt className="text-sm leading-6">{usp.description}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight">
                {usp.prefix}
                {usp.usp}
                {usp.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
