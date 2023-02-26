import { baseURL } from "@/utils/db-queries/getData";
import BigText from "@/components/gsap/BigText";

export default function FeaturesSection({ data }) {
  return (
    <>
      <BigText>Modernstes Techstack trifft Design</BigText>

      <div className="overflow-hidden sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <p className="text-lg font-semibold leading-8 tracking-tight text-primary">{data.subtitle}</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.title}</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">{data.content}</p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {data.featuresList.map((feature) => (
                    <div key={feature.id} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <i className={`absolute top-1 left-1 text-lg text-primary-300 ${feature.iconClass}`} aria-hidden="true" />
                        {feature.title}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img src={baseURL + data.media.data.attributes.url} alt="Product screenshot" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width={2432} height={1442} />
          </div>
        </div>
      </div>
    </>
  );
}
