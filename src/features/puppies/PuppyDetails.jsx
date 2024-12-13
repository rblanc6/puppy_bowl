import { useDeletePuppyMutation, useGetPuppyQuery } from "./puppySlice";
import { useEffect } from "react";
import { useState } from "react";
/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // TODO: Grab data from the `getPuppy` query

  const { data, isLoading } = useGetPuppyQuery(selectedPuppyId);
  // console.log(puppy?.data?.players);
  console.log(selectedPuppyId);
  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked
  const [deletePuppy] = useDeletePuppyMutation();

  // function removePuppy(id) {
  //   setSelectedPuppyId(null);
  //   deletePuppy(id);
  // }
  const [puppy, setPuppy] = useState({});
  useEffect(() => {
    if (data?.data?.player) {
      setPuppy(data.data.player);
    }
  }, [data]);

  async function removePuppy(id) {
    try {
      await deletePuppy(id).unwrap();
      setSelectedPuppyId();
    } catch (error) {
      console.error(error);
    }
  }

  // const removePuppy = async (id) => {
  //   try {
  //     const response = await deletePuppy({ id }).unwrap();
  //     console.log(response);
  //     setSelectedPuppyId(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!selectedPuppyId) {
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
        {/* {puppyInfo?.data?.players.map((puppy) => (
          <span key={puppy.id}> */}
        <h3>
          {puppy.name} #{puppy.id}
        </h3>
        <p>{puppy.breed}</p>
        <p>Team {puppy.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePuppy(puppy.id)}>
          Remove from roster
        </button>
        <figure>
          <img src={puppy.imageUrl} alt={puppy.name} />
        </figure>
        {/* </span>
        ))}
        ; */}
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
