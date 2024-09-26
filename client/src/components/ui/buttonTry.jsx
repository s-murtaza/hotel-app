// export default function Button({ handleClick, label, toLink, User }) {
//   //(toLink);

//   const [open, setOpen] = useState(false);

//   let menuRef = useRef();

//   useEffect(() => {
//     let handler = (e) => {
//       if (!menuRef.current.contains(e.target)) {
//         setOpen(false);
//         //(menuRef.current);
//       }
//     };

//     document.addEventListener("mousedown", handler);

//     return () => {
//       document.removeEventListener("mousedown", handler);
//     };
//   });

//   return User ? (
//     <div className="menu-container" ref={menuRef}>
//       <div
//         className="menu-trigger"
//         onClick={() => {
//           setOpen(!open);
//         }}
//       >
//         <p>{label}</p>
//       </div>

//       <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
//         <ul>
//           <DropdownItem icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />} text={"Log Out"} />
//           <DropdownItem icon={null} text={"Wishlist"} />
//           <DropdownItem icon={null} text={"Bookings"} />
//         </ul>
//       </div>
//     </div>
//   ) : (
//     <Link to={toLink} onClick={handleClick} className="main-button-link ml-14">
//       <span className="main-button-span"></span>
//       <FontAwesomeIcon
//         className="text-xl mr-2 align-middle"
//         icon={faCircleUser}
//       />
//       {label}
//     </Link>
//   );
// }

// function DropdownItem(props) {
//   return (
//     <li className="dropdownItem">
//       {props.icon}
//       <a> {props.text} </a>
//     </li>
//   );
// }