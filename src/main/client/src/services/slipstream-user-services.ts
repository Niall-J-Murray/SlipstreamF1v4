//
// function handleUserAdd(setUsers) {
//     const data = {
//         task: "",
//         isDone: false,
//     };
//
//     fetch("/api/users", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json",
//         },
//         body: JSON.stringify(data),
//     }).then((response) => {
//         response.json().then((users) => setUsers(users));
//     });
// }
//
// function handleUserUpdate(users, setUsers, data, shouldSave) {
//     if (shouldSave) {
//         fetch("/api/users", {
//             method: "PUT",
//             headers: {
//                 "content-type": "application/json",
//             },
//             body: JSON.stringify(data),
//         }).then((response) => {
//             response.json().then((users) => setUsers(users));
//         });
//     } else {
//         let usersCopy = [...users];
//         const i = usersCopy.findIndex((user) => user.id === data.id);
//         usersCopy[i] = data;
//         setUsers(usersCopy);
//     }
// }
//
// function handleUserDelete(setUsers, data) {
//     fetch("/api/users", {
//         method: "DELETE",
//         headers: {
//             "content-type": "application/json",
//         },
//         body: JSON.stringify(data),
//     }).then((response) => {
//         response.json().then((users) => setUsers(users));
//     });
// }
//
// export {handleUserAdd, handleUserUpdate, handleUserDelete};