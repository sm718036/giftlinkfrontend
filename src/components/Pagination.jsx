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
        pageLinkClassName="flex items-center justify-center w-10 h-10 border border-[#102a24]/15 hover:bg-[#f2e9e2] rounded-full transition"
        // Active page stands out
        activeClassName=""
        activeLinkClassName="!bg-[#035954] !text-white font-bold"
        // Previous button
        previousClassName=""
        previousLinkClassName="flex items-center justify-center w-10 h-10 border border-[#102a24]/15 hover:bg-[#f2e9e2] rounded-full transition"
        // Next button
        nextClassName=""
        nextLinkClassName="flex items-center justify-center w-10 h-10 border border-[#102a24]/15 hover:bg-[#f2e9e2] rounded-full transition"
        // Disabled state
        disabledClassName="opacity-50 cursor-not-allowed"
        breakClassName="flex items-center justify-center w-10 h-10 text-[#61746d]"
      />
    </div>
  );
}
