import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { IoEarth } from "react-icons/io5";
import { motion } from "framer-motion";

const locations = [
  { name: "Dubai", path: "/listings?location=Dubai", icon: "src/assets/iconAssets/dubaiIcon.png", imgSize: "h-24" },
  { name: "Sydney", path: "/listings?location=Sydney", icon: "src/assets/iconAssets/sydneyIcon.png", imgSize: "h-12" },
  { name: "Paris", path: "/listings?location=Paris", icon: "src/assets/iconAssets/parisIcon.png", imgSize: "h-24" },
  { name: "Islamabad", path: "/listings?location=Islamabad", icon: "src/assets/iconAssets/isbIcon.png", imgSize: "h-12" },
  { name: "global", path: "/listings" }
];

function Modal({ onClose }) {

  return createPortal(
    <div
      className="bg-stone-900/80 fixed inset-0 flex items-center justify-center z-50"
    >
      <motion.dialog
        open
        className='w-7/12 mx-auto transform bg-stone-300 py-6 px-12 rounded-lg shadow-lg z-50'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y:0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: "spring", duration: 0.5 }} 
      >
        <h2 className="font-Arapey text-3xl text-center">
          Choose from our Locations
        </h2>
        <form method="dialog">
          <motion.ul
            className="h-fit inline md:flex md:flex-row md:flex-wrap md:justify-between md:mt-8 md:mb-4 uppercase space-x-5 text-amber-900 font-medium text-sm tracking-widest"
            initial="hidden" // Initial state for animation
            animate="visible" // Target state
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {locations.map((location) => (
              <motion.li
                key={location.name}
                className="rounded-md flex-1 hover:shadow-orange-950/100 flex flex-col flex-wrap items-center justify-end hover:underline shadow-md border-solid border-2 border-stone-500"
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ type: 'spring' }}
              >
                <Link className="flex flex-1 flex-col items-center justify-end" to={location.path}>
                  {location.name === 'global' ? (
                    <IoEarth className='text-6xl m-2 text-stone-700' />
                  ) : (
                    <img
                      src={location.icon}
                      alt={`${location.name} Icon`}
                      className={`${location.imgSize} m-2`}
                    />
                  )}
                  {location.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          <div className="flex justify-end">
            <button type='button' onClick={onClose} className="mt-4 text-base text-red-700 py-1 px-3 rounded hover:underline">
              Close
            </button>
          </div>
        </form>
      </motion.dialog>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
