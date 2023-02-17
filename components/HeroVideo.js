export default function HeroVideo({ data }) {
  console.log(data);

  return (
    <div className="container-fluid flex flex-col relative justify-end md:h-[90vh] items-center">
      <video autoPlay muted loop className=" w-full h-full object-cover md:absolute top-0 left-0" src={`https://cms.web-craft.design/${data.video.data.attributes.url}`}></video>
      <div className=" w-[40% md:-mt-20 p-5 md:p-10 text-center z-10">
        <h1 className="text-primary-300 uppercase font-bold">{data.heading}</h1>
        <p className="md:text-white text-3xl md:text-5xl uppercase font-medium">{data.subtitle}</p>
      </div>
    </div>
  );
}
