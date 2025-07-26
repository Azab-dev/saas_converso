"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  // Get current URL parts
  const pathname = usePathname(); // Current page path (e.g., /companions)
  const router = useRouter();     // To navigate/update the URL
  const searchParams = useSearchParams(); // Current query params

  // Get existing "topic" value from the URL (if any)
  const query = searchParams.get("topic") || "";

  // Search input state (starts with query from URL if available)
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    // Delay search to avoid triggering on every keystroke (debounce)
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        // If there's a search term, update/add "topic" query param
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false }); // Update URL without scroll
      } else {
        // If the input is empty, remove "topic" from URL on /companions page
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    // Clear previous timeout if the user types again quickly
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams, pathname]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      {/* Search icon */}
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />

      {/* Search input field */}
      <input
        placeholder="Search companions..."
        className="outline-none"
        value={searchQuery} // Controlled input value
        onChange={(e) => setSearchQuery(e.target.value)} // Update state
      />
    </div>
  );
};

export default SearchInput;
