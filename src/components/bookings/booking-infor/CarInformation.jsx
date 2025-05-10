export default function CarInformation({ car = {} }) {
  return (
    <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-12">
      <div className="lg:col-span-12">
        <div className="flex flex-col mb-6 md:flex-row">
          <div className="pr-4 md:w-1/2">
            <img
              src={car?.images[0].imageUrl}
              alt={car?.name}
              className="object-cover w-full h-auto rounded-lg aspect-video"
            />
          </div>
          <div className="mt-4 md:w-1/2 md:mt-0">
            <h2 className="text-xl font-bold uppercase">{car?.name}</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-600">{car?.type}</span>
            </div>
            <div className="flex items-center mt-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="ml-1 font-medium">{car?.rating}</span>
              <span className="mx-1">•</span>
              <span className="text-sm text-gray-600">{car?.trips} chuyến</span>
            </div>
            <div className="flex items-center mt-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="ml-2 text-sm">{car?.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
