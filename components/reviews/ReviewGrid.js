import moment from "moment";

export default function ReviewGrid({ data }) {
  console.log(data);
  var dataLength = data.length;

  function modifyGrid(length, index) {
    console.log(data.length - 1);
    console.log(index);
    if (index == dataLength - 1) {
      if (index % 2 != 0) return "lg:col-span-2";
    }

    if (length < 250) return "";
    console.log("Größer als 300");

    dataLength++;

    if (index < 2) return "lg:row-span-2";

    return "lg:col-span-2";
  }

  /*
  const rating = [...new Array(5)].map((star, index) => {
    return index < data.attributes.rating ? <i key={index} className="bi bi-star-fill text-primary text-5xl mr-3"></i> : <i className="bi bi-star"></i>;
  });
  */

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {data.map((review, index) => (
          <div key={review.id} className={`shadow-lg p-3 lg:p-10 ${modifyGrid(review.attributes.content.length, index)}`}>
            <p className="mb-3">{moment(review.attributes.reviewDate).format("DD.MM.Y")}</p>
            <p className="text-lg font-semibold">
              {review.attributes.firstName + " "}
              {review.attributes.lastName} aus {review.attributes.city}
            </p>
            <p className="mb-3 text-primary-300">{review.attributes.companyName}</p>
            <p className="text-justify">{review.attributes.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
