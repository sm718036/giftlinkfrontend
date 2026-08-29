import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import DetailsPage from "../pages/DetailsPage";

const mocks = vi.hoisted(() => ({
  getAllGifts: vi.fn(),
  searchGifts: vi.fn(),
  getGiftDetails: vi.fn(),
  appContext: vi.fn(),
}));

vi.mock("../hooks/giftHooks", () => ({
  useGetAllGifts: mocks.getAllGifts,
  useSearchGifts: mocks.searchGifts,
  useGetGiftDetailsById: mocks.getGiftDetails,
}));

vi.mock("../hooks/wishlistHooks", () => ({
  useWishlist: () => ({ wishlistIds: [] }),
  useAddToWishlist: () => ({ addToWishlist: vi.fn() }),
  useRemoveFromWishlist: () => ({ removeFromWishlist: vi.fn() }),
}));

vi.mock("../context/AuthContext", () => ({
  useAppContext: mocks.appContext,
}));

vi.mock("react-router-dom", () => ({
  useParams: () => ({ giftId: "gift-id" }),
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("../components/GiftCard", () => ({
  default: ({ giftData }) => <div>{giftData.name}</div>,
}));

vi.mock("../components/GiftDetails", () => ({
  default: ({ giftDetails }) => <div>{giftDetails.name}</div>,
}));

vi.mock("../components/Pagination", () => ({
  Pagination: () => <div>Pagination</div>,
}));

vi.mock("../components/Loader", () => ({
  default: () => <div>Loading</div>,
}));

describe("page request states", () => {
  beforeEach(() => {
    mocks.appContext.mockReturnValue({ user: undefined, isLoadingUser: false });
    mocks.getAllGifts.mockReturnValue({
      allGifts: [],
      isLoadingAllGifts: false,
      errorInGettingAllGifts: null,
      paginationMeta: undefined,
    });
    mocks.searchGifts.mockReturnValue({
      foundGifts: [],
      isFindingGifts: false,
      errorInFindingGifts: null,
      paginationMeta: undefined,
    });
    mocks.getGiftDetails.mockReturnValue({
      giftDetails: undefined,
      isLoadingGiftDetails: false,
      errorInGettingGiftDetails: null,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders home loading, error, empty, and success states", () => {
    mocks.getAllGifts.mockReturnValueOnce({ isLoadingAllGifts: true });
    const loading = render(<MainPage />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
    loading.unmount();

    mocks.getAllGifts.mockReturnValueOnce({
      isLoadingAllGifts: false,
      errorInGettingAllGifts: new Error("Network failed"),
    });
    const error = render(<MainPage />);
    expect(screen.getByText("Network failed")).toBeInTheDocument();
    error.unmount();

    const empty = render(<MainPage />);
    expect(screen.getByText("The shelf is waiting.")).toBeInTheDocument();
    empty.unmount();

    mocks.getAllGifts.mockReturnValueOnce({
      allGifts: [{ _id: "1", name: "Lamp" }],
      isLoadingAllGifts: false,
      errorInGettingAllGifts: null,
      paginationMeta: { totalPages: 1 },
    });
    render(<MainPage />);
    expect(screen.getByText("Lamp")).toBeInTheDocument();
    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });

  it("distinguishes search errors from empty search results", () => {
    mocks.searchGifts.mockReturnValueOnce({
      foundGifts: [],
      isFindingGifts: false,
      errorInFindingGifts: new Error("Network failed"),
    });
    const error = render(<SearchPage />);
    expect(screen.getByText("Failed to load gifts. Please try again.")).toBeInTheDocument();
    error.unmount();

    render(<SearchPage />);
    expect(screen.getByText("No matches just yet.")).toBeInTheDocument();
  });

  it("renders gift loading, error, missing, and success states", () => {
    mocks.getGiftDetails.mockReturnValueOnce({ isLoadingGiftDetails: true });
    const loading = render(<DetailsPage />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
    loading.unmount();

    mocks.getGiftDetails.mockReturnValueOnce({
      isLoadingGiftDetails: false,
      errorInGettingGiftDetails: new Error("Gift request failed"),
    });
    const error = render(<DetailsPage />);
    expect(screen.getByText(/Gift request failed/)).toBeInTheDocument();
    error.unmount();

    const missing = render(<DetailsPage />);
    expect(screen.getByText("Gift not found.")).toBeInTheDocument();
    missing.unmount();

    mocks.getGiftDetails.mockReturnValueOnce({
      giftDetails: { _id: "1", name: "Chair" },
      isLoadingGiftDetails: false,
      errorInGettingGiftDetails: null,
    });
    render(<DetailsPage />);
    expect(screen.getByText("Chair")).toBeInTheDocument();
  });
});
