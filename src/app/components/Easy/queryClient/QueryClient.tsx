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
    queryKey: ["users", userId],          // 🔑 dependency
    queryFn: () => fetchUsers(userId!),  // runs when userId changes
    enabled: !!userId,                   // ⛔ until userId exists
    staleTime: 5 * 60 * 1000,   // 5 min tak fresh staleTime decide karta hai “kab refetch karna hai”
    // cacheTime: 10 * 60 * 1000,  // 10 min memory cacheTime decide karta hai “kab delete karna hai”
  });


  return (
    <div className="flex flex-col gap-4">
      <button className="bg-green-500 rounded-md text-white px-4 py-2" onClick={() => setUserId(1)}>Load User 1</button>
      <button className="bg-green-500 rounded-md text-white px-4 py-2" onClick={() => setUserId(2)}>Load User 2</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}

      {data && (
        <ul>
          <li>{data.name}</li>
        </ul>
      )}
    </div>
  );
}

export default QueryClient;





// use mutaion 


const addUser = async (user: { name: string }) => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    user
  );
  return res.data;
};


import { useMutation, useQueryClient } from "@tanstack/react-query";

export function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,

    onSuccess: (newUser) => {
      // ✅ OPTION 1: cache invalidate (simple)
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate({ name: "New User" })}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Add User
    </button>
  );
}
