"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


// const fetchUsers = async () => {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );
//   return response.data;
// };

// function QueryClient() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["users"],
//     queryFn: fetchUsers,
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <ul>
//       {data.map((user:any) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   );
// }

// export default QueryClient;


// when on dependecy we need to fetch 


const fetchUsers = async (userId: number) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return response.data;
};

function QueryClient() {
  const [userId, setUserId] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],          // 🔑 dependency
    queryFn: () => fetchUsers(userId!),  // runs when userId changes
    enabled: !!userId,                   // ⛔ until userId exists
  });

  return (
    <>
      <button onClick={() => setUserId(1)}>Load User 1</button>
      <button onClick={() => setUserId(2)}>Load User 2</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}

      {data && (
        <ul>
          <li>{data.name}</li>
        </ul>
      )}
    </>
  );
}

export default QueryClient;