// import IUser from "../../types/user.type.ts";
//
// interface TestPageProps {
//     userData: undefined | IUser
// }
//
// export default function TestPage({userData}: TestPageProps) {
//
//     // document.querySelector("#myTable")?.addEventListener("click", function (e) {
//     //
//     //     if (e.target && e.target.nodeName == "TD") {
//     //         e.target.parentNode.classList.toggle("highlight");
//     //     }
//     //
//     // });
//
//     // const table = document.querySelector("#myTable")
//     // if (table != null) {
//     //     table.addEventListener("click", function (e) {
//     //         if (e.target instanceof HTMLElement && e.target.nodeName == "TD") {
//     //             if (e.target.parentNode instanceof HTMLElement) {
//     //                 e.target.parentNode.classList.toggle("highlight");
//     //             }
//     //         }
//     //     });
//     // }
//
//     // get a reference to your table by id
// // cast this to HTMLTableElement in TypeScript
//     const table: HTMLTableElement | null = document.querySelector('#tableID');
//
// // get all rows in the first table body
//     const rows = table?.tBodies[0].rows;
//
//     if (rows) {
// // convert the rows to an array with the spread operator (...)
// // then iterate over each row using forEach
//         Array.from(rows).forEach((row, idx) => {
//             // attach a click handler on each row
//             row.addEventListener('click', event => {
//                 // row.style.backgroundColor="#2ea44f"
//                // event.target.n.toggle("highlight");
//                 if (event.target instanceof HTMLElement) {
//                     event.target.classList.toggle("highlight");
//                 }
//
//
//                 // // get all cells in the row, convert them to an array with the spread operator (...)
//                 // // then for each cell, return its textContent by mapping on the array
//                 // const tds = Array.from(row.cells).map(td => td.textContent);
//                 //
//                 // console.clear();
//                 // // Log the row index
//                 // console.log('row index:', idx);
//                 // // Log the tds content array
//                 // console.log('tds content:', ...tds);
//                 // // join the contents of the tds with a space and display the string
//                 // console.log('tds string:', tds.join(' '));
//             });
//         });
//     }
//     return (
//         <div className={"test-page"}>
//             {/*<div>*/}
//             {/*    <table id="myTable" className={"test-table"}>*/}
//             {/*        <tbody>*/}
//             {/*        <tr>*/}
//             {/*            <td>Row 1</td>*/}
//             {/*        </tr>*/}
//             {/*        <tr>*/}
//             {/*            <td>Row 2</td>*/}
//             {/*        </tr>*/}
//             {/*        </tbody>*/}
//             {/*    </table>*/}
//             {/*</div>*/}
//             <div>
//                 <table id="tableID" className={"test-table"}>
//                     <thead>
//                     <tr>
//                         <th>From</th>
//                         <th>Action</th>
//                         <th>To</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td>a</td>
//                         <td>1</td>
//                         <td>b</td>
//                     </tr>
//                     <tr>
//                         <td>a</td>
//                         <td>0</td>
//                         <td>a</td>
//                     </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }