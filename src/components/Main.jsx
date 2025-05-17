import { useState } from "react";
import SearchCity from "./SearchCity";
import CallWeather from "./CallWeather";

const Main = () => {

    const [city, setCity] = useState("");
    const [searchQuery,setSearchQuery] = useState("");
    const [selectedCity,setSelectedCity] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(city)
        setCity("");
    }

    return <main className="main-weather">
        <section className="weather-search">
            <article className="weather-form">
                <form className="form-search" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        placeholder="Search city"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        type="submit"
                        name="search"
                    >
                        Search</button>
                </form>
                {searchQuery != "" && <SearchCity cityName={searchQuery} setSelectedCity={setSelectedCity} setSearchQuery={setSearchQuery}/>}
            </article>
            <article><CallWeather selectedCity={selectedCity}/></article>
        </section>
    </main>;
}

export default Main;