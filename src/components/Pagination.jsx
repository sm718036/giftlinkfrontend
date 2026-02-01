import ReactPaginate from "react-paginate";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex justify-center">
      <ReactPaginate
        previousLabel={<ChevronLeft size={16} />}
        nextLabel={<ChevronRight size={16} />}
        breakLabel={"…"}
        pageCount={totalPages}
        forcePage={currentPage - 1}
        onPageChange={(event) => onPageChange(event.selected + 1)}
        containerClassName="flex items-center gap-3"
        // Page buttons
        pageClassName=""
        pageLinkClassName="flex items-center justify-center w-10 h-10 text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full transition shadow-md"
        // Active page stands out
        activeClassName=""
        activeLinkClassName="unset-all flex items-center justify-center w-10 h-10 font-bold rounded-full shadow-lg scale-110 transition-transform"
        // Previous button
        previousClassName=""
        previousLinkClassName="flex items-center justify-center w-10 h-10 text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full transition shadow-md"
        // Next button
        nextClassName=""
        nextLinkClassName="flex items-center justify-center w-10 h-10 text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-full transition shadow-md"
        // Disabled state
        disabledClassName="opacity-50 cursor-not-allowed"
        breakClassName="flex items-center justify-center w-10 h-10 text-gray-400"
      />
    </div>
  );
}
