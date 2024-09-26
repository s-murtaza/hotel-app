import ToggleInput from "./ui/toggleInput";

export default function ListingFilters({
    handleCategoryChange,
    handleLocationChange,
    selectedCategory,
    selectedLocation,
}) {
    const locationList = [
        "Paris",
        "Sydney",
        "Dubai",
        "Islamabad",
        "All Location",
    ];

    return (
        <div className="flex flex-col mx-4 mb-4 rounded-md shadow-md shadow-orange-950/50 bg-neutral-50 p-4 h-fit">
            <div className="flex md:flex-col flex-wrap flex-row">
                <h3 className="uppercase font-medium tracking-wide text-sm text-orange-900 my-1">
                    change location
                </h3>
                {locationList.map((location) => (
                    <ToggleInput key={location}
                        onFilterChange={handleLocationChange}
                        labelName={location}
                        selectedFilter={selectedLocation}
                    />
                ))}
            </div>

        </div>
    );
}
