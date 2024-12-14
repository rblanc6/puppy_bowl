import { useGetPuppiesQuery } from "./puppyListSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList({ setSelectedPuppyId }) {
  // TODO: Get data from getPuppies query
  const { data: listOfPuppies, isLoading } = useGetPuppiesQuery();
  console.log(listOfPuppies?.data?.players);
  const navigate = useNavigate();
  const seePuppyDetails = (id) => {
    navigate(`/players/${id}`);
  };
  const [puppyArray, setPuppyArray] = useState([]);
  const [puppyFilter, setPuppyFilter] = useState("");

  const filterPuppies = (e) => {
    e.preventDefault();
    const filteredPuppies = listOfPuppies?.data?.players.filter((element) => {
      if (element.name.includes(puppyFilter)) {
        return element;
      }
    });
    setPuppyArray(filteredPuppies);
  };
  useEffect(() => {
    if (listOfPuppies?.data?.players) {
      setPuppyArray(listOfPuppies.data.players);
    }
  }, [listOfPuppies]);
  // const [selectedPuppyId, setSelectedPuppyId] = useState(null);

  return (
    <article>
      <form onSubmit={filterPuppies}>
        <label>
          Name:{" "}
          <input
            className="puppyform"
            name="puppyName"
            value={puppyFilter}
            onChange={(e) => setPuppyFilter(e.target.value)}
          />
        </label>
        <button type="submit" className="rosterbutton">
          Search Puppies
        </button>
        {/* <button className="rosterbutton" onClick={() => ""}>
          Clear Results
        </button> */}
      </form>
      <h2>Roster</h2>
      {/* <p id="results"></p> */}
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {puppyArray.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button
              onClick={() => seePuppyDetails(p.id)}
              className="detailsbutton"
            >
              See details
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
