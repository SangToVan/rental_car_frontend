import { ADDITIONAL_FUNCTIONS } from "../cars/CarConstants";

export default function AdditionalFunctions({
  className = "",
  additionalFunctions = [],
  onChange,
  functionsToShow,
}) {
  const normalize = (str) => str?.replace(/\s+/g, "").toLowerCase();

  const isActive = (value) =>
    additionalFunctions.some((f) => normalize(f) === normalize(value));

  const toggleFeature = (value) => {
    const updated = isActive(value)
      ? additionalFunctions.filter((f) => normalize(f) !== normalize(value))
      : [...additionalFunctions, value];

    const unique = updated.filter(
      (v, i, self) => self.findIndex((t) => normalize(t) === normalize(v)) === i
    );

    onChange(unique);
  };

  return (
    <div
      className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ${className}`}
    >
      {(functionsToShow || ADDITIONAL_FUNCTIONS).map(
        ({ name, value, icon }) => {
          const active = isActive(value);
          return (
            <div
              key={value}
              onClick={() => toggleFeature(value)}
              className={`border ${
                active ? "border-[#61c596] bg-green-50" : "border-gray-200"
              } rounded-md p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#61c596] transition-colors`}
            >
              <div
                className={`w-8 h-8 mb-2 flex items-center justify-center ${
                  active ? "text-[#61c596]" : "text-gray-500"
                }`}
              >
                {icon}
              </div>
              <span className="text-xs text-gray-700">{name}</span>
            </div>
          );
        }
      )}
    </div>
  );
}
