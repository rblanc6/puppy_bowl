import { useDeletePuppyMutation, useGetPuppyQuery } from "./puppyDetailsSlice";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // TODO: Grab data from the `getPuppy` query
  const { id } = useParams();
  const { data, isLoading } = useGetPuppyQuery(id);
  const navigate = useNavigate();

  // console.log(selectedPuppyId);
  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked
  const [deletePuppy] = useDeletePuppyMutation();
  const [puppy, setPuppy] = useState({});
  // console.log(puppy);
  useEffect(() => {
    if (data?.data?.player) {
      console.log(data?.data?.player);
      setPuppy(data.data.player);
    }
  }, [data]);

  function removePuppy(id) {
    // setSelectedPuppyId(id);
    deletePuppy(id);
    // setSelectedPuppyId(null);
    navigate("/");
  }

  // async function removePuppy(id) {
  //   try {
  //     await deletePuppy(id).unwrap();
  //     setSelectedPuppyId(null);
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!puppy) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  }
  // 3. Information about the selected puppy has returned from the API.
  else {
    $details = (
      <>
        <h3>
          {puppy.name} #{puppy.id}
        </h3>
        <p>{puppy.breed}</p>
        <p>Team {puppy.team?.name ?? "Unassigned"}</p>
        <button className="removebutton" onClick={() => removePuppy(puppy.id)}>
          Remove from roster
        </button>
        <figure>
          <img src={puppy.imageUrl} alt={puppy.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
